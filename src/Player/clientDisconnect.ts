import { Queue } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "clientDisconnect",
run: async (client, queue) => {
 //Defines que no se reproduzcan canciones luego
 let { msg } = queue.nowPlaying.data;
 await msg.channel.send(`Me han kickeado del canal de voz, la lista de reproducción ha sido destruida.`);
}
}