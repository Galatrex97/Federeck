import { Playlist, Queue } from "distube"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "addList",
     run: async (client, queue, playlist) => {
        queue.textChannel?.send(`Playlist añadida correctamente: **${playlist.name}** con **${playlist.songs.length}** canciones`)

} 
}