// const mongoose = require('mongoose')
// const validator = require('validator')
// const jwt = require ('jsonwebtoken')

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 3
        
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }

//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 7
//     },

// })

// userSchema.virtual('orders',{
//     ref: 'Order',
//     localField: '_id',
//     foreignField: 'owner'
// })

// userSchema.methods.generateAuthToken = function(){
//     const user = this
//     const token = jwt.sign({_id: user._id.toString()},'stilldre')
//     return token

// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })
//     if(!user){
//         throw new Error("Couldn't sign in")
//     }
//     if(user.password !== password){
//         throw new Error("Couldn't sign in")

//     }

//     return user
// }

// const User = mongoose.model('User',userSchema)



// module.exports = User