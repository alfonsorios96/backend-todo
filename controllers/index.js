const mongoose = require('mongoose');
const todoListController = require('./todo-list');

(async () => {
    mongoose.connect(process.env.DB_URL_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
})();

module.exports = {todoListController};
