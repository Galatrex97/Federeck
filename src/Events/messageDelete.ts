import Klar from "../Client";
import { Event } from "../Interfaces";

export const event: Event = {
name: "messageDelete",
run: async (client, message) => {

client.snipes.set(message.channel.id, {
      content: message.content,
      delete: message.author,
      canal: message.channel
    });
  
}
}