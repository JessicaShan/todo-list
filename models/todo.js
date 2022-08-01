// 把 mongoose 載入進來
const mongoose = require('mongoose')
// 設定mongoose.Schema 模組
const Schema = mongoose.Schema
// 把我們想要的資料結構當成參數傳給 new Schema()，這裡 Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema
const todoSchema = new Schema({
  name: {
    // 資料型別是字串
    type: String,
    // 表示是必填欄位，不能為空白
    required: true,
  },
  done: {
    type: Boolean
  }
})

// 透過 module.exports 輸出。
module.exports = mongoose.model('Todo', todoSchema)