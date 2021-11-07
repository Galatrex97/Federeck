import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import distube from "distube";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "repeat",
  aliases: [],
  category: 'Música',
  usage: 'repeat 0/1/2',
  description: 'Cambia al modo repetición. El modo 1 repite la canción actual, el 2 la lista de reproducción entera y el 0 apaga este modo.',

run: async(client, message, args) => {

let guildQueue = await client.distube.getQueue(message);

if(!guildQueue) {
  return message.channel.send("No hay canciones reproduciéndose")
}

let parsedString: number = parseInt(args[0] as string)

let mode: any = client.distube.setRepeatMode(message, parsedString);
        mode = mode ? mode == 2 ? "Repetir playlist" : "Repetir canción" : "Apagado";
        message.channel.send("El modo de repetición actual es: `" + mode + "`");
 
 }

}