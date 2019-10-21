const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'Username is required']
  },
  description: {
    type: String,
    required: [true, 'A brief description is required']
  },
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