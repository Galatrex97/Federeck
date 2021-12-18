import Discord, { Client, MessageEmbed, Guild, Message } from "discord.js";
import db from "../../models/warn";
import mongoose from "mongoose";
import Klar from "../../client";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "warn",
  aliases: [],
  usage: "warn <@usuario>",
  category: "Mod",
  description: "...",

  run: (client: Klar, message: Message, args: String[]) => {
    let possibleId: any = args[0] as string;

    if (!message.member?.permissions.has("ADMINISTRATOR"))
      return message.reply(`No tienes el permiso **Administrador**`);
    const user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(possibleId);
    if (!user) return message.reply(`Debes mencionar a alguien`);
    if (user.id === client.user?.id)
      return message.reply("No puedes warnearme a mi.");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    const reason = args.slice(1).join(" ")
      ? args.slice(1).join(" ")
      : "No se dió un motivo";
    db.findOne(
      { guildid: message.guild?.id, user: user.id },
      async (err, data) => {
        if (err) {
          let errmsg = new (require("discord.js").MessageEmbed)()
            .setTitle("Ha ocurrido un error")
            .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
            .setThumbnail(
              `https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`
            )
            .setFooter("Tipico")
            .setTimestamp()
            .setColor("WHITE");

          console.log(err);
        }
        if (!data) {
          data = new db({
            guildid: message.guild?.id,
            user: user.user.id,
            content: [
              {
                moderator: message.author.id,
                reason: reason,
              },
            ],
          });
        } else {
          const obj = {
            moderator: message.author.id,
            reason: reason,
          };
          data.content.push(obj);
        }
        data.save();
      }
    );

    const server: any = message.guild as Guild;

    const nya = new MessageEmbed()
      .setTitle(`${server.name}`)
      .setDescription(
        `${user} fue warneado por __${reason}__\nModerador: ${message.author}`
      )
      .setThumbnail(server.iconURL())
      .setColor("WHITE")
      .setFooter("Bien.")
      .setTimestamp();

    const xD = new MessageEmbed()
      .setTitle("Warn")
      .setDescription(
        `Te han warneado en ${message.guild?.name} por ${reason}\nModerador: ${message.author}`
      )
      .setColor("WHITE")
      .setThumbnail(server.iconURL())
      .setFooter("...")
      .setTimestamp();

    message.channel.send({ embeds: [nya] });
    try {
      user.send({ embeds: [xD] });
    } catch (err) {
      console.log(err);
    }
  },
};
