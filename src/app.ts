import cors from 'cors'
import express from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  return response.json({
    message: 'Hello NLW'
  })
})

app.post('/', (request, response) => {
  const { name, email } = request.body

  return response.json({ name, email })
})

export { app }
