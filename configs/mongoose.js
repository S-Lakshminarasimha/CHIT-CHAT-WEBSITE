const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://Lakshminarasimha:260q07kemOX4IhSI@cluster0.vl6ivz4.mongodb.net/CHIT-CHAT?retryWrites=true&w=majority')

const db = mongoose.connection

db.on('error',console.error.bind(console,"error connecting to db"))

db.once('open',function(err){
    if(err){
        return console.log("error opening data base",err)
    }
    return console.log("Succesfully connected to db")
})