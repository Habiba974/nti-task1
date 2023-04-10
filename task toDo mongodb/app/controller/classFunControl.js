const appDel=require("../helper/json")
const file="model/userData.json";
const modb=require("../../model/mongo")
const ObjectId = require("mongodb").ObjectId
class User{

    static addTask=(req,res)=>{
    res.render("addTask",{
        pageTitle:("Add New Task")
    })
}
static addLogic=async(req,res)=>{
   
  try{modb(async(db)=>{
    await db.collection("users").insertOne(req.query)
    res.redirect("/")
  })}catch(err){res.send(e)}

}




static main=async(req,res)=>{
    try{modb(async(db)=>
        {const read=await db.collection("users").find().toArray()
 res.render("main",{
        pageTitle:("main"),
        read,
        hasData:read.length
    })
})}
   catch(err){res.send(err)}
   
}

static edit=async(req,res)=>{
    try{modb(async(db)=>{
const task=await db.collection("users").findOne({
    _id:new ObjectId(req.params.id)
    
}) 
res.render("edit",{
        pageTitle:("Edit Task"),
task})
    })}
   catch(err){res.send(err)}
    
}

static editLogic= async(req,res)=>{
    try{
        modb(async(db)=>
        await db .collection("users").updateOne({_id:new ObjectId(req.params.id)},  { $set: { ...req.query } }
))
    res.redirect(`/single/${_id}`)
    }
    catch(err){
        res.send(err)
    }
        
}
//ask about it
static search = (req, res) => {
        let search = req.query.search;
    let results = [];
    const read = appDel.readJsonData(file);
    for (let i = 0; i < read.length; i++) {
    const object = read[i];
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key].toString().includes(search)) {
        results.push(object);
        appDel.writeJsonData(file,read)
      }
    }
  }

    res.render("search", {
        results,
        hasData: results.length
    });
    
          
        }
    

    
//main 
static single=async(req,res)=>{
    try{
            modb(async(db)=>{
                const task = await db.collection("users").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("single", {
                    pageTitle:"Show task",
                    task
                })
                
            })
        }
        catch(e){
            res.send(e)
        }
    
}

static delAll=async(req,res)=>{
    
       try{
            modb( async(db) => await db.collection("users").remove() )
            res.redirect("/")
        }
        catch(err){
            res.send(err)
        }
    
}

static status=(req,res)=>{
   const read = appDel.readJsonData(file);
  const id = req.params.id;
  let status="false"
  const index = read.findIndex(u => u.id == id);
  if (read[index].status == status) {
    read[index].status = "true";
    //document.getElementById("inact").style.display = 'none';
  } else {
    read[index].status = "false";
  }
  appDel.writeJsonData(file, read);
  res.redirect("/");

}
static del = async(req, res) => {
   try{
            modb( async(db) => 
                await db.collection("users")
                .deleteOne({_id: new ObjectId(req.params.id)}) 
                )
            res.redirect("/")
        }
        catch(err){
            res.send(err)
        }
    }



}
module.exports=User





