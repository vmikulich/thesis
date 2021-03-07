const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const analyticsRoutes = require('./routes/analytics')
const app = express()

dotenv.config()

mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        next()
})


app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/analytics', analyticsRoutes)


module.exports = app