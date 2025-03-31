const { Op, Sequelize } = require("sequelize");
const db = require("../models");

const { Transaction, Brand, User } = db;

exports.getUserTransactionsByCategory = async (req, res) => {
    try {
        const userId = req.userId;
        const { category, page = 1, limit = 5 } = req.query;
        const offset = (page - 1) * limit;

        if (!category) {
            return res.status(400).json({ status: false, message: "Category is required (program / product)" });
        }

        const validCategories = ["program", "product"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ status: false, message: "Invalid category, use 'program' or 'product'" });
        }

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
                "$Brand.category_brand$": category // ✅ Filter berdasarkan kategori brand
            },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["transaction_date", "DESC"]],
            raw: true
        });

        res.status(200).json({
            status: true,
            category,
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
                [Sequelize.col("Brand.variant"), "item"],
                [Sequelize.col("Brand.category_brand"), "category"],
                [Sequelize.col("Brand.price"), "price"],
                [Sequelize.col("Brand.discount_price"), "discount_price"],
                [Sequelize.col("Brand.commission"), "commission"],
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