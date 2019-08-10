const express = require('express')
const router = express.Router()
const {
  querySelectProducts,
  queryWhere,
  customerOrder,
  connectionEnd
} = require('../dbQueries/functions')

router.get('/', (req, res) => {
  querySelectProducts(['id', 'productName', 'price']).then(result =>
    res.render('purchase', { products: result })
  )
})
// .catch(res.status(500).send('Broken'))

router.get('/:id', (req, res) => {
  queryWhere('id', req.params.id).then(result => res.json(result))
})
// .catch(res.status(500).send('Broken'))

router.post('/', (req, res) => {
  customerOrder(req.body.id, req.body.quantity).then(result => res.json(result))
})

module.exports = router
