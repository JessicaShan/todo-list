const express = require('express')
// const mongoose = require('mongoose')

// 樣板引擎指定為 Handlebars
const exphbs = require('express-handlebars')

// 引用 body-parser
const bodyParser = require('body-parser')

// U76 用 require 載入 method - override 
const methodOverride = require('method-override')

// 載入 Todo model
// const Todo = require('./models/todo')

// 引用路由器
const routes = require('./routes')

const app = express()
// // console.log(process.env.MONGODB_URI)
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // 取得資料庫連線狀態
// const db = mongoose.connection
// // 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

require('./config/mongoose')

// 樣板引擎指定為 Handlebars 的程式碼
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// U76 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// app.get('/', (req, res) => {
//   //  res.render('index')  //因為新增讀取所有todo,所以這行要修改如下
//   //  取出 Todo model 裡的所有資料
//   Todo.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ name: 'asc' })  //desc 反序， asc 正序
//     .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
//     // .then(todos => console.log(todos)) // 將資料傳給 index 樣板
//     .catch(error => console.error(error))  // 錯誤處理
// })

// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/todos', (req, res) => {
//   const name = req.body.name  // 從 req.body 拿出表單裡的 name 資料
//   return Todo.create({ name })  // 存入資料庫
//     .then(() => res.redirect('/'))   // 新增完成後導回首頁
//     .catch(error => console.log(error))
// })

// // 瀏覽特定一筆資料的路由設定
// app.get('/todos/:id', (req, res) => {  // 用 req.params.id 拿到資料。
//   const id = req.params.id
//   return Todo.findById(id)  // 用 Todo.findById查詢特定一筆 todo 資料
//     .lean() //「撈資料以後想用 res.render()，就要先用 .lean()」
//     .then((todo) => res.render('detail', { todo })) //傳給樣板引擎，請 Handlebars 幫忙組裝 detail 頁面
//     .catch(error => console.log(error))
// })

// // "修改"特定一筆資料的路由設定
// app.get('/todos/:id/edit', (req, res) => {
//   //app.get('/todos/:id/edit', (req, res) => {  // Restful 前
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })

// // 資料庫修改特定 todo 的資料
// app.put('/todos/:id', (req, res) => {
//   // app.post('/todos/:id/edit', (req, res) => {     // Restful 前
//   const id = req.params.id
//   const { name, isDone } = req.body
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on'
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })

// //刪除todo 的資料
// app.delete('/todos/:id', (req, res) => {
//   // app.post('/todos/:id/delete', (req, res) => {    // Restful 前
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.listen(3000, () => {
//   console.log(`App is running on http://localhost:3000`)
// })
// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})