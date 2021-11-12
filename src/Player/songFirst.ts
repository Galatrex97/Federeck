import { Queue, Song } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "songFirst",
run: async(client, queue, song) => {

    let { msg } = await queue.data || queue.nowPlaying.data;
    await msg.channel.send(`Reproduciendo: **${song}**`);
}
}