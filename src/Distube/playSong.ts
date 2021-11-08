import { Queue, Song } from "distube";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "playSong",
run: async(client, queue, song) => {
 queue.textChannel?.send(`Reproduciendo: **${song.name}** - **${song.formattedDuration}**`)

}
}