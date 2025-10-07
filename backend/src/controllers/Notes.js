import Note from '../models/Note.js'

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find().sort({createdAt: -1}); // add filter inside {} / sort -1 will sort in desc order newest first
        res.status(200).json(notes);
    } catch(err) {
        res.status(500).json({message: `Get Notes Error : ${err}`})
    }
};

export const getNoteById = async (req, res) => {
    const noteId = req.params.id;
    if(noteId.length !== 24) return res.status(404).json({message: "Invalid Id !"});
    try {
        const noteById = await Note.findById(noteId);
        if(!noteById) return res.status(404).json({message: `Note Id : ${noteId} not found .`});

        res.status(200).json({message: `Note id : ${noteId}`, note: noteById});

    } catch(err) {
        res.status(500).json({message: `Error Finding Note : ${err}`})
    }
}

export const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;
        const note = new Note({title: title, content: content});

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    }
    catch(err) {
        res.status(500).json({message: `CreateNote Error : ${err}`})
    }
};

export const updateNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        if(noteId.length !== 24) return res.status(404).json({message: "Invalid Id !"});

        const {title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(noteId, {title: title,content: content}, {new: true, runValidators: true});

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: 'Note was updated succuessfully !', note: updatedNote});

    } catch(err) {
        res.status(500).json({message: `Update Note Error : ${err}`})
    }
};

export const deleteNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        if(noteId.length !== 24) return res.status(404).json({message: "Invalid Id !"});

        const deleteStatus = await Note.findByIdAndDelete(noteId);
        if(!deleteStatus) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: "Note deleted Succuessfully !"})
    } catch(err) {
        res.status(500).json({message: `Delete Note Error : ${err}`})
    }
};