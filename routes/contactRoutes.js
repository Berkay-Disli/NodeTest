const express = require("express")
const router = express.Router()
const { getContacts, postContact, getContactById, updateContact, deleteContact } = require("../controllers/contactController")
const validateToken = require("../middlewares/validateTokenHandler")

router.use(validateToken)

router.get("/", getContacts)

router.post("/", postContact)

router.get("/:id", getContactById)

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)

module.exports = router