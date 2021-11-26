import mongoose, { Schema, model } from "mongoose";

let la_grasa: Schema = new Schema({
  sdlg: {
    type: Boolean,
    required: false,
  },
  guildId: {
    type: String,
    required: true,
  },
});

export default model("grasaxdxd", la_grasa);
