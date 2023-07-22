const asyncHandler = require("express-async-handler")
const Song = require("../models/songModel")

const getSongs = asyncHandler(async (req, res) => {
    const songs = await Song.find()

    res.status(200).json(songs)
})

const postSong = asyncHandler(async (req, res) => {
    const { title, author, duration } = req.body

    if (!title || !author) {
        res.status(400)
        throw new Error("Title and author fields are mandatory.")
    }

    const newSong = await Song.create({
        title,
        author,
        duration
    })

    res.status(200).json({
        message: "Song created!",
        song: newSong
    })
})

const getSongById = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `SONG BY ID: ${req.params.id}`
    })
})


module.exports = { getSongs, postSong, getSongById }