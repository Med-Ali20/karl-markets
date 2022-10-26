const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const orderRouter = require('./routes/orders')
const userRouter = require('./routes/users')
const adminRouter = require('./routes/admin')
const path = require('path')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(orderRouter)
// app.use(userRouter)
app.use(adminRouter)



const CONNECTION_URL = process.env.MONGO_URI
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) =>
res.sendFile(
  path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
))


app.listen(PORT)