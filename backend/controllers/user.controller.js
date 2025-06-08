const { Sequelize } = require("sequelize");
const db = require("../models");

const { Transaction, Brand, User, Ujian, UjianProgress } = db;

exports.getUserTransactionsByCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { category, page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    if (!category) {
      return res.status(400).json({ status: false, message: "Category is required (program / product / ujian)" });
    }

    const validCategories = ["program", "product", "ujian"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ status: false, message: "Invalid category, use 'program', 'product' or 'ujian'" });
    }

    let result = {};

    if (category === "ujian") {
  const { count, rows } = await Transaction.findAndCountAll({
    attributes: [
      "id",
      "transaction_date",
      "status_transaction",
      "ujian_id"
    ],
    include: [
      {
        model: Ujian,
        as: "Ujian",
        attributes: ["id", "nama_ujian", "level", "ujian_img"],
        include: [
          {
            model: UjianProgress,
            as: "UjianProgresses",
            where: { user_id: userId },
            required: false,
            attributes: ["exam_phase", "is_done", "is_checking"]
          }
        ]
      }
    ],
    where: {
      user_id: userId,
      status_transaction: "success",
      isDelete: false,
      ujian_id: { [Sequelize.Op.ne]: null }
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["transaction_date", "DESC"]],
    raw: false // ❗ penting: nested include butuh raw false
  });

  // Format ulang response biar konsisten
  const formatted = rows.map(row => ({
    id: row.id,
    transaction_date: row.transaction_date,
    status_transaction: row.status_transaction,
    ujian_id: row.ujian_id,
    item: row.Ujian?.nama_ujian,
    level: row.Ujian?.level,
    ujian_img: row.Ujian?.ujian_img,
    UjianProgresses: row.Ujian?.UjianProgresses || []
  }));

  return res.status(200).json({
    status: true,
    category,
    total_transactions: count,
    current_page: parseInt(page),
    total_pages: Math.ceil(count / limit),
    data: formatted
  });
}
     else {
      // 🔹 Ambil transaksi PROGRAM / PRODUCT
      const { count, rows } = await Transaction.findAndCountAll({
        attributes: [
          "id",
          "transaction_date",
          "status_transaction",
          [Sequelize.col("Brand.variant"), "item"],
          [Sequelize.col("Brand.category_brand"), "category"],
          [Sequelize.col("Brand.link_classroom"), "link_classroom"],
          [Sequelize.col("Brand.file_product"), "file_product"],
          [Sequelize.col("Brand.brand_img"), "brand_image"]
        ],
        include: [
          {
            model: Brand,
            as: "Brand",
            attributes: []
          }
        ],
        where: {
          user_id: userId,
          status_transaction: "success",
          isDelete: false,
          "$Brand.category_brand$": category
        },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["transaction_date", "DESC"]],
        raw: true
      });

      result = {
        status: true,
        category,
        total_transactions: count,
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        data: rows
      };
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUserTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Transaction.findAndCountAll({
      attributes: [
        "id",
        "transaction_date",
        "status_transaction",
        [Sequelize.literal(`CASE 
          WHEN "Brand"."variant" IS NOT NULL THEN "Brand"."variant" 
          ELSE "Ujian"."nama_ujian" 
        END`), "item"],
        [Sequelize.literal(`CASE 
          WHEN "Brand"."category_brand" IS NOT NULL THEN "Brand"."category_brand" 
          ELSE 'ujian' 
        END`), "category"],
        [Sequelize.literal(`COALESCE("Brand"."price", "Ujian"."harga_normal")`), "price"],
        [Sequelize.literal(`COALESCE("Brand"."discount_price", "Ujian"."harga_diskon")`), "discount_price"],
        [Sequelize.literal(`COALESCE("Brand"."commission", 0)`), "commission"],
        [Sequelize.literal(`COALESCE("Brand"."brand_img", "Ujian"."ujian_img")`), "brand_image"]
      ],
      include: [
        {
          model: Brand,
          as: "Brand",
          attributes: []
        },
        {
          model: Ujian,
          as: "Ujian",
          attributes: []
        }
      ],
      where: {
        user_id: userId,
        isDelete: false
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["transaction_date", "DESC"]],
      raw: true
    });

    res.status(200).json({
      status: true,
      total_transactions: count,
      current_page: parseInt(page),
      total_pages: Math.ceil(count / limit),
      data: rows
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
