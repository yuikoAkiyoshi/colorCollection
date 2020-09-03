import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Color from './color' // モデルをimport

const app = express()
const port = 3001
const dbUrl = 'mongodb://localhost/colorCollection' // dbの名前指定

// body-parserを適用
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())

 mongoose.connect(dbUrl, dbErr => {
    if (dbErr) throw new Error(dbErr)
    else console.log('db connected')

    // POSTリクエストに対処
    app.post('/api/colors', (request, response) => {
        const { mainColor, subColor, accentColor, textColor } = request.body  // 送られてきた名前と年齢を取得
        // DBにデータを保存
        // １つのドキュメントを表すインスタンスを生成し、このインスタンスのsaveメソッドを使う。
        // save()の引数はコールバック関数なので、その中でクライアントにレスポンスを送り返すようにする。
        new Color({
            mainColor,
            subColor,
            accentColor,
            textColor,
        }).save(err => {
            if (err) response.status(500)
            else {
                Color.find({}, (findErr, colorArray) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(colorArray)
                })
            }
        })
    })

    // //GETリクエストに対処
    app.get('/api/colors', (request, response) => {
        Color.find({}, (err, colorArray) => {  // 取得したドキュメントをクライアント側と同じくcolorArrayと命名
            if (err) response.status(500).send()
            else response.status(200).send(colorArray)  // colorArrayをレスポンスとして送り返す
        })
    })

    //PUTリクエストに対処
    app.put('/api/colors', (request, response) => {
        const { id, mainColor, subColor, accentColor, textColor  } = request.body  // updateするキャラクターのidをリクエストから取得
        Color.findByIdAndUpdate(id, { $set:
            {
                "mainColor": mainColor,
                "subColor": subColor,
                "accentColor": accentColor,
                "textColor": textColor
            } }, err => {
            if (err) response.status(500).send()
            else {  // updateに成功した場合、すべてのデータをあらためてfindしてクライアントに送る
                Color.find({}, (findErr, colorArray) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(colorArray)
                })
            }
        })
    })

    // //DELETEリクエストに対処
    app.delete('/api/colors', (request, response) => {
        const { id } = request.body
        Color.findByIdAndRemove(id, err => {
            if (err) response.status(500).send()
            else {
                Color.find({}, (findErr, colorArray) => {
                    if (findErr) response.status(500).send()
                    else response.status(200).send(colorArray)
                })
            }
        })
    })

    // MongoDBに接続してからサーバーを立てるために
    // app.listen()をmongoose.connect()の中に移動
    app.listen(port, err => {
        if (err) throw new Error(err)
        else console.log(`listening on port ${port}`)
    })
})
