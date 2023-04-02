
const yargs=require("yargs")

const user=require("./modules/user")

yargs.command({
    command:"adduser",
    builder:{
        name:{demandOption:true},
        age:{demandOption:true},
        email:{demandOption:true}
    },

    handler:(argv)=> user.addNewUser(argv)  
    
})

yargs.command({
    command:"showAll",
    handler: ()=> user.showAll()
})

yargs.command({
    command:"showSingle",
    builder:{ id:{demandOption:true}},
    handler: (argv)=> user.showSingle(argv)
})

yargs.command({
command:"deleteOneElement",
builder:{id:{demandOption:true}},
handler:(argv)=> user.deleteOneElemet(argv)

})

yargs.command({
  command: "deleteAll",
 
  handler:()=> user.deleteAllObjects(),
});



yargs.command({
command:"editObj",
 builder:{
     id:{demandOption:true},
        name:{demandOption:false},
        age:{demandOption:false},
        email:{demandOption:false}
    },

    handler:(argv)=> user.addNewUser(argv) 
})

yargs.argv