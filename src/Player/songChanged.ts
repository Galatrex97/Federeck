import { Queue, Song } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "songChanged",
run: async(client, queue, newSong, OldSong) => {
let { msg } = queue.nowPlaying.data;
await msg.channel.send(`Ahora reproduciendo: **${newSong}**`);

}
}