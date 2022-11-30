import express from 'express'
import authRouter from './auth/authRouter/authRouter'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/application/', authRouter)

module.exports = app