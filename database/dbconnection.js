const mongoose = require('mongoose')

const dbconnect = async() => {
       try{
            const connect = await mongoose.connect(process.env.DATATBASE_CONNECTION_KEY)
            console.log('database connection', connect.connection.host , connect.connection.name)
       } catch(error) {
            console.log(error)
            process.exit(1)
       }
}


module.exports = dbconnect