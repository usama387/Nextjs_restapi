import { Schema, model, models } from "mongoose";

const NotesSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    user: {type: Schema.Types.ObjectId, ref:"User"},
})

const Note = models.Note || model("Note", NotesSchema);

export default Note;