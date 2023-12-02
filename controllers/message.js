const { default: mongoose } = require('mongoose');
let MessageModel = require('../models/messages');

module.exports.findThreadByProductId = async function (req, res, next) {
  const productId = new mongoose.Types.ObjectId(req.params.id);

  try {
    let messageFromProduct = await MessageModel.aggregate([
      {
        $match: {
          productId: productId
        }
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "questionId",
          as: "answers"
        }
      },
      {
        $unwind: { path: "$answers", preserveNullAndEmptyArrays: true, },

      },
    ]);

    res.json({
      message: "Messages found succesfully",
      success: true,
      messages: messageFromProduct,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

// Person who posts might be anonymous or registered user
module.exports.postMessage = async function (req, res, next) {

  let newMessage;
  try {
    // if the type of message === 'answer', only the author can answer
    if (req.body.type === 'answer') {
      if (req.auth?.id !== req.body.authorId) {
        throw new Error('Only owner of add can answer customers.')
      }
      newMessage = new MessageModel({
        type: req.body.type,
        content: req.body.content,
        authorId: req.body.authorId,
        productId: req.body.productId,
        questionId: req.body.questionId,
      });
    } else {
      newMessage = new MessageModel({
        type: req.body.type,
        content: req.body.content,
        authorId: req.body.authorId,
        productId: req.body.productId,
        questionId: req.body.questionId,
      });
    }

    let result = await MessageModel.create(newMessage);

    console.log(result);
    res.json({
      message: "Message posted succesfully",
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

// Only registered users can edit their messages
module.exports.updateMessage = async function (req, res, next) {
  try {
    let id = req.params.id;

    if (req.auth?.id !== req.body.authorId) {
      throw new Error('Only owner of add can answer customers.')
    }

    let result = await MessageModel.updateOne({ _id: id }, { content: req.body.content});

    if (result.modifiedCount > 0) {
      res.json(
        {
          success: true,
          message: "Message updated successfully."
        }
      );
    }
    else {
      throw new Error('Message not updated. Please verify it exists or you have the right permissions.')
    }

  } catch (err) {
    console.log(err);
    next(err)
  }
}

// Owner of product/ad can erase thread/messages
module.exports.eraseMessage = async function (req, res, next) {
  try {
    let id = req.params.id;

    if (req.auth?.id !== req.body.authorId) {
      throw new Error('Only owner of add can answer customers.')
    }

    let result = await MessageModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.json(
        {
          success: true,
          message: "Message deleted successfully."
        }
      )
    }
    else {
      throw new Error('Message not deleted. Please verify it exists or you have the right permissions.')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}
