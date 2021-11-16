import {
  BaseGuildTextChannel,
  GuildTextBasedChannel,
  GuildTextChannelResolvable,
  Message,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "remove",
  category: "Soporte",
  description: "Remueve/elimina/quita un usuario de un ticket.",
  aliases: [],
  usage: "remove <@usuario> (con el arroba)",
  run: async (client: Klar, message: Message, args, p) => {
    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    if ((message.channel as TextChannel).name.includes("ticket-")) {
      const member =
        message.mentions.members?.first() ||
        message.guild?.members.cache.get(`${args[0]}`) ||
        message.guild?.members.cache.find(
          (x) =>
            x.user.username === args.slice(0).join(" ") ||
            x.user.username === args[0]
        );
      if (!member) {
        return message.channel.send(
          `Uso incorrecto! Uso correcto: \`${p}remove @usuario\` (tiene que ser con el arroba)`
        );
      }
      try {
        (message.channel as TextChannel).permissionOverwrites
          .edit(member.user, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ATTACH_FILES: false,
            READ_MESSAGE_HISTORY: false,
          })
          .then(() => {
            message.channel.send(
              `${member} Ha sido removido de ${message.channel} corectamente.`
            );
          });
      } catch (e) {
        let errmsg = new MessageEmbed()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${e}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setColor("WHITE")
          .setFooter("Tipico")
          .setTimestamp();

        return message.channel.send("Un error ha ocurrido, vuelve a intentar.");
      }
    }
  },
};
