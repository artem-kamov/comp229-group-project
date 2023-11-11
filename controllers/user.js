let UserModel = require('../models/user');

module.exports.list = async function (req, res, next) {
  try {
    let allUsers = await UserModel.find({}, '-hashed_password -salt');
    res.json({
      message: "Users found succesfully",
      success: true,
      users: allUsers,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports.userByID = async function (req, res, next) {
  try {
    let userID = req.params.userID;
    req.user = await UserModel.findOne({ _id: userID }, '-hashed_password -salt');
    res.json({
      message: "User found succesfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

exports.read = function (req, res) {
  res.json(req.user);
};

module.exports.create = async function (req, res, next) {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);
    res.json(
      {
        success: true,
        message: "User created sucessfully.",
        result
      }
    );
  } catch (error) {
    console.log(error);
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let updatedUser = UserModel(req.body);
    updatedUser._id = userId;

    let result = await UserModel.updateOne({ _id: userId }, updatedUser);
    console.log(result);
    if (result.modifiedCount > 0) {
      res.json(
        {
          success: true,
          message: "User updated sucessfully."
        }
      );
    }
    else {
      // Express will catch this on its own.
      throw new Error('User not updated. Are you sure it exists?')
    }
  } catch (error) {
    next(error)
  }
}

module.exports.remove = async (req, res, next) => {
  try {
    let id = req.params.userId;
    let result = await UserModel.deleteOne({ _id: id });
    console.log("====> Result: ", result);
    if (result.deletedCount > 0) {
      res.json(
        {
          success: true,
          message: "User deleted sucessfully."
        }
      )
    }
    else {
      throw new Error('User not deleted. Are you sure it exists?')
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.setAdmin = async function (req, res, next) {

  try {
    // Check if the current user is admin
    let authorized = await UserModel.findOne({ _id: req.auth.id }, 'admin');

    if (!authorized) {
      return res.status('403').json(
        {
          success: false,
          message: "User is not authorized"
        }
      )
    }
    else {
      let result = await UserModel.updateOne({ _id: req.params.userId }, { admin: true });
      console.log("setAdmin", result);
      if (result.modifiedCount > 0) {
        res.json(
          {
            success: true,
            message: "User promoted successfully."
          }
        );
      }
      else {
        throw new Error('User not updated. Are you sure it exists?')
      }
    }
  } catch (error) {
    console.log(error);
    next(error)
  }

}
