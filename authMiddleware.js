const jwt = require('jsonwebtoken');

const authenticatetoken = (res, req, next) => {

    const token = req.headers.authorization;

    if (token) {
        return res.status.authorization;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // const verified = jwt.verify(token, 'your_jwt_secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invald token'});
    }
};

module.exports = authenticatetoken;