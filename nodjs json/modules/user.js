const { argv } = require('yargs')
const myClass= require('./dealWithJson')
const userInfo=["id", "name", "age", "email"]

const userObj=(data) =>{

const user={}

    userInfo.forEach(e =>{

if(e=="id"){ user[e]=Date.now() }
else{ user[e]= data[e] }

    })
    return user
}

class UserClass{
static addNewUser=(argv) =>{
    const user= userObj(argv)
     const data=myClass.readJsonData("data.json")
       
data.push(user)
        myClass.writeJsonData("data.json", data)
}

  static showAll = ()=>{
        const allUsers = myClass.readJsonData("data.json")
        if(!allUsers.length) {
            console.log("No users yet")
            return
        }
        allUsers.forEach((u, ind)=>{
            console.log(`${ind+1} - ${u.name} - ${u.id} - ${u.email}`)
        })
    }

static showSingle = (argv)=>{
        const allUsers = myClass.readJsonData("data.json")
        const singleUser = allUsers.find(u=> u.id == argv.id)
        if(!singleUser) console.log("no user with this id")
        else console.log(singleUser)
    }

static deleteOneElemet=(argv)=>{
const allUsers = myClass.readJsonData("data.json")

       const index = allUsers.findIndex(elem => elem.id == argv.id);
  if (index === -1) {
    console.log("No element with this ID was found.");
    }
  const deletedElem = allUsers.splice(index, 1);
  myClass.writeJsonData("data.json", allUsers); 
  return deletedElem;
 }


static deleteAllObjects() {
    const data = []; // Create an empty array
    myClass.writeJsonData("data.json", data); // Write the empty array to the file
    console.log("All objects have been deleted.");
  }


static editObj(argv){
const allUsers = myClass.readJsonData("data.json")

       const index = allUsers.findIndex(elem => elem.id == argv.id);
  if (index === -1) {
    console.log("No element with this ID was found.");
    }
for(const key in argv){
    if(userInfo.includes(key)){allUsers[ind][key]=argv[key]}
}
}

}







module.exports= UserClass