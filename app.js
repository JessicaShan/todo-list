const express = require('express')
const mongoose = require('mongoose')

// 樣板引擎指定為 Handlebars
const expresshbs = require('express-handlebars')

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 樣板引擎指定為 Handlebars 的程式碼
app.engine('hbs', expresshbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})