import { Schema, model, models } from "mongoose";

const notesSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    user: {type: Schema.Types.ObjectId, ref:"User"},
})

const Note = models.note || model("Note", notesSchema);

export default Note;