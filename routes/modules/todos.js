// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')


// router.get('/', (req, res) => {
//   //  res.render('index')  //因為新增讀取所有todo,所以這行要修改如下
//   //  取出 Todo model 裡的所有資料
//   Todo.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .sort({ name: 'asc' })  //desc 反序， asc 正序
//     .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
//     // .then(todos => console.log(todos)) // 將資料傳給 index 樣板
//     .catch(error => console.error(error))  // 錯誤處理
// })

// router.get('/todos/new', (req, res) => {
router.get('/new', (req, res) => {
  return res.render('new')
})

// router.post('/todos', (req, res) => {
router.post('/', (req, res) => {
  const name = req.body.name  // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })  // 存入資料庫
    .then(() => res.redirect('/'))   // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// 瀏覽特定一筆資料的路由設定
// router.get('/todos/:id', (req, res) => {  // 用 req.params.id 拿到資料。
router.get('/:id', (req, res) => { 
  const id = req.params.id
  return Todo.findById(id)  // 用 Todo.findById查詢特定一筆 todo 資料
    .lean() //「撈資料以後想用 res.render()，就要先用 .lean()」
    .then((todo) => res.render('detail', { todo })) //傳給樣板引擎，請 Handlebars 幫忙組裝 detail 頁面
    .catch(error => console.log(error))
})

// "修改"特定一筆資料的路由設定
// router.get('/todos/:id/edit', (req, res) => {
router.get('/:id/edit', (req, res) => {
  //app.get('/todos/:id/edit', (req, res) => {  // Restful 前
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 資料庫修改特定 todo 的資料
// router.put('/todos/:id', (req, res) => {
router.put('/:id', (req, res) => {
  // app.post('/todos/:id/edit', (req, res) => {     // Restful 前
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//刪除todo 的資料
// router.delete('/todos/:id', (req, res) => {
router.delete('/:id', (req, res) => {
  // app.post('/todos/:id/delete', (req, res) => {    // Restful 前
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router