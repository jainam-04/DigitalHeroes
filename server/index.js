const express = require('express')
const cors = require('cors')
const connectdb = require('./config/db')
require('dotenv').config()

const app = express()

connectdb()

app.use(cors({
      origin: [
            "https://digital-heroes-five-weld.vercel.app/",
            "https://digitalheroes-p7bd.onrender.com"
      ],
      credentials: true
}));
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes.js'))
app.use("/api/scores", require("./routes/scoreRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/charities", require("./routes/charityRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get('/', (req, res) => {
      console.log("Backend is running successfully")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
})