require("../model/dbconect")
const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()



const layOutStatic= path.join(__dirname,"../resourcess/layout")
const viewStatic= path.join(__dirname,"../resourcess/views")

app.set("view engine","hbs")//make hbs work
app.set("views",viewStatic)

hbs.registerPartials(layOutStatic)//things that repet







const taskRout=require("./routes/user.routes")
app.use(taskRout)

app.all("*",(req,res)=>{
    res.render("error",{
        pageTitle:("Error 404")
    })
})





module.exports = app