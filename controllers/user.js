let UserModel = require('../models/user');

module.exports.list = async function (req, res, next) {
  try {
    let allUsers = await UserModel.find({});
    res.json({
      message: "Users found succesfully",
      success: true,
      products: allUsers,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.listOne = async function (req, res, next) {
  try {
    let id = req.params.id;
    let selectedUser = await UserModel.find({ _id: id });
    res.json({
      message: "User found succesfully",
      success: true,
      selectedUser,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.create = async function (req, res, next) {
  try {
    let newUser = new UserModel(req.body);
    let createdUser = await UserModel.create(newUser);
    res.json({
      message: "User created succesfully",
      success: true,
      createdUser,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let id = req.params.id;
    let userToUpdate = await UserModel.updateOne({ _id: id }, {
      ...req.body,
    });
  res.json({
    message: "User updated succesfully",
    success: true,
    userToUpdate,
  });
} catch (err) {
  console.log(err);
  next(err)
}
}

module.exports.erase = async function (req, res, next) {
  try {
    let id = req.params.id;
    let erasedUser = await UserModel.deleteOne({ _id: id });
    res.json({
      message: "User deleted succesfully",
      success: true,
      erasedUser,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}
