const express = require('express')
const passport = require('passport')
const controller = require('../controllers/position')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/:categoryId', passport.authenticate('jwt', { session: false }),controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router