const mysql = require('mysql')

const connection =
  // mysql.createConnection(process.env.JAWSDB_URL) ||
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
  })

const connectionEnd = () => {
  connection.end(err => {
    if (err) {
      console.log(err)
    }
  })
}

const showProducts = columns => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT ?? FROM `products`', [columns], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  }).then(connectionEnd())
}

const dbUpdate = (newQuantity, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `products` SET `stockQuantity` = ? WHERE `itemId` = ?',
      [newQuantity, id],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        console.log('Database Updated!')
        return resolve(res)
      }
    )
  })
}

const customerOrder = (id, quantity) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `products` WHERE `itemId` = ?',
      [id],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        if (res[0].stockQuantity > quantity) {
          const newQuantity = res[0].stockQuantity - quantity
          console.log("You're order is processing!")
          dbUpdate(newQuantity, id).then(() => {
            console.log(`You're total is $${res[0].price * quantity}`, '\n')
            return resolve(res)
          })
        } else {
          console.log(
            `Sorry we only have ${res[0].stockQuantity} in stock`,
            '\n'
          )
          return resolve(res)
        }
      }
    )
  }).catch(console.error)
}

module.exports = {
  showProducts: showProducts,
  connectionEnd: connectionEnd
}
