/* jshint esversion:6 */

const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid Token'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = {
    verifyToken
};