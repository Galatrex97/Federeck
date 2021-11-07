import mongoose, { Schema, model } from 'mongoose';
const AFKSchema: Schema = new mongoose.Schema({
userId: {
  type: String,
  required: true,
},
guildId: {
  type: String,
  required: true,
},
AFK: {
  type: Boolean,
  default: false,
},
AFK_Reason: {
  type: String,
  default: null,
},
timeAgo: {
	type: Date,
	required: false,
}

})

export default model('afk', AFKSchema)