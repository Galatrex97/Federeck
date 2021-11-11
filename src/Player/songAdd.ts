import { Queue, Song } from "distube"
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "songAdd",
run: async (client, queue, song) => {
    let { msg } = await queue.nowPlaying.data;
    await msg.channel.send(`Se añadió **${song}** a la lista de reproducción.`);
}
}