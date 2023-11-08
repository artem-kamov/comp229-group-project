// May be of use for developing endpoints

// let ProductModel = require('../models/product');

// module.exports.list = async function (req, res, next) {
//   try {
//     let allProducts = await ProductModel.find({});
//     res.json({
//       message: "Products found succesfully",
//       success: true,
//       products: allProducts,
//     });
//   } catch (err) {
//     console.log(err);
//     next(err)
//   }
// }

// module.exports.listOne = async function (req, res, next) {
//   try {
//     let id = req.params.id;
//     let selectedProduct = await ProductModel.find({ _id: id });
//     res.json({
//       message: "Product found succesfully",
//       success: true,
//       selectedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     next(err)
//   }
// }

// module.exports.create = async function (req, res, next) {
//   try {
//     let newProduct = new ProductModel(req.body);
//     let createdProduct = await ProductModel.create(newProduct);
//     res.json({
//       message: "Product created succesfully",
//       success: true,
//       createdProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     next(err)
//   }
// }

// module.exports.update = async function (req, res, next) {
//   try {
//     let id = req.params.id;
//     let productToUpdate = await ProductModel.updateOne({ _id: id }, {
//       ...req.body,
//     });
//   res.json({
//     message: "Product updated succesfully",
//     success: true,
//     productToUpdate,
//   });
// } catch (err) {
//   console.log(err);
//   next(err)
// }
// }

// module.exports.erase = async function (req, res, next) {
//   try {
//     let id = req.params.id;
//     let erasedProduct = await ProductModel.deleteOne({ _id: id });
//     res.json({
//       message: "Product deleted succesfully",
//       success: true,
//       erasedProduct,
//     });
//   } catch (err) {
//     console.log(err);
//     next(err)
//   }
// }
