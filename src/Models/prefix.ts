import mongoose, { Schema, model } from "mongoose";

let prxSchema: Schema = new Schema({
  Guild: String,
  Prefix: String,
});

export default model("prefix", prxSchema);
