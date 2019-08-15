const select = id => document.getElementById(id)

const total = arr =>
  arr.reduce((acc, val) => {
    acc += val.price * val.quantity
    return Number(acc)
  }, 0)

const cartView = arr => {
  select('items').textContent = `In Cart: ${arr.length}`
  select('total').textContent = `Total: $${total(arr)}`
}

const addToCartPost = e => {
  axios
    .post('/cart', {
      id: e.target.id,
      quantity: select(`quant${e.target.id}`).value
    })
    .then(function(result) {
      if (!Array.isArray(result.data)) {
        select(`quantity${e.target.id}`).textContent = result.data
      } else {
        select(`quantity${e.target.id}`).textContent = 'Quantity'
        return cartView(result.data)
      }
    })
}

const getCheckout = () => {
  axios.get('/checkout')
  window.location.assign('/checkout')
}

const purchase = () =>
  axios.post('/purchase').then(result => {
    select('header').textContent = 'Purchase Complete!'
  })

document
  .querySelectorAll('.btn')
  .forEach(btn => btn.addEventListener('click', addToCartPost))
