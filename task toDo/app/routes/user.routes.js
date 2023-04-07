const { __express } = require("hbs")
const classFun=require("../controller/classFunControl")
const router = require("express").Router()

router.get("/", classFun.main)
router.get("/addTask",classFun.addTask)
router.get("/addLogic",classFun.addLogic)
router.get("/edit/:id",classFun.edit)
router.get("/editLogic/:id",classFun.editLogic)
router.get("/search",classFun.search)
router.get("/del/:id",classFun.del)
router.get("/status/:id",classFun.status)
router.get("/delAll",classFun.delAll)
router.get("/single/:id",classFun.single)

module.exports=router