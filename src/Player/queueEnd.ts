import { Queue } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
  name: "queueEnd",
  run: async (client, queue) => {
    try {
      let { msg } = queue.nowPlaying.data;
      await msg.channel.send(
        `Se han acabado las canciones para reproducir, me saldré del canal de voz en unos segundos.`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
