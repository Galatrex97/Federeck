import { Schema, model } from "mongoose";

let benvenuto = new Schema({
    link:{
        type: String,
        required: true
    },
    guildId:{
        type: String,
    }
})

export default model("welcum-links", benvenuto)