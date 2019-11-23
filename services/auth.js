const jwt = require('jsonwebtoken');

const auth = (request, response) => {
    const user = request.body;
    const users = [{
        username: 'malforime',
        password: '1234'
    }];
    const match = users.some(_user => user.username === _user.username && user.password === _user.password);
    if(match) {
        const token = jwt.sign(user.username, process.env.SECRET_KEY);
        response.status(200).json({
            status: 'success',
            message: 'Logged success',
            token
        });
    } else {
        response.status(500).json({status: 'error', message: 'Authentication failed. Wrong user.'});
    }
};

module.exports = {auth};
