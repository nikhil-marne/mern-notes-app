import mongoose from "mongoose";

// Step 1. Create schema
// Step 2. Create model based of that schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }) // by Default : CreatedAt, UpdatedAt

// Creating model based on Schema

const Note = mongoose.model("Note", noteSchema);

export default Note;