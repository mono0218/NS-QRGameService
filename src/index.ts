import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv"

const app = new Hono()
dotenv.config()

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) throw new Error('No SUPABASE env var')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

//UserTable
app.post('/createUser', (c) => {
  return c.newResponse('Hello ' + c.body.name,200)
})

//UserIdからMoneyを取得
app.post('/getUserMoney', (c) => {
  return c.newResponse("hello",200)
})

app.post('/getCode', (c) => {
  return c.newResponse("hello",200)
})

app.post('/getResultCode', (c) => {
  return c.newResponse("hello",200)
})

//Playerのゲーム情報を取得
app.post('/getPlayerInfo', (c) => {
  return c.newResponse("hello",200)
})

//Playerのゲーム情報を更新
app.post('/updatePlayerInfo', (c) => {
  return c.newResponse("hello",200)
})

//新しいゲームサービスを登録する
app.post('/newGameService', (c) => {
  return c.newResponse("hello",200)
})

//ゲームIDからゲームサービスを取得する
app.post('/getGameService', (c) => {
  return c.newResponse("hello",200)
})

const port = 3000
serve({
  fetch: app.fetch,
  port
})
