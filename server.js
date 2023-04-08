const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const dbconnect = require('./database/dbconnection')
dbconnect()

const PORT = 5500

app.use(express.json()) // body parser
app.use(helmet())
app.use(morgan('common'))
app.use("/api/auth", require('./routes/authRoute'))
app.use("/api/users", require('./routes/userRoutes'))
app.use("/api/posts", require('./routes/postRoute'))
app.use('/api/comments', require('./routes/commentRoute'))


app.listen(PORT, () => {
       console.log(`Port started on port, ${PORT}`) 
})