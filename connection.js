const mongoose = require("mongoose")





const url = 'mongodb+srv://sambitghosh56:8y5chVL19qUP1zGE@cluster0.grctx3a.mongodb.net/newUser?retryWrites=true&w=majority&appName=Cluster0'

const connection = async () =>{
    return mongoose.connect(url)
}

module.exports = connection;