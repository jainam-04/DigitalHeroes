const express = require('express')
const cors = require('cors')
const connectdb = require('./config/db')
require('dotenv').config()

const app = express()

connectdb()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
      console.log("Backend is running successfully")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
})