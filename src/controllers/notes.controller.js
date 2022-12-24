//Creamos un objeto para guardar todas las funciones
const notesCtrl = {};
const Note = require('../models/Note');

//funcion para el get(ruta) de /notes/add
notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

//funcion para el post(ruta) de /notes/new-note
notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description}); 
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfaully');
    res.redirect('/notes');
};

//funcion para el get(ruta) de /notes
notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notes/all-notes', {notes});
}; 

//funcion para el get(ruta) de /notes/edit/:id
notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', {note});
};

//funcion para el put(ruta) de /notes/edit/:id
notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

//funcion para el delete(ruta) de /notes/delete/:id
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;