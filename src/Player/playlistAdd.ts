import { PlayerEvent } from "../interfaces";

export const dmpEvent: PlayerEvent = {
  name: "playlistAdd",
  run: async (client, queue, playlist) => {
    try {
      let { msg } = (await queue.data) || queue.nowPlaying.data;
      await msg.channel.send(
        `Se ha añadido una playlist para reproducir. **${playlist}** con **${playlist.songs.length}** canciones`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
