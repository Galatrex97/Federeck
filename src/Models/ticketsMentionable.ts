import { Schema, model } from "mongoose";

const ticketMentions: Schema = new Schema({
    guildId: String,
    mentions: Array
});

export default model("ticketsMents", ticketMentions);