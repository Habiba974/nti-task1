const { MongoClient}=require("mongodb")
const moDb = (cb) =>{
    MongoClient.connect(process.env.dbURL, async(err, client) => {
        if(err) return console.log("err")
        const db = client.db(process.env.dbName)
        cb(db)
    })
}

module.exports = moDb