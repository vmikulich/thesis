const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        userId: candidate._id,
        email: candidate.email
      }, `${process.env.JWT_SECRET}`, {expiresIn: 3600})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Passwords do not match.'
      })
    }
  } else {
    res.status(404).json({
      message: 'User with such email is not found.'
    })
  }
}

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email })  
  if (candidate) {
    res.status(409).json({
      message: 'Such email has already in use. Please try another one.'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
      
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
