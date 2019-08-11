const express = require('express')
const router = express.Router()
const {
  cart,
  querySelectProducts,
  queryWhere,
  addToCart,
  customerOrder,
  connectionEnd
} = require('../dbQueries/functions')

router.get('/', (req, res) => {
  querySelectProducts(['id', 'productName', 'price'])
    .then(result => res.render('purchase', { products: result }))
    .catch(console.error())
})

router.post('/cart', (req, res) => {
  addToCart(req.body.id, req.body.quantity)
    .then(result => res.json(result))
    .catch(console.error())
})

router.get('/checkout', (req, res) => {
  // queryWhere('id', cart.map(arr => arr.res[0].id)).then(result => {
  console.table(cart)
  const cartTotal = cart.reduce((acc, val) => acc.total + val.total)
  res.render('checkout', { products: cart, cartTotal })
})

module.exports = router
