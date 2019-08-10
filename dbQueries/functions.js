const mysql = require('mysql')

const connection =
  mysql.createConnection(process.env.JAWSDB_URL) ||
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

const queryAllProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `products`', (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const querySelectProducts = columns => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT ?? FROM `products`', [columns], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

const queryWhere = (column, value) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM products WHERE ?? = ?',
      [column, value],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

const dbUpdate = (newQuantity, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `products` SET `stockQuantity` = ? WHERE `id` = ?',
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
      'SELECT * FROM `products` WHERE `id` = ?',
      [id],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        if (res[0].stockQuantity > quantity) {
          const newQuantity = res[0].stockQuantity - quantity
          dbUpdate(newQuantity, id).then(() => {
            const total = res[0].price * quantity
            return resolve(total)
          })
        } else {
          return resolve('Insufficient Quantity!')
        }
      }
    )
  })
}

const lowInventory = () => {
  queryProducts()
    .then(data => {
      console.table(data.filter(quant => quant.stockQuantity < 5))
      finished()
    })
    .catch(console.error)
}

const updateProducts = (total, answerId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `products` SET stockQuantity = ? WHERE itemId = ?',
      [total, answerId.id],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

const addInventory = () => {
  queryProducts()
    .then(data => {
      console.table(data)
      updatePrompts().then(answer => {
        const total =
          data.filter(id => id.itemId === answer.id)[0].stockQuantity +
          answer.quantity
        updateProducts(total, answer).then(() => {
          queryProducts().then(data => {
            console.table(data.filter(id => id.itemId === answer.id))
            finished()
          })
        })
      })
    })
    .catch(console.error)
}

const newProductRow = data => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO products SET ?', [data], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

module.exports = {
  querySelectProducts: querySelectProducts,
  queryWhere: queryWhere,
  customerOrder: customerOrder,
  connectionEnd: connectionEnd
}
