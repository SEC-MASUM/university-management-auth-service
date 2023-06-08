import express, { Application, Request, Response } from 'express'
import userRouter from './app/modules/user/user.route'
import cors from 'cors'
const app: Application = express()

app.use(cors())

//parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/user/', userRouter)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

export default app
