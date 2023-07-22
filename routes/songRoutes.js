const express = require("express")
const router = express.Router()
const { getSongs, postSong, getSongById } = require("../controllers/songController")

router.get("/", getSongs)
router.post("/", postSong)
router.get("/:id", getSongById)



module.exports = router