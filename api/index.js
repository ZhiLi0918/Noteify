require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
const cors = require('cors')

app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB Connection Successful!")).catch((err) => { console.log(err) })
app.use(cors())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/checkout", stripeRoute)

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})



