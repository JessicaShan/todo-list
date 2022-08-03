const express = require('express')
const mongoose = require('mongoose')

// 樣板引擎指定為 Handlebars
const exphbs = require('express-handlebars')

// 引用 body-parser
const bodyParser = require('body-parser')

// 載入 Todo model
const Todo = require('./models/todo')

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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // res.render('index')  因為新增讀取所有todo,所以這行要修改如下
  //  取出 Todo model 裡的所有資料
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error))  // 錯誤處理
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name  // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })  // 存入資料庫
    .then(() => res.redirect('/'))   // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`)
})