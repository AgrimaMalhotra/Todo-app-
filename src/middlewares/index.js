const axios = require('axios');


const validateUserMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) throw new Error('Access Denied');
        const error = await axios.post(`http://localhost:3000/auth/token/validate`, { authorization: token });
        if (error.status === 200) {
            next();
        }
    } catch (err) {
        res.status(401).json({ message: 'Validation Failed' });
    }

};

module.exports = { validateUserMiddleware };