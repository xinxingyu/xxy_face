import Koa from 'koa'
import http from 'http'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors' // 跨域
import bodyParser from 'koa-bodyparser' // 请求体JSON解析
import onerror from 'koa-onerror' // 错误处理
import resource from 'koa-static' // 静态资源托管
import path from 'path'

import routers from '../routers'
import config from '../config'

const app = new Koa()

onerror(app)

// 跨域设置
app.use(convert(cors()))

app.use(convert(logger()))

app.use(bodyParser())

app.use(resource(path.join(__dirname, '../../dist'), {}))
app.use(resource(path.join(__dirname, '../../static'), {}))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(routers.routes(), routers.allowedMethods())

app.on('error', (error, ctx) => {
  console.log('哎呦，出错了...' + JSON.stringify(ctx.onerror))
  console.log('server error:' + error)
})

http
  .createServer(app.callback())
  .listen(config.port)
  .on('listening', function () {
    console.log('xxy_face_server 正在监听端口' + config.port)
  })

export default app