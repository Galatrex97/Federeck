import mongoose, { model, Schema } from "mongoose";
let addb: Schema = new mongoose.Schema({
  Guild: { type: String },
  Channel: { type: String },
});

export default model("beinvenidas", addb);
