import { Queue, Song } from "distube"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "addSong",
run: async (client, queue, song) => {
 queue.textChannel?.send(`Canción añadida: **${song.name}** - **${song.formattedDuration}**`)

}
}