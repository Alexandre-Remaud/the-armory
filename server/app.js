import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { config } from './config/config.js'
import realmRoutes from './routes/realmRoutes.js'

const app = express()

if (!config.sessionSecret) {
  throw new Error('SESSION_SECRET must be defined in environment variables')
}

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())
app.use('/api', realmRoutes)

app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`)
})
