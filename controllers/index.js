const mongoose = require('mongoose');
const userSchema = require('../schemas');
const User = mongoose.model('user', userSchema, 'user');
const connectionString = 'mongodb+srv://root:n0m3l0@cluster0-rfdqn.mongodb.net/test?retryWrites=true&w=majority';

async function createUser(username) {
  return new User({
    username,
    created: Date.now()
  }).save();
}

async function findUser(username) {
  return await User.findOne({ username });
}

(async () => {
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const username = 'Alfonso rios';

  let user = await connector.then(async () => {
    return findUser(username);
  })

  if (!user) {
    user = await createUser(username);
  }
})();
