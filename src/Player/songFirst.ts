import { Queue, Song } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "songFirst",
run: async(client, queue, song) => {

    let { msg } = queue.nowPlaying.data;
    await msg.channel.send(`Reproduciendo: **${song}**`);
}
}