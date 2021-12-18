import Discord, { GuildMember, Message, MessageEmbed } from "discord.js";
import Klar from "../../client";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "avatar",
  aliases: ["pfp"],
  category: "Útil",
  description:
    "Muestra el avatar de un usuario (mencionado) o de ti si no mencionas a nadie.",
  usage: "avatar/pfp",

  run: async (client, message, args) => {
    let when = args[0];

    let regg = /^\d{17,18}$/;

    let si = regg.test(when);

    if (args[0] && !message.mentions.members?.first() && !si) {
      return message.channel.send(
        "Esa no es una id válida, da otra, menciona a alguien o usa el comando contigo mismo."
      );
    }

    let member: any;
    if (message.mentions.members?.first()) {
      member = message.mentions.members.first()?.id;
    } else if (args[0] && !!si) {
      member = args[0];
    } else {
      member = message.member?.id;
    }

    try {
      let a = await client.users.fetch(member)
      let pfp = await a.displayAvatarURL({ format: "png", dynamic: true, size: 4096 })
      const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar De: **${a.username}**`)
        .addField("Pedido por:", `${message.member}`)
        .setImage(`${pfp}`)
        .setColor("WHITE")
        .setFooter(":)", client.user?.avatarURL() as string)
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      message.channel.send("Ha ocurrido un error.");
    }
  },
};
