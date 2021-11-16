import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "volume",
  aliases: ["vol"],
  category: "Música",
  usage: "volume/vol",
  description: "Cambia el volumen 😐",

  run: async (client, message, args) => {
    let guildQueue = await client.player.getQueue(message.guild?.id as string);

    if (!guildQueue) {
      return message.channel.send("No hay canciones reproduciéndose");
    }

    const nya = args[0] as string;
    let parsedNya = parseInt(nya);

    if (isNaN(parsedNya)) {
      return message.reply("Me pasó mañana.");
    }

    if (!message.member?.voice.channel)
      return message.channel.send("Debes estar en un canal de voz...");

    if (
      message.guild?.me?.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente..."
      );

    try {
      guildQueue.setVolume(parsedNya);
      message.reply("El volumen se ha establecido a " + parsedNya);
    } catch (err) {
      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setColor("WHITE")
        .setTimestamp();

      message.reply("No hay nada reproduciendose.");
    }
  },
};
