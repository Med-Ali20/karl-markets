const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {
    const token = req.headers.authorization || req.header('Authorization')
    const decoded = jwt.verify(token, 'secrethandshake')
    if(!decoded){
        res.status(401).json('Unauthorized')
    }

    const admin = await Admin.findOne({_id: decoded.id})
    req.admin = admin
    
    if(!admin) {
        res.status(401).json('Unauthorized')
    }

    next()
}


module.exports = auth