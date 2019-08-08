const express = require('express')
const router = express.Router()
const { showProducts, connectionEnd } = require('../javascript/functions')

router.get('/', (req, res) => {
  showProducts(['itemId', 'productName', 'price']).then(result =>
    res.render('store', { products: result })
  )
})

module.exports = router
