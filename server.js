const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const routes = require('./routes/routes')
// const { showProducts, connectionEnd } = require('./javascript/functions')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'index' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
