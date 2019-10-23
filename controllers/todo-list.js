const mongoose = require('mongoose');
const schemas = require('../schemas');
const TodoList = mongoose.model('todo-list', schemas.todoSchema);

const createTodoList = async (todo) => {
  return new TodoList(todo).save();
};

const findTodoList = async (_id) => {
  return await TodoList.findOne({ _id });
};

const findAll = async () => {
  return await TodoList.find();
};

const updateTodoList = async (todo) => {
  return await TodoList.updateOne({
    _id: todo._id
  }, todo, {
    new: true
  });
};

module.exports = {findTodoList, createTodoList, findAll, updateTodoList};
