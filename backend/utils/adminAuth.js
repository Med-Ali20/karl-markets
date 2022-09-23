const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.header('Authorization')
        const decoded = jwt.verify(token, 'secrethandshake')
        if(!decoded){
            throw new Error('Unauthorized')
        }

        const admin = await Admin.findOne({_id: decoded.id})
        req.admin = admin
        
        if(!admin) {
            throw new Error('Unauthorized')
        }

        next()
        
    } catch (error) {
        res.status(401).json('Unauthorized')
    }
}


module.exports = auth