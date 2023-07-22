const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


const getContacts = asyncHandler( async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

const postContact = asyncHandler( async (req, res) => {
    const { name, phone } = req.body
    if (!name || !phone) {
        res.status(400)
        throw new Error("Name and phone are needed!")
    }
    const newContact = await Contact.create({
        name,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(newContact)
})

const getContactById = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found.")
    }
    res.status(200).json(contact)
})

const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        )

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found.")
    }
    res.status(200).json(contact)
})

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found.")
    }

    contact.deleteOne()

    res.status(200).json({
        message: "Contact deleted!"
    })
})


module.exports = { getContacts, postContact, getContactById, updateContact, deleteContact }