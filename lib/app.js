import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import SetUpRoutes from './routes/index'

const app = express()

app.use(bodyParser.json())
app.use(cors())

SetUpRoutes(app)

export default app