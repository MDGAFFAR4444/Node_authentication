mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/adit").then(()=>{
    console.log('connected successfully')
}).catch((error)=>{console.log(error)})

Schema = mongoose.Schema({
    uname:String,
    pass: String
})

//model
StudentModel = mongoose.model('Student', Schema);

module.exports = StudentModel
