import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { resolve } from 'path'
import { Server } from 'socket.io'

import { routes } from './routes'

import './database'

const app = express()

const pathViews = resolve(__dirname, '..', 'public')

app.use(express.static(pathViews))
app.set('views', pathViews)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
})

const http = createServer(app)
const io = new Server(http)

io.on('connection', socket => {
  console.log('connect', socket.id)
})

app.use(express.json())
app.use(cors())

app.use(routes)

export { http, io }
