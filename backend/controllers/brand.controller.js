const db = require('../models');
const path = require('path');
const fs = require('fs');

const { Brand, TurunanBrand } = db;

const turunanProgram = [
  "Non Degree (Kelas Bahasa di China)",
  "Degree",
  "Mentor Scholarship",
  "Kelas HSK",
  "Premium Mandarin Learning",
  "Educonsult S1-S3 Full Cover",
  "Grow with Us"
];

const turunanProduct = [
  "Comprehensive Chinese Book",
  "E-Flashcard/HSK",
  "Buku Tulis Hanzi",
  "Buku Panduan",
];

const categoryBrandOption = ["program", "product"];

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

    const MAX_IMAGE_SIZE = 300 * 1024;
    if (imageFile.size > MAX_IMAGE_SIZE) {
      return res.status(400).json({ status: false, message: "Brand image size must be less than 300KB!" });
    }

    const imageName = `${Date.now()}_${imageFile.name.replace(/\s/g, "_")}`;
    const imagePath = path.join(__dirname, '../public/brand', imageName);
    await imageFile.mv(imagePath);
    brand_img = `/public/brand/${imageName}`;

    if (req.files.file_product) {
      const productFile = req.files.file_product;
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (productFile.size > MAX_FILE_SIZE) {
        return res.status(400).json({ status: false, message: "Product file size must be less than 5MB!" });
      }

      const productName = `${Date.now()}_${productFile.name.replace(/\s/g, "_")}`;
      const productPath = path.join(__dirname, '../public/products', productName);
      await productFile.mv(productPath);
      file_product = `/public/products/${productName}`;
    }

    const {
      title,
      sub_title,
      turunan,
      turunan_id,
      price,
      detail_brand,
      link_classroom,
      type_product,
      commission,
      category_brand,
      variant,
      discount_price
    } = req.body;

    const category_brand_lower = category_brand.toLowerCase();
    const type_product_lower = type_product?.toLowerCase();

    const listCategoryBrand = ["program", "product"];
    const listTypeProduct = ["digital", "fisik"];

    if (!listCategoryBrand.includes(category_brand_lower)) {
      return res.status(400).json({ status: false, message: "Brand Category Invalid Input! (Program or Product)" });
    }

    if (category_brand_lower === "product") {
      if (!type_product || !listTypeProduct.includes(type_product_lower)) {
        return res.status(400).json({ status: false, message: "Product Type Invalid Input! (Digital or Fisik)" });
      }
    }

    let usedTurunan = turunan;
    let usedTurunanId = turunan_id;
    let turunanExist = null;

    if(turunan_id) {
      turunanExist = await TurunanBrand.findOne({
        where: { id: turunan_id }
      });
    }

    // 🔥 Check for custom input turunan
    if (!turunan_id && title && sub_title && turunan) {
      if (!turunanExist) {
        turunanExist = await TurunanBrand.create({
          title: title.trim(),
          sub_title: sub_title.trim(),
          turunan: turunan.trim()
        });
      }
    }
    usedTurunanId = turunanExist.id;
    usedTurunan = turunanExist.turunan;

    const requiredFields = { variant, price, detail_brand, category_brand, commission };
    const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);

    if (!usedTurunan) missingFields.push("turunan");

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: false,
        message: "These fields are required!",
        missing_fields: missingFields
      });
    }

    const newBrand = await Brand.create({
      turunan: usedTurunan,
      turunan_id: usedTurunanId,
      price,
      sold_sum: 0,
      detail_brand,
      link_classroom,
      discount_price,
      file_product,
      commission,
      variant,
      category_brand: category_brand_lower,
      type_product: type_product_lower,
      brand_img
    });

    res.status(201).json({ status: true, message: 'Brand created successfully', data: newBrand });
  } catch (error) {
    console.error("🔥 Error at createBrand:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getGroupedBrands = async (req, res) => {
  try { 
    const brands = await Brand.findAll({
      where: { isDelete: false },
      order: [['createdAt', 'DESC']],
    });

    if (brands.length === 0) {
      return res.status(404).json({ status: false, message: "Brand Data not found!" });
    }

    const groupedBrands = brands.reduce((acc, brand) => {
      if (turunanProduct.includes(brand.turunan)) {
        if (!acc[brand.turunan]) {
          acc[brand.turunan] = [];
        }
        acc[brand.turunan].push(brand);
      }
      return acc;
    }, {});

    
    const formattedResponse = Object.keys(groupedBrands).map((turunan_brand) => {
      const brandList = groupedBrands[turunan_brand];

      return {
        turunan_brand,
        image: brandList[0].brand_img, 
        start_from_price: Math.min(...brandList.map(brand => parseFloat(brand.discount_price && brand.discount_price != 0 ? brand.discount_price : brand.price || brand.price))), 
        commission: brandList[0].commission, 
        total_items: brandList.length, 
        brands: brandList, 
      };
    });

    res.status(200).json({ status: true, data: formattedResponse });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getCategoryTurunanBrand = async (req, res) => {
  const { category_brand, turunan_brand } = req.query;

  try {
    if (!category_brand || !turunan_brand) {
      return res.status(400).json({ status: false, message: "Both 'category_brand' and 'turunan_brand' must be provided." });
    }

    const category = category_brand.toLowerCase();
    if (!categoryBrandOption.includes(category)) {
      return res.status(400).json({ status: false, message: "Category Brand is not found in the available list." });
    }

    if (category === "program" && !turunanProgram.includes(turunan_brand)) {
      return res.status(400).json({ status: false, message: "Turunan Brand is not found in the list of program subcategories." });
    }

    if (category === "product" && !turunanProduct.includes(turunan_brand)) {
      return res.status(400).json({ status: false, message: "Turunan Brand is not found in the list of product subcategories." });
    }

    const brand = await Brand.findAll({ where: { turunan: turunan_brand, isDelete: false } });

    if (brand.length === 0) {
      return res.status(404).json({ status: false, message: "No Brand data found for this category and subcategory." });
    }

    res.status(200).json({ status: true, data: brand });
  } catch (error) {
    console.error("🔥 ERROR:", error);
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
      const allowedImageTypes = [".jpg", ".jpeg", ".png", ".webp"];
      const imageExt = path.extname(imageFile.name).toLowerCase();

      if (!allowedImageTypes.includes(imageExt)) {
        return res.status(400).json({ status: false, message: "Only image files are allowed!" });
      }

      const MAX_IMAGE_SIZE = 300 * 1024;
      if (imageFile.size > MAX_IMAGE_SIZE) {
        return res.status(400).json({ status: false, message: "Image too large!" });
      }

      const imageName = `${Date.now()}_${imageFile.name.replace(/\s/g, "_")}`;
      const imagePath = path.join(__dirname, '../public/brand', imageName);

      if (brand.brand_img && fs.existsSync(path.join(__dirname, '..', brand.brand_img))) {
        fs.unlinkSync(path.join(__dirname, '..', brand.brand_img));
      }

      await imageFile.mv(imagePath);
      brand_img = `/public/brand/${imageName}`;
    }

    if (req.files && req.files.file_product) {
      const productFile = req.files.file_product;
      const MAX_FILE_SIZE = 5 * 1024 * 1024;

      if (productFile.size > MAX_FILE_SIZE) {
        return res.status(400).json({ status: false, message: "File product too large!" });
      }

      const productName = `${Date.now()}_${productFile.name.replace(/\s/g, "_")}`;
      const productPath = path.join(__dirname, '../public/products', productName);

      if (brand.file_product && fs.existsSync(path.join(__dirname, '..', brand.file_product))) {
        fs.unlinkSync(path.join(__dirname, '..', brand.file_product));
      }

      await productFile.mv(productPath);
      file_product = `/public/products/${productName}`;
    }

    const {
      title,
      sub_title,
      turunan_id,
      turunan,
      price,
      detail_brand,
      link_classroom,
      commission,
      category_brand,
      variant,
      discount_price,
      type_product
    } = req.body;

    if(!turunan_id) {
      if (!sub_title || !title || !turunan) {
        return res.status(400).json({ status: false, message: "Field Tidak Boleh Kosong!!" });
      }
    }

    const category_brand_lower = category_brand?.toLowerCase();
    const type_product_lower = type_product?.toLowerCase();
    const listCategoryBrand = ["program", "product"];
    const listTypeProduct = ["digital", "fisik"];

    if (category_brand && !listCategoryBrand.includes(category_brand_lower)) {
      return res.status(400).json({ status: false, message: "Invalid Brand Category!" });
    }

    if (category_brand_lower === "product") {
      if (!type_product || !listTypeProduct.includes(type_product_lower)) {
        return res.status(400).json({ status: false, message: "Invalid Product Type!" });
      }
    }

    let turunanExist = null;
    if (turunan_id) {
      turunanExist = await TurunanBrand.findOne({ where: { id: turunan_id, turunan } });
    }

    if (!turunanExist) {
      const requiredFields = { title, sub_title, turunan };
      const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          status: false,
          message: "These fields are required for new Turunan!",
          missing_fields: missingFields
        });
      }

      turunanExist = await TurunanBrand.create({
        title: title.trim(),
        sub_title: sub_title?.trim() || null,
        turunan,
      });
    }

    await brand.update({
      turunan: turunanExist.turunan,
      turunan_id: turunanExist.id,
      price: price || brand.price,
      detail_brand: detail_brand || brand.detail_brand,
      link_classroom: link_classroom || brand.link_classroom,
      discount_price: discount_price || brand.discount_price,
      file_product,
      commission: commission || brand.commission,
      variant: variant || brand.variant,
      category_brand: category_brand ? category_brand_lower : brand.category_brand,
      type_product: type_product ? type_product_lower : brand.type_product,
      brand_img
    });

    res.json({ status: true, message: "Brand updated successfully", data: brand });
  } catch (error) {
    console.error("🔥 Error at updateBrand:", error);
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

exports.getLatestPrograms = async (req, res) => {
  try {
    const latestPrograms = await Brand.findAll({
      where: { isDelete: false, category_brand: "program" },
      order: [['createdAt', 'DESC']],
      limit: 7,
    });

    if (latestPrograms.length === 0) {
      return res.status(404).json({ status: false, message: "No latest programs found" });
    }

    res.json({ status: true, data: latestPrograms });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

exports.getTurunanOptions = async (req, res) => {
  const { category_brand, search } = req.query;

  try {
    if (!category_brand) {
      return res.status(400).json({ status: false, message: "Category brand must be provided." });
    }

    const category = category_brand.toLowerCase();
    const searchKeyword = search ? search.toLowerCase() : "";

    if (!categoryBrandOption.includes(category)) {
      return res.status(400).json({ status: false, message: "Invalid category brand!" });
    }

    let turunanList = [];

    if (category === "program") {
      turunanList = turunanProgram;
    } else if (category === "product") {
      turunanList = turunanProduct;
    }

    // 🔥 Ambil turunan tambahan dari database yang mungkin sudah dibuat manual user
    const dbTurunan = await Brand.findAll({
      where: {
        category_brand: category,
        isDelete: false,
      },
      attributes: ["turunan"],
      group: ["turunan"]
    });

    const dbTurunanList = dbTurunan.map(b => b.turunan).filter(Boolean); // remove null/empty string

    // 🔥 Gabungkan list hardcoded + dari DB
    const combinedTurunan = [...new Set([...turunanList, ...dbTurunanList])]; // remove duplicates

    // 🔥 Filter berdasarkan search query (kalau ada)
    const filteredTurunan = combinedTurunan.filter(t => 
      t.toLowerCase().includes(searchKeyword)
    );

    // 🔥 Format response
    const options = filteredTurunan.map(turunan => ({
      label: turunan,
      value: turunan,
    }));

    res.status(200).json({ status: true, data: options });
  } catch (error) {
    console.error("🔥 Error at getTurunanOptions:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};