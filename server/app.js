import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { config } from './config/config.js'

const app = express()

app.use(
  session({
    secret: 'wow-backend-secret',
    resave: false,
    saveUninitialized: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port}`)
})
