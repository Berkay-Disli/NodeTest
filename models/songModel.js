const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    duration: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Song", songSchema)