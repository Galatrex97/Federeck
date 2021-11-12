import { Queue } from "distube"
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "queueEnd",
run: async(client, queue) => {


    let { msg } = await queue.data || queue.nowPlaying.data;
    await msg.channel.send(`Se han acabado las canciones para reproducir, me saldré del canal de voz en unos segundos.`);

}
}