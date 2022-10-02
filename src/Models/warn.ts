import mongoose, { Schema, model } from "mongoose";

let nya: Schema = new Schema({
  guildId: String,
  userId: String,
  content: Array,
});

export default model("Warn", nya);
