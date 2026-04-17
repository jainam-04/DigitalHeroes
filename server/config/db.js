const mongoose = require('mongoose')

const connectdb = async () => {
      try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Database connected successfully")
      }
      catch (error) {
            console.log("Connection failed")
            console.log(error.message)
      }
}

module.exports = connectdb