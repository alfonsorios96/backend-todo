const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: String,
  description: String,
  tasks: [
    {
        title: String,
        is_done: {
            type: Boolean,
            default: false
        }
    }
  ]
})

module.exports = todoSchema;
