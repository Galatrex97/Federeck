import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "repeat",
  aliases: [],
  category: "Música",
  usage: "repeat 0/1/2",
  description:
    "Cambia al modo repetición. El modo 1 repite la canción actual, el 2 la lista de reproducción entera y el 0 apaga este modo.",

  run: async (client, message, args) => {
    let guildQueue = await client.player.getQueue(message.guild?.id as string);

    if (!guildQueue) {
      return message.channel.send("No hay canciones reproduciéndose");
    }

    let parsedString: number = parseInt(args[0] as string);

    if (parsedString > 2)
      return message.reply("Solo se admiten números del 0 al 2");
    if (parsedString < 0)
      return message.reply("Solo se admiten números del 0 al 2");

    let mode: any = guildQueue.setRepeatMode(parsedString);
    mode = mode
      ? mode == 2
        ? "Repetir playlist"
        : "Repetir canción"
      : "Apagado";
    message.channel.send("El modo de repetición actual es: `" + mode + "`");
  },
};
