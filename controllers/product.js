let ProductModel = require('../models/product');

module.exports.list = async function (req, res, next) {
  try {
    let allProducts = await ProductModel.find({});
    res.json({
      message: "Products found succesfully",
      success: true,
      products: allProducts,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.listOne = async function (req, res, next) {
  try {
    let id = req.params.id;
    let selectedProduct = await ProductModel.find({ _id: req.params.id });
    res.json({
      message: "Product found succesfully",
      success: true,
      selectedProduct,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.processAddProduct = async function (req, res, next) {
  try {

    let newProduct = ProductModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      location: req.body.location,
      image: req.body.image,
      category: req.body.category,
      postedAt: req.body.postedAt,
      owner: (req.body.owner == null || req.body.owner == "") ? req.auth.id : req.body.owner
    });

    let result = await ProductModel.create(newProduct);

    console.log(result);
    res.json({
      message: "Product created succesfully",
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let id = req.params.id;

    let result = await ProductModel.updateOne({ _id: id }, req.body);

    if (result.modifiedCount > 0) {
      res.json(
        {
          success: true,
          message: "Listing updated successfully."
        }
      );
    }
    else {
      throw new Error('Listing not updated. Are you sure it exists?')
    }

  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.erase = async function (req, res, next) {
  try {
    let id = req.params.id;

    let result = await ProductModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.json(
        {
          success: true,
          message: "Item deleted successfully."
        }
      )
    }
    else {
      throw new Error('Item not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
