const mongoose = require('mongoose')
const Shema = mongoose.Schema

const positionShema = new Shema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  // description: {
  //   type: String,
  //   required: true
  // },
  // link: {
  //   type: String,
  //   required: true
  // },
  // imageSrc: {
  //   type: String,
  //   default: ''
  // },
  category: {
    ref: 'categories',
    type: Shema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: Shema.Types.ObjectId
  }
})

module.exports = mongoose.model('positions', positionShema)