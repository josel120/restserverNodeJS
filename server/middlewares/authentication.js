/* jshint esversion:6 */

const jwt = require('jsonwebtoken');

// verify Token
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
        //console.log('decoded', decoded);
        next();
    });
};

// verify admin role
let verifyAdmin_Role = (req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'The user is not an admin'
            }
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin_Role
};