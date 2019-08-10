const select = id => document.getElementById(id)

document.querySelectorAll('.btn').forEach(btn =>
  btn.addEventListener('click', e => {
    console.log(e.target)
    axios
      .post('/', {
        id: e.target.id,
        quantity: select(`quant${e.target.id}`).value
      })
      .then(function(result) {
        console.log(result.data)
      })
  })
)
