const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salesmanCode: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        default: 'admin'
    }


})


adminSchema.virtual('orders', {
    ref: 'Order',
    localField: 'salesmanCode',
    foreignField: 'salesmanCode'
})



adminSchema.statics.findByCredentials = async (name, password) => {
    const admin = await Admin.findOne({ name })
    if(!admin){
        throw new Error("Couldn't sign in")
    }
    if(admin.password !== password){
        throw new Error("Couldn't sign in")

    }

    return admin
}



const Admin = mongoose.model('Admin', adminSchema)


Admin.confirmCredentials = async function(adminName, password) {
    const admin = await Admin.findOne({name: adminName}) 

    if(!admin){
        throw new Error({message:'Invalid Credentials'})
    }

    if(admin.password !== password){
        throw new Error({message:'Invalid Credentials'})
    }

    const token = jwt.sign({id: admin._id}, 'secrethandshake')

    return {token, admin}
}


module.exports = Admin