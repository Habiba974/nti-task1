const appDel=require("../helper/json")
const file="model/userData.json";
const taskModel=require("../../model/myModels/task.model")
class User{

    static addTask=(req,res)=>{
    res.render("addTask",{
        pageTitle:("Add New Task")
    })
}
static addLogic=async(req,res)=>{
  try{const data= new taskModel(req.body)
    await data.save()
    res.redirect("/")}
  catch(err){res.send(err.message);}

}

static main=async(req,res)=>{
  
    try{
      const all=await taskModel.find()
      const data =all.map((task)=>{
        const date = new Date(task?._doc?.dueDate).toDateString()
                return {
                    ...task?._doc,
                    date,
                    active: !task?.status}
      })
       res.render("main",{
        pageTitle:("main"),
        read,
        hasData:read.length
    })
    }catch(err){res.send(err.message)}
   
}

static edit=async(req,res)=>{
   try {
            const task = await taskModel.findById(req.params.id)
            res.render("edit", {
                pageTitle: "Edit Data",
                task
            })
        }
        catch (err) {
            res.send(err.message)
        }
}

static editLogic=async(req,res)=>{
    try {
            
            await taskModel.findByIdAndUpdate(req.params.id, req.query, { runValidators: true })
            res.redirect("/")
        }
        catch (err) {
            res.send(err.message)
        }
}
//ask about it
static search = async(req, res) => {
     try {
            const searchTask = req.query.search
            const all = await taskModel.find({ $or: [{ "title": { $regex: searchTask, $options: "i" } }, { "content": { $regex: searchTask, $options: "i" } }] })


            res.render("search", {
                pageTitle: "Find Tasks",
                all,
                hasData: all.length

            })

        }
        catch (err) {
            res.send(err.message)
        }
    
          
        }
    

     

static single=async(req,res)=>{
   try {
            const task = await taskModel.findById(req.params.id)
            res.render("single", {
                pageTitle: "show task",
                task
            })
        }
        catch (err) {
            res.send(err.message)
        }
}

static delAll=async(req,res)=>{
   try {
            await taskModel.deleteMany()
            res.redirect("/")
        }
        catch (err) {
            res.send(err)
        }
    }
    


static status=async(req,res)=>{
  try {
           await taskModel.updateOne(
                { _id: req.params.id },
                { $set: { status: "true" } }
            );
            res.redirect("/")
        }
        catch (err) {
            res.send(err.message)
        }

}
static del = async(req, res) => {
 try {
            await taskModel.findByIdAndRemove(req.params.id)
      
            res.redirect("/")
        }
        catch (err) {
            res.send(err.message)
        }
    }



}
module.exports=User





