import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({

  title: {
    type: String,
    required: [true, "title is required."],
  },
  body: {
    type: String,
    required: [true, "body is required."],
  },
});
const Note = models.Note || model("Note", NoteSchema);
/*models.Note: This checks if the "Note" model has already been defined in Mongoose's internal collection of models. If it has, it will be used. If not a new Mongoose model will be defined and registered with the name "Note" and the given schema (NoteSchema).*/

export default Note;
