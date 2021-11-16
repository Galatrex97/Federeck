import { Queue } from "distube";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
  name: "clientDisconnect",
  run: async (client, queue) => {
    //Defines que no se reproduzcan canciones luego

    try {
      let { msg } = queue.nowPlaying.data || queue.data;
      await msg.channel.send(
        `Me han kickeado del canal de voz, la lista de reproducción ha sido destruida.`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
