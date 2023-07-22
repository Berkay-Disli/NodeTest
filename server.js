const express = require("express")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const contactRouter = require("./routes/contactRoutes")
const songRouter = require("./routes/songRoutes")
const userRouter = require("./routes/userRoutes")
const errorHandler = require("./middlewares/errorHandler")

connectDb()
const app = express()

const port = process.env.PORT || 4002

app.use(express.json())
app.use("/api/contacts", contactRouter)
app.use("/api/songs", songRouter)
app.use("/api/users", userRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`SERVER PORT: ${port}`)
})