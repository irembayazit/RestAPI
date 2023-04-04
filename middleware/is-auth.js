const jwt = require('jsonwebtoken')

module.exports = isAuth = (req, res, next) => {
    const authorization = req.get('Authorization')
    if(!authorization){
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        return error
    }
    const token = authorization.split(' ')[1];
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'secretkey')
    }catch (err){
        err.statusCode = 500;
        return err
    }
    if(!decodeToken){
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        return error
    }
    req.userId = decodeToken.userId;
    next();
}
