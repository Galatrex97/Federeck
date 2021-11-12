import { Queue } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "queueDestroyed",
run: async (client, queue) => {
 //Defines que no se reproduzcan canciones luego
    let { msg } = await queue.data || queue.nowPlaying.data;
 await msg.channel.send(`La lista de reproducción ha sido destruida, me saldré del canal en unos segundos.`);
}
}