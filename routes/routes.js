const express = require('express')
const router = express.Router()
const {
  cart,
  queryAllProducts,
  querySelectProducts,
  queryWhere,
  addToCart,
  customerOrder,
  connectionEnd
} = require('../dbQueries/functions')

router.get('/', (_req, res) => {
  console.table(cart)
  querySelectProducts(['id', 'productName', 'price'])
    .then(result => res.render('purchase', { products: result }))
    .catch(console.error())
})

router.get('/checkout', (_req, res) => {
  const cartTotal = cart.reduce((acc, val) => {
    return acc.total + val.total
  }, 0)
  res.render('checkout', { products: cart, cartTotal })
})

router.post('/cart', (req, res) => {
  addToCart(req.body.id, req.body.quantity)
    .then(result => res.json(result))
    .catch(console.error())
})

router.post('/purchase', (_req, res) => {
  customerOrder(cart).then(() => queryAllProducts())
})

module.exports = router
