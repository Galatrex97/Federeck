import mongoose, { model, Schema } from "mongoose";

const gg: Schema = new Schema({
  switch: {
    type: Boolean,
    required: false,
    default: false,
  },
  guild: {
    type: String,
  },
});

export default model("antilinkzzz", gg);
