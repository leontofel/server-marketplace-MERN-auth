import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://leontofel:<password>.ln68h.mongodb.net/?retryWrites=true&w=majority`);

let db = mongoose.connection;

export default db;
