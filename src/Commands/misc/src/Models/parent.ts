import mongoose, { Schema, model } from "mongoose";
let parentSchema: Schema = new Schema({
  parentId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  },

})

export default model('Parent', parentSchema)