import { Playlist, Queue } from "distube"
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "playlistAdd",
     run: async (client, queue, playlist) => {
         
    let { msg } = queue.nowPlaying.data;
    await msg.channel.send(`Se ha añadido una playlist para reproducir. **${playlist}** con **${playlist.songs.length}** canciones`);
} 
}