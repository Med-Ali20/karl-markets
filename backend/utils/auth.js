// const jwt = require('jsonwebtoken')
// const User = require('../models/users')

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization') || req.headers.Authorization
//         const decoded = jwt.verify(token, 'stilldre')
//         const user = await User.findOne({ _id: decoded._id})

//         if (!user) {
//             throw new Error()
//         }
        
//         req.token = token
//         req.user = user
//         next()
//     } catch (e) {
//         res.status(401).json('Unauthorized')
//     }
// }

// module.exports = auth