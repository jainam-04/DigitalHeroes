const express = require('express')
const cors = require('cors')
const connectdb = require('./config/db')
require('dotenv').config()

const app = express()

connectdb()

const allowedOrigins = [
      "https://digital-heroes-five-weld.vercel.app",
      "http://localhost:5173"
];

app.use(cors({
      origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                  callback(null, true);
            } else {
                  callback(new Error("Not allowed by CORS"));
            }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
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