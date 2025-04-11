const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const nodemailer = require('nodemailer');
const { sendAffiliatorApprovedEmail, sendAffiliatorRejectedEmail } = require('../helpers/sendEmail');
require('dotenv').config();

const { User, Role, AffiliateDetail, Transaction, Brand } = db;

exports.validateReveralCode = async (req, res) => {
    try {
        const { reveral_code } = req.query;

        const user = await User.findByPk(req.userId);
        if(!user) return res.status(404).json({ status: false, message: "User Not Found!" })
    
        const affiliator = await User.findOne({where: {reveral_code}});
        if(!affiliator) return res.status(404).json({status: false, message: "Reveral code invalid!"});
        if (affiliator.reveral_code == user.reveral_code) return res.status(400).json({ status: false, message: "Affiliates cannot input their own referral code!" });

        res.status(200).json({status: true, message: "Affiliator defined!", data: affiliator});
    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ error: error.message });
    }
}

exports.getTotalAffiliateRevenue = async (req, res) => {
    try {
        const totalRevenue = await Transaction.findOne({
            attributes: [
                [Sequelize.literal(`COALESCE(SUM("Brand"."commission"), 0)`), "total_revenue"]
            ],
            include: [
                {
                    model: Brand,
                    as: "Brand",  // ✅ HARUS sesuai alias di Transaction.js
                    attributes: []
                }
            ],
            where: {
                status_transaction: "success",
                affiliator_id: { [Op.ne]: null },
                isDelete: false
            },
            raw: true
        });


        const currentYear = new Date().getFullYear();
        const monthlyTransactionCount = await Transaction.findAll({
            attributes: [
                [Sequelize.literal(`EXTRACT(MONTH FROM "transaction_date")`), "month"],
                [Sequelize.literal(`COUNT(*)`), "transaction_count"] // ✅ Ambil jumlah transaksi
            ],
            where: {
                status_transaction: "success", // ✅ Hanya transaksi sukses
                affiliator_id: { [Op.ne]: null },
                isDelete: false,
                transaction_date: {
                    [Op.gte]: new Date(`${currentYear}-01-01T00:00:00.000Z`)
                },
            },
            group: [Sequelize.literal(`EXTRACT(MONTH FROM "transaction_date")`)],
            order: [[Sequelize.literal(`EXTRACT(MONTH FROM "transaction_date")`), "ASC"]],
            raw: true
        });
        let transactionsByMonth = new Array(12).fill(0);
        monthlyTransactionCount.forEach(tx => {
            const monthIndex = parseInt(tx.month) - 1;
            transactionsByMonth[monthIndex] = parseInt(tx.transaction_count || 0);
        });

        res.status(200).json({
            status: true,
            revenue_by_month: transactionsByMonth,
            total_revenue: totalRevenue ? totalRevenue.total_revenue : 0
        });

    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUserAffiliateDashboard = async (req, res) => {
    try {
        const userId = req.userId; 

        const role = await Role.findOne({where: {role_name: "affiliator"}})
        
        const user = await User.findOne({
            where: { id: userId, role_id: role.id },
            attributes: ["name", "email", "reveral_code"]
        });

        if (!user) {
            return res.status(404).json({ status: false, message: "User affiliator not found!" });
        }

        const totalRevenue = await Transaction.findOne({
            attributes: [[Sequelize.literal(`COALESCE(SUM("Brand"."commission"), 0)`), "total_revenue"]],
            include: [
                {
                    model: Brand,
                    as: "Brand",
                    attributes: []
                }
            ],
            where: {
                affiliator_id: userId,
                status_transaction: "success",
                isDelete: false
            },
            raw: true
        });

        const totalTransactions = await Transaction.count({
            where: {
                affiliator_id: userId,
                status_transaction: "success",
                isDelete: false
            }
        });

        res.status(200).json({
            status: true,
            data: {
                name: user.name,
                email: user.email,
                reveral_code: user.reveral_code,
                total_revenue: totalRevenue.total_revenue || 0,
                total_transactions: totalTransactions
            }
        });

    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAffiliatorStatusFalse = async (req, res) => {
    try {
        const role = await Role.findOne({ where: { role_name: "affiliator" } });

        const affiliators = await User.findAll({
            where: { [Op.and]: [{ role_id: role.id }, { affiliator_status: false }] },
            include: [{ model: AffiliateDetail }]
        });

        if (affiliators.length === 0) {
            return res.status(404).json({ status: false, message: "Affiliator not found!" });
        }

        res.status(200).json({ status: true, data: affiliators });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAffiliatorStatusTrue = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const role = await Role.findOne({ where: { role_name: "affiliator" } });

        const { count, rows } = await User.findAndCountAll({
            where: { role_id: role.id, affiliator_status: true },
            attributes: [
                "id",
                "name",
                "email",
                "number",
                "reveral_code",
                [
                    Sequelize.literal(`
                        COALESCE((
                            SELECT SUM("b"."commission") 
                            FROM "transactions" AS "t"
                            JOIN "brands" AS "b" ON "t"."brand_id" = "b"."id"
                            WHERE "t"."affiliator_id" = "User"."id"
                            AND "t"."status_transaction" = 'success'
                            AND "t"."isDelete" = false
                        ), 0)
                    `),
                    "total_commission"
                ]
            ],
            include: [
                { model: AffiliateDetail }
            ],
            group: ["User.id", "AffiliateDetail.id"], // 🔥 FIX POSTGRESQL GROUPING
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["createdAt", "DESC"]],
            raw: true
        });

        if (!rows.length) {
            return res.status(404).json({ status: false, message: "No verified affiliates found!" });
        }

        res.status(200).json({
            status: true,
            total_affiliators: count,
            current_page: parseInt(page),
            total_pages: Math.ceil(count / limit),
            data: rows,
        });
    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.approveAffiliator = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found!" });
        }

        user.affiliator_status = true;
        await user.save();

        const loginLink = `${process.env.FRONTEND_URL}/?email=${user.email}&password=NewAffiliatorMandarin`;

        await sendAffiliatorApprovedEmail(user, loginLink)

        res.status(200).json({ status: true, message: "Affiliator approved successfully, email sent!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectAffiliator = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { summary_cancel } = req.body;

        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID is required!" });
        }

        if (!summary_cancel) {
            return res.status(400).json({ status: false, message: "Cancellation reason is required!" });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found!" });
        }

        sendAffiliatorRejectedEmail(user, summary_cancel)

        // Hapus user dari database
        await user.destroy();

        res.status(200).json({ status: true, message: "Affiliator rejected and deleted, email sent!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserTransactions = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 5 } = req.query;
        const offset = (page - 1) * limit;

        // Cek role affiliator
        const role = await Role.findOne({ where: { role_name: "affiliator" } });

        if (!role) {
            return res.status(404).json({ status: false, message: "Role affiliator not found!" });
        }

        // Cek apakah user adalah affiliator
        const user = await User.findOne({ where: { id: userId, role_id: role.id } });

        if (!user) {
            return res.status(404).json({ status: false, message: "Affiliator not found!" });
        }

        // Ambil transaksi berdasarkan affiliator_id
        const { count, rows } = await Transaction.findAndCountAll({
            attributes: [
                "id",
                "transaction_date",
                "status_transaction",
                [Sequelize.col("Brand.variant"), "item"],  // ✅ Ambil nama produk dari Brand
                [Sequelize.col("Brand.price"), "price"],  // ✅ Ambil nama produk dari Brand
                [Sequelize.col("Brand.discount_price"), "discount_price"],  // ✅ Ambil nama produk dari Brand
                [Sequelize.col("Brand.commission"), "commission"],
                [Sequelize.col("User.name"), "buyer_name"] // ✅ Ambil nama pembeli dari User
            ],
            include: [
                {
                    model: Brand,
                    as: "Brand",
                    attributes: []
                },
                {
                    model: User,
                    as: "User",  // ✅ Pastikan alias sesuai dengan model Transaction.js
                    attributes: []
                }
            ],
            where: {
                affiliator_id: userId,
                status_transaction: "success",
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

exports.deleteAffiliator = async (req, res) => {
    try {
        const { userId } = req.params;

        const affiliator = await User.findByPk(userId);
        if (!affiliator) {
            return res.status(404).json({ status: false, message: "Affiliator tidak ditemukan." });
        }

        // Set affiliator_id di transaksi jadi null
        await Transaction.update(
            { affiliator_id: null },
            { where: { affiliator_id: userId } }
        );

        // Hapus data affiliator
        await affiliator.destroy();

        return res.status(200).json({ status: true, message: "Affiliator berhasil dihapus." });
    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ status: false, message: "Terjadi kesalahan saat menghapus affiliator.", error: error.message });
    }
};