const db = require('../models');
const path = require('path');
const fs = require('fs');

const { Brand } = db;

exports.createBrand = async (req, res) => {
    try {
      let brand_img = null;
      let file_product = null;
  
      if (!req.files || !req.files.brand_img) {
        return res.status(400).json({ status: false, message: "Brand image is required!" });
      }
  
      const imageFile = req.files.brand_img;
      const imageExt = path.extname(imageFile.name).toLowerCase();
      const allowedImageTypes = [".jpg", ".jpeg", ".png", ".webp"];
  
      if (!allowedImageTypes.includes(imageExt)) {
        return res.status(400).json({ status: false, message: "Only image files are allowed for brand_img!" });
      }
  
      const imageName = `${Date.now()}_${imageFile.name.replace(/\s/g, "_")}`;
      const imagePath = path.join(__dirname, '../public/brand', imageName);
      await imageFile.mv(imagePath);
      brand_img = `/public/brand/${imageName}`;
  
      if (req.files.file_product) {
        const productFile = req.files.file_product;
        const productName = `${Date.now()}_${productFile.name.replace(/\s/g, "_")}`;
        const productPath = path.join(__dirname, '../public/products', productName);
        await productFile.mv(productPath);
        file_product = `/public/products/${productName}`;
      }
  
      const { turunan, price, detail_brand, link_classroom, commission, category_brand, variant, discount_price } = req.body;

      if (!category_brand) {
        return res.status(400).json({ status: false, message: "Category brand is required!" });
      }
  
      const category_brand_lower = category_brand.toLowerCase(); 
      const listCategoryBrand = ["program", "product"];  

      if(!listCategoryBrand.includes(category_brand_lower)) 
        return res.status(400).json({ status: false, message: "Brand Category Invalid Input! ( Program Or Product )"})

      if (!allowedImageTypes.includes(imageExt)) {
        return res.status(400).json({ status: false, message: "Only image files are allowed for brand_img!" });
      }
  
      const requiredFields = { variant, turunan, price, detail_brand, category_brand, discount_price, commission };
      const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          status: false,
          message: "These fields are required!",
          missing_fields: missingFields
        });
      }
  
      const newBrand = await Brand.create({
        turunan,
        price,
        sold_sum: 0,
        detail_brand,
        link_classroom,
        discount_price,
        file_product,
        commission,
        variant,
        category_brand: category_brand_lower,
        brand_img
      });
  
      res.status(201).json({ status: true, message: 'Brand created successfully', data: newBrand });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
};

exports.updateBrand = async (req, res) => {
    try {
      const brand = await Brand.findOne({ where: { id: req.params.id, isDelete: false } });
  
      if (!brand) {
        return res.status(404).json({ status: false, message: "Brand not found" });
      }
  
      let brand_img = brand.brand_img;
      let file_product = brand.file_product;
  
      if (req.files && req.files.brand_img) {
        const imageFile = req.files.brand_img;
        const imageExt = path.extname(imageFile.name).toLowerCase();
        const allowedImageTypes = [".jpg", ".jpeg", ".png", ".webp"];
  
        if (!allowedImageTypes.includes(imageExt)) {
          return res.status(400).json({ status: false, message: "Only image files are allowed for brand_img!" });
        }
  
        const imageName = `${Date.now()}_${imageFile.name.replace(/\s/g, "_")}`;
        const imagePath = path.join(__dirname, '../public/brand', imageName);
  
        if (brand.brand_img) {
          const oldImagePath = path.join(__dirname, '..', brand.brand_img);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        await imageFile.mv(imagePath);
        brand_img = `/public/brand/${imageName}`;
      }
  
      if (req.files && req.files.file_product) {
        const productFile = req.files.file_product;
        const productName = `${Date.now()}_${productFile.name.replace(/\s/g, "_")}`;
        const productPath = path.join(__dirname, '../public/products', productName);
  
        if (brand.file_product) {
          const oldProductPath = path.join(__dirname, '..', brand.file_product);
          if (fs.existsSync(oldProductPath)) {
            fs.unlinkSync(oldProductPath);
          }
        }
  
        await productFile.mv(productPath);
        file_product = `/public/products/${productName}`;
      }
  
      const { turunan, price, detail_brand, link_classroom, commission, category_brand, variant, discount_price } = req.body;
  
      if (category_brand) {
        const category_brand_lower = category_brand.toLowerCase();
        const listCategoryBrand = ["program", "product"];
  
        if (!listCategoryBrand.includes(category_brand_lower)) {
          return res.status(400).json({ status: false, message: "Brand Category Invalid Input! (Program or Product)" });
        }
      }
  
      await brand.update({
        turunan: turunan || brand.turunan,
        price: price || brand.price,
        detail_brand: detail_brand || brand.detail_brand,
        link_classroom: link_classroom || brand.link_classroom,
        discount_price: discount_price || brand.discount_price,
        file_product,
        commission: commission || brand.commission,
        variant: variant || brand.variant,
        category_brand: category_brand ? category_brand.toLowerCase() : brand.category_brand,
        brand_img
      });
  
      res.json({ status: true, message: "Brand updated successfully", data: brand });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
};
  

exports.getAllBrands = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
  
      const totalBrands = await Brand.count({ where: { isDelete: false } });
  
      const brands = await Brand.findAll({
        where: { isDelete: false },
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });
  
      if (brands.length === 0) {
        return res.status(404).json({ status: false, message: "No brands found" });
      }
  
      const totalPages = Math.ceil(totalBrands / limit);
  
      res.json({
        status: true,
        meta: {
            current_page: page,
            total_pages: totalPages,
            total_brands: totalBrands,
            per_page: limit,
        },
        data: brands
      });
  
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };
  

exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findOne({ where: { id: req.params.id, isDelete: false } });

    if (!brand) {
      return res.status(404).json({ status: false, message: "Brand not found" });
    }

    res.json({ status: true, data: brand });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({ where: { id: req.params.id, isDelete: false } });

    if (!brand) {
      return res.status(404).json({ status: false, message: "Brand not found" });
    }

    if (brand.brand_img) {
      const oldImagePath = path.join(__dirname, '..', brand.brand_img);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await brand.update({ isDelete: true });

    res.json({ status: true, message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
