import express from 'express'
import cors from 'cors'
import countryRoutes from './routes/country.routes'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()).use(cors())

app.use('/', countryRoutes)

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`)
})
