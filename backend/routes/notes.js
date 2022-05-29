const express = require('express');
const Note = require('../models/Notes');

const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: POST "/api/auth/createuser". Gets all the notes of a user. Login required
router.get('/fetchallnotes', fetchuser, async(req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error message")
    }
})



// ROUTE 2: POST "/api/auth/addnote". Adds a note to the user who is loggen in . Login required
router.post('/addnote', fetchuser, [
    body('title', 'title cannot be empty').isLength({ min: 1 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("inside error")
            return res.status(400).send({ errors: errors.array() });
        }
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()

        res.status(200).send(savedNote)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error message")

    }
})


// ROUTE 3: PUT "/api/auth/updatenote/:id". Update a note of logged in user. Login required
router.put('/updatenote/:id', fetchuser, async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("This note doesn't exist") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised request");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error message")
    }
})



// ROUTE 4: DELETE "/api/auth/deletenote/:id". Delete a note of logged in user. Login required
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {
        var success = false;
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).json({ success: success, error: "This note doesn't exist" }) }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: success, error: "Unauthorised request" });
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, msg: "Note has been deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: success, error: "Internal server error" })
    }
})

//getnote by id
router.get('/getnote/:id', fetchuser, async(req, res) => {
    try {
        var success = false;
        // Find the note and return
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).json({ success: success, error: "This note doesn't exist" }) }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: success, error: "Unauthorised request" });
        }
        res.json({ note: note });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: success, error: "Internal server error" })
    }
})



module.exports = router