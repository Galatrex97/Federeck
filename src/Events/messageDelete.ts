import Klar from "../Client";
import { Event } from "../Interfaces";

export const event: Event = {
name: "messageDelete",
run: async (client, message) => {

let snipes = client.snipes.get(message.channel.id) || [];
if(snipes.length > 9) snipes = snipes.slice(0, 8)


snipes.unshift({
  msg: message,
  image: message.attachments.first()?.proxyURL || null,
  timeAgo: Date.now(),
})



client.snipes.set(message.channel.id, snipes);
  
}
}