import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//  スキーマの作成
//  今回保存したいドキュメントはname(String)とage(Number)の２つのフィールドを持つ
const ColorSchema = new mongoose.Schema({
  mainColor: String,
  subColor: String,
  accentColor: String,
  textColor: String,
})

// モデルの作成
// mongoose.modelの第一引数の複数形の名前（今回だと'characters'）のコレクションが生成される
const Color = mongoose.model('Color', ColorSchema)

// モデルをexport
export default Color