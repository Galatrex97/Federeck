import Discord from "discord.js";
const gg = process.env.botOwner;
const nya = process.env.nya;
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "servers",
  aliases: ["sv"],
  usage: "servers/sv",
  category: "Info",
  description: "...",
  run: async (client, message, args) => {
    if (![gg, nya].includes(message.author.id)) {
      return message.reply(
        "No puedes usar este comando, no te diré porque pero no tiene nada que ver con permisos o roles."
      );
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(
        `Estoy en ${
          client.guilds.cache.size
        } servers con ${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        )} usuarios`
      )
      .setDescription(
        `${client.guilds.cache
          .filter((r) => r.memberCount >= 50)
          .map((x) => x)
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(
            (r, i) =>
              `**${i + 1}** | ${r.name}, con **${r.memberCount} usuarios**.`
          )
          .join(
            "\n"
          )}\n\n***Debido a muchos servidores hemos decidido mostrar solo los destacados.***`
      )
      .setColor("WHITE")
      .setThumbnail(`${client.user?.avatarURL()}`)
      .setFooter(`Servidores de ${client.user?.username}`)
      .setTimestamp();
    try {
      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);

      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setColor("WHITE")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setTimestamp();
    }
  },
};
