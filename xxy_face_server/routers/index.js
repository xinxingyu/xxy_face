import Router from 'koa-router'
import fs from 'fs'
import path from 'path'
const router = Router()

// router.get('/', (ctx, next) => {
//   // ctx.router available
//   console.log(111)
// })
router.get('/', async (ctx, next) => {
  // let response = await axios.get(banner)
  let indexHtmlPath = path.resolve(process.cwd(), '../dist/index.html')
  let data = fs.readFileSync(indexHtmlPath, 'utf8')
  ctx.body = data
})

export default router
