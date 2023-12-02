const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  type: {
      type: String,
      required: true,
      enum: ['question', 'answer']
  },
  content: {
      type: String,
      required: true
  },
  authorId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User'
  },
  productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: function() { return this.type === 'question'; }
  },
  questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: function() { return this.type === 'answer'; }
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;