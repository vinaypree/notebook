const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes.js");

//ROUTE -1
//Get all the notes using : GET "api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error ");
  }
});

//ROUTE -2
//post add new  notes using : POST  "api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "entre valid ").isLength({ min: 5 }),
    body("description", "must be atleast a 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error ");
    }
  }
);

//ROUTE -3
//updating an existing note using  : put  "api/notes/updatenote"
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "entre valid ").isLength({ min: 5 }),
    body("description", "must be atleast a 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //FInd the note to be updated
    let note = await Notes.findById(req.params.id); //id which is in the endpoint
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("NOt Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  }
);

//ROUTE -4
//deleting an existing note using  : delete  "api/notes/updatenote"
router.delete(
  "/deletenote/:id",
  fetchuser,
  [
    body("title", "entre valid ").isLength({ min: 5 }),
    body("description", "must be atleast a 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
  

    try {
      //FInd the note to be updated
      let note = await Notes.findById(req.params.id); //id which is in the endpoint
      if (!note) {
        return res.status(404).send("not found");
      }

      //allow deletion only if userr own this note
      if (note.user.toString() != req.user.id) {
        return res.status(401).send("NOt Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ success: "note has been deleted", note: note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error ");
    }
  }
);

module.exports = router;
