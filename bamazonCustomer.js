const inquirer = require('inquirer')
const mysql = require('mysql')

const finished = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'finished',
        message: 'Would you like to make any other purchases?',
        choices: ['Yes', 'No']
      }
    ])
    .then(answers => {
      const expr = answers.finished
      switch (expr) {
        case 'Yes':
          transaction()
          break
        case 'No':
          connectionEnd()
          break
      }
    })
}

const questions = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        message:
          'What is the itemId number of the Item you would like to purchase?',
        validate: value => !Number.isNaN(value)
      },
      {
        name: 'quantity',
        message: 'How many of that item would you like to purchase?',
        validate: value => !Number.isNaN(value)
      }
    ])
    .then(answers => customerOrder(answers.id, answers.quantity))
    .catch(console.error)
}

const transaction = () => {
  showProducts(['itemId', 'productName', 'price'])
    .then(() => questions())
    .catch(console.error)
}

transaction()
