const appDel=require("../helper/json")
const file="model/userData.json";

class User{

    static addTask=(req,res)=>{
    res.render("addTask",{
        pageTitle:("Add New Task")
    })
}
static addLogic=(req,res)=>{
   const read=appDel.readJsonData(file)//[]
  
const newUser = {id: Date.now(), ...req.query}
read.push(newUser)
appDel.writeJsonData(file,read)
res.redirect("/")
}

static main=(req,res)=>{
    const read=appDel.readJsonData(file)
    res.render("main",{
        pageTitle:("main"),
        read,
        hasData:read.length
    })
}

static edit=(req,res)=>{
    const id = req.params.id
        const read=appDel.readJsonData(file)
        const task = read.find(i=> i.id == id)
    res.render("edit",{
        pageTitle:("Edit Task"),
task
    })
}

static editLogic=(req,res)=>{
     const id = req.params.id
        const read=appDel.readJsonData(file)
        const index = read.findIndex(i=> i.id == id)
        read[index] = {id, ...req.query}
        appDel.writeJsonData(file, read)
        res.redirect(`/single/${id}`)
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
    

    

static single=(req,res)=>{
    const id = req.params.id
const read=appDel.readJsonData(file)    
        let task = read.find(u=> u.id == id)

    res.render("single",{
        pageTitle:("Show task"),
        task
    })
}

static delAll=(req,res)=>{
    
        appDel.writeJsonData(file,[])
            res.redirect("/")
        
    
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
static del = (req, res) => {
  let read = appDel.readJsonData(file)
        const id = req.params.id
        const index = read.findIndex(i => i.id == id)
        read.splice(index, 1)
  appDel.writeJsonData(file, read);
        res.redirect("/")
    }



}
module.exports=User





