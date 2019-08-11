const select = id => document.getElementById(id)

const total = arr => {
  let total = 0
  arr.forEach(item => {
    total += item.price * item.quantity
  })
  return total
}

const cartView = arr => {
  select('items').textContent = `In Cart: ${arr.length}`
  select('total').textContent = `Total: $${total(arr)}`
}

document.querySelectorAll('.btn').forEach(btn =>
  btn.addEventListener('click', e => {
    axios
      .post('/cart', {
        id: e.target.id,
        quantity: select(`quant${e.target.id}`).value
      })
      .then(function (result) {
        cartView(result.data)
      })
  })
)

select('checkout').addEventListener('click', e => {
  axios.get('/checkout')
  window.location.assign('/checkout')
})
