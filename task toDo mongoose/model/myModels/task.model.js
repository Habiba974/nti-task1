const mongoose=require('mongoose')

const taskModel=mongoose.model("taskModel",{
   title:{
        type:String,
        required: true,
        trim:true,
        minLength:5,
        maxLength:35,
        unique:true
    },
    content:{
        type:String,
        required: true,
        trim:true,
        minLength:10,
        maxLength:100,
        unique:true
    },
    status:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    }
})
module.exports=taskModel