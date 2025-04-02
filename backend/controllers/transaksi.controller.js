const db = require('../models');
const path = require('path');
const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
const { sendTransactionStatusEmail, sendNewTransactionNotificationToAdmin } = require('../helpers/sendEmail');

const { Transaction, User, Brand } = db;

exports.createTransaction = async (req, res) => {
  try {
    const { reveral_code, brand_id, payment_method } = req.body;

    let proof_transaction = null;
    if (!req.files || !req.files.proof_transaction) {
      return res.status(400).json({ status: false, message: "Proof of transaction is required!" });
    }

    const proofFile = req.files.proof_transaction;
    const proofExt = path.extname(proofFile.name).toLowerCase();
    const allowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

    if (!allowedTypes.includes(proofExt)) {
      return res.status(400).json({ status: false, message: "Only images and PDFs are allowed for proof_transaction!" });
    }

    const proofFileName = `${Date.now()}_${proofFile.name.replace(/\s/g, "_")}`;
    const proofPath = path.join(__dirname, '../public/proofs', proofFileName);

    if (!fs.existsSync(path.join(__dirname, '../public/proofs'))) {
      fs.mkdirSync(path.join(__dirname, '../public/proofs'), { recursive: true });
    }

    await proofFile.mv(proofPath);
    proof_transaction = `/public/proofs/${proofFileName}`;

    let affiliator = null;
    if (reveral_code) {
      affiliator = await User.findOne({ where: { reveral_code } });
      if (!affiliator) return res.status(400).json({ status: false, message: "Invalid Reveral Code!" });
    }

    const brand = await Brand.findByPk(brand_id);
    if (!brand) return res.status(404).json({ status: false, message: "Brand not found" });

    const dateNow = new Date();
    let expired_date = null;
    if (brand.category_brand.toLowerCase() === "program") {
      expired_date = new Date(dateNow.setMonth(dateNow.getMonth() + 1));
    }

    const newTransaction = await Transaction.create({
      user_id: req.userId,
      affiliator_id: affiliator ? affiliator.id : null,
      brand_id,
      status_transaction: "pending",
      payment_method,
      proof_transaction,
      transaction_date: new Date(),
      expired_date,
    });

    const user = await User.findByPk(req.userId);
    await sendNewTransactionNotificationToAdmin(user, brand, newTransaction.id, proof_transaction);


    res.status(201).json({ status: true, message: "Transaction created successfully", data: newTransaction });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getTransactionsByMonthAdmin = async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        where: {
          status_transaction: "success",
          isDelete: false
        },
        attributes: [
          [Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM transaction_date')), 'month'],
          [Sequelize.fn('COUNT', '*'), 'total_transactions']
        ],
        group: [Sequelize.literal('EXTRACT(MONTH FROM transaction_date)')],
        order: [[Sequelize.literal('EXTRACT(MONTH FROM transaction_date)'), 'ASC']]
      });
  
      let monthlyTransactions = new Array(12).fill(0);
      transactions.forEach(tx => {
        const monthIndex = parseInt(tx.dataValues.month) - 1; 
        monthlyTransactions[monthIndex] = parseInt(tx.dataValues.total_transactions);
      });
  
      res.json({
        status: true,
        transactions_by_month: monthlyTransactions
      });
  
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };

exports.getTransactionSummary = async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        where: { [Op.and]: [{status_transaction: "success"}, {isDelete: false}] },
                include: [{ model: Brand, as: 'Brand',  attributes: ['price', 'discount_price'] }],
      });
  
      const totalTransactions = transactions.length;
  
      const totalRevenue = transactions.reduce((sum, transaction) => {
        const price = transaction.Brand?.discount_price || transaction.Brand?.price || 0;
        return sum + parseInt(price);
      }, 0);
  
      res.json({
        status: true,
        total_transactions: totalTransactions,
        total_revenue: totalRevenue
      });
  
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };
  
exports.getTransactionsUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
    
        const totalTransactions = await Transaction.count({ where: { isDelete: false } });
    
        const transactions = await Transaction.findAll({
          where: {
            [Op.and]: [
                {isDelete: false},
                {user_id: req.userId}
            ]
          },
          include: [
            { model: User, as: 'User', },
            { 
              model: Brand,
              as: 'Brand',
            }
          ],
          limit,
          offset,
          order: [['transaction_date', 'DESC']]
        });
    
        for (const transaction of transactions) {
            if (transaction.affiliator_id) {
                affiliator = await User.findOne({
                  where: { reveral_code: transaction.affiliator_id },
                });
    
                transaction.dataValues.Affiliator = affiliator || null;
            }
        }
    
        if (transactions.length === 0) {
          return res.status(404).json({ status: false, message: "No transactions found" });
        }
    
        res.json({
          status: true,
          current_page: page,
          total_pages: Math.ceil(totalTransactions / limit),
          total_transactions: totalTransactions,
          per_page: limit,
          data: transactions
        });
    } catch(error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.getTopSellingProductsAndPrograms = async (req, res) => {
    try {
        const topProducts = await Transaction.findAll({
            where: {
                status_transaction: "success",
                isDelete: false
            },
            include: [{
                model: Brand,
                as: 'Brand',
                where: { category_brand: "product" },
                attributes: []
            }],
            attributes: [
                [Sequelize.col('Brand.id'), 'brand_id'],
                [Sequelize.col('Brand.variant'), 'name'],
                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Transaction.id'))), 'total_sold']
            ],
            group: [Sequelize.col('Brand.id'), Sequelize.col('Brand.variant')],
            order: [[Sequelize.literal('total_sold'), 'DESC']],
            limit: 5
        });

        const topPrograms = await Transaction.findAll({
            where: {
                status_transaction: "success",
                isDelete: false
            },
            include: [{
                model: Brand,
                as: 'Brand',
                where: { category_brand: "program" },
                attributes: []
            }],
            attributes: [
                [Sequelize.col('Brand.id'), 'brand_id'],
                [Sequelize.col('Brand.variant'), 'name'],
                [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('Transaction.id'))), 'total_sold']
            ],
            group: [Sequelize.col('Brand.id'), Sequelize.col('Brand.variant')],
            order: [[Sequelize.literal('total_sold'), 'DESC']],
            limit: 5
        });

        res.json({
            status: true,
            top_products: topProducts.map(p => ({
                name: p.dataValues.name,
                sold: parseInt(p.dataValues.total_sold, 10)
            })),
            top_programs: topPrograms.map(p => ({
                name: p.dataValues.name,
                sold: parseInt(p.dataValues.total_sold, 10)
            }))
        });

    } catch (error) {
        console.error("Error fetching top selling products & programs:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};


exports.getAllTransactionPending = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { [Op.and] : [
          {isDelete: false},
          {status_transaction: "pending"}
      ] },
      include: [
        { model: User, as: 'User' },
        { model: User, as: 'Affiliator' },
        { 
          model: Brand, 
          as: 'Brand',
        }
      ],
      order: [['transaction_date', 'DESC']]
    });

    if (transactions.length === 0) {
      return res.status(404).json({ status: false, message: "No transactions found" });
    }

    res.json({
      status: true,
      data: transactions
    });

  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      const totalTransactions = await Transaction.count({ where: { isDelete: false } });
  
      const transactions = await Transaction.findAll({
        where: { [Op.and] : [
            {isDelete: false},
            {status_transaction: "success"}
        ] },
        include: [
          { model: User, as: 'User' },
          { model: User, as: 'Affiliator' },
          { 
            model: Brand, 
            as: 'Brand',
          }
        ],
        limit,
        offset,
        order: [['transaction_date', 'DESC']]
      });
  
      if (transactions.length === 0) {
        return res.status(404).json({ status: false, message: "No transactions found" });
      }
  
      res.json({
        status: true,
        current_page: page,
        total_pages: Math.ceil(totalTransactions / limit),
        total_transactions: totalTransactions,
        per_page: limit,
        data: transactions
      });
  
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
};
  

  exports.getTransactionById = async (req, res) => {
    try {
      const id = parseInt(req.params.id); 
      const transaction = await Transaction.findOne({
            where: { id, isDelete: false, },
        include: [
          { model: User, as: 'User', },
          { model: User, as: 'Affiliator', },
          { model: Brand, as: 'Brand', }
        ]
      });
  
      if (!transaction) {
        return res.status(404).json({ status: false, message: "Transaction not found" });
      }
  
      let affiliator = null;
      if (transaction.affiliator_id) {
        affiliator = await User.findOne({
          where: { id: transaction.affiliator_id },
        });
      }
  
      transaction.dataValues.Affiliator = affiliator;
  
      res.json({ status: true, data: transaction });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };
  

  exports.getTransactionDashboardData = async (req, res) => {
    try {
        const productTransactions = await Transaction.findAll({
            where: { status_transaction: "success", isDelete: false },
            include: [{ 
                model: Brand, 
                as: 'Brand', 
                where: { category_brand: "product" },
            }]
        });

        const totalProductTransactions = productTransactions.length;
        const totalProductRevenue = productTransactions.reduce((sum, transaction) => {
            const price = transaction.Brand?.discount_price || transaction.Brand?.price || 0;
            return sum + parseInt(price);
        }, 0);

        const monthlyProductTransactions = await Transaction.findAll({
            where: { status_transaction: "success", isDelete: false },
            include: [{ 
                model: Brand, 
                as: 'Brand', 
                where: { category_brand: "product" }, 
                attributes: []
            }],
            attributes: [
                [Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM transaction_date')), 'month'],
                [Sequelize.fn('COUNT', '*'), 'total_transactions']
            ],
            group: [Sequelize.literal('EXTRACT(MONTH FROM transaction_date)')],
            order: [[Sequelize.literal('EXTRACT(MONTH FROM transaction_date)'), 'ASC']]
        });

        let transactionsByMonthProduct = new Array(12).fill(0);
        monthlyProductTransactions.forEach(tx => {
            const monthIndex = parseInt(tx.dataValues.month) - 1;
            transactionsByMonthProduct[monthIndex] = parseInt(tx.dataValues.total_transactions);
        });

        const productList = await Brand.findAll({
            where: { category_brand: "product", isDelete: false },
        });

        const programTransactions = await Transaction.findAll({
            where: { status_transaction: "success", isDelete: false },
            include: [{ 
                model: Brand, 
                as: 'Brand', 
                where: { category_brand: "program" },
            }]
        });

        const totalProgramTransactions = programTransactions.length;
        const totalProgramRevenue = programTransactions.reduce((sum, transaction) => {
            const price = transaction.Brand?.discount_price || transaction.Brand?.price || 0;
            return sum + parseInt(price);
        }, 0);

        const monthlyProgramTransactions = await Transaction.findAll({
            where: { status_transaction: "success", isDelete: false },
            include: [{ 
                model: Brand, 
                as: 'Brand', 
                where: { category_brand: "program" }, 
                attributes: []
            }],
            attributes: [
                [Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM transaction_date')), 'month'],
                [Sequelize.fn('COUNT', '*'), 'total_transactions']
            ],
            group: [Sequelize.literal('EXTRACT(MONTH FROM transaction_date)')],
            order: [[Sequelize.literal('EXTRACT(MONTH FROM transaction_date)'), 'ASC']]
        });

        let transactionsByMonthProgram = new Array(12).fill(0);
        monthlyProgramTransactions.forEach(tx => {
            const monthIndex = parseInt(tx.dataValues.month) - 1;
            transactionsByMonthProgram[monthIndex] = parseInt(tx.dataValues.total_transactions);
        });

        const programList = await Brand.findAll({
            where: { category_brand: "program", isDelete: false },
            attributes: ['id', 'variant', 'turunan', 'price', 'discount_price', 'sold_sum', 'brand_img', 'detail_brand', 'commission']
        });

        res.json({
            status: true,
            products: {
                total_transactions: totalProductTransactions,
                total_revenue: totalProductRevenue,
                transactions_by_month: transactionsByMonthProduct,
                data: productList
            },
            programs: {
                total_transactions: totalProgramTransactions,
                total_revenue: totalProgramRevenue,
                transactions_by_month: transactionsByMonthProgram,
                data: programList
            }
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ status: false, error: error.message });
    }
};
 

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        { model: User, as: 'User' },
        { model: Brand, as: 'Brand' },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ status: false, message: "Transaction not found" });
    }

    const { status_transaction, summary_cancel } = req.body;

    const validStatuses = ["pending", "success", "cancel"];
    if (!validStatuses.includes(status_transaction)) {
      return res.status(400).json({ status: false, message: `Invalid status. Allowed values: ${validStatuses.join(", ")}` });
    }

    if (status_transaction === "cancel" && !summary_cancel) {
      return res.status(400).json({ status: false, message: "Cancellation requires a summary cancel reason." });
    }

    if (status_transaction === "success") {
      await Brand.increment({ sold_sum: 1 }, { where: { id: transaction.brand_id } });
    }

    await transaction.update({
      status_transaction: status_transaction || transaction.status_transaction,
      summary_cancel: status_transaction === "cancel" ? summary_cancel : null,
    });

    if (["success", "cancel"].includes(status_transaction)) {
      await sendTransactionStatusEmail(transaction.User, transaction.Brand, transaction.id, status_transaction, summary_cancel);
    }
    res.json({ status: true, message: "Transaction updated successfully", data: transaction });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

  

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ status: false, message: "Transaction not found" });
    }

    await transaction.update({ isDelete: true });

    res.json({ status: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
