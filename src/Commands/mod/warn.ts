import Discord, { Client, MessageEmbed, Guild, Message } from "discord.js";
import db from "../../Models/warn";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class WarnCommand extends BaseCommand {
  constructor() {
    super({
      name: "warn",
      aliases: [],
      description: "Advierte a un usuario.",
      usage: "warn <@user> [advertencia]",
      category: "Mod",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: ["ADMINISTRATOR"],
      devOnly: true,
      guildOnly: true,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    let possibleId: any = args[0] as string;

    const user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(possibleId);
    if (!user) return message.reply(`Debes mencionar a alguien.`);
    if (user.id === client.user?.id)
      return message.reply("No puedes warnearme a mí.");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    const reason = args.slice(1).join(" ")
      ? args.slice(1).join(" ")
      : "No se dio un motivo.";
    db.findOne(
      { guildid: message.guild?.id, user: user.id },
      async (err, data) => {
        if (err) {
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
  };
}
