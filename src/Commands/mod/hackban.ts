import Discord, { Message, MessageEmbed, User } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class HackbanCommand extends BaseCommand {
  constructor() {
    super({
      name: "hackban",
      aliases: [],
      description:
        "Banea a un usuario de manera forzada, incluso si no está en el servidor",
      usage: "hackban <id del usuario> [razón]",
      category: "",
      cooldown: 0,
      botPerms: ["BAN_MEMBERS", "SEND_MESSAGES"],
      userPerms: ["BAN_MEMBERS"],
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
    let guildname: any = message.guild?.name as string;
    let guildIcon: any = message.guild?.iconURL() as string;
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setFooter(guildname, guildIcon);
    if (!args[0]) {
      embed.setDescription("Debes escribir el ID de un usuario.");
      embed.setColor("WHITE");
      return message.reply({ embeds: [embed] }).catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
    }

    let idz = args[0] as string;

    let member =
      message.mentions.members?.first() ||
      message.guild?.members.resolve(idz) ||
      message.guild?.members.cache.find((m) => m.user.id == args[0]);

    if (!member) {
      embed.setDescription("Necesitas escribir el ID de un usuario.");
      embed.setColor("WHITE");
      return message.reply({ embeds: [embed] });
    }
    if (member.id == message.author.id) {
      embed.setDescription("No te puedes hacer hackban a ti mismo.");
    }
    if (!message.guild?.me?.permissions.has("BAN_MEMBERS"))
      return message.reply(
        "No puedo usar este comando por la ausencia del permiso **Banear Miembros**"
      );
    if (!message.member?.permissions.has("BAN_MEMBERS")) {
      embed.setDescription(
        "No puedes usar este comando por la ausencia del permiso **Banear Miembros**."
      );
      embed.setColor("WHITE");
      return message.reply({ embeds: [embed] });
    }

    if (message.guild?.members.resolve(member.id)) {
      if (
        message.member?.roles.highest.comparePositionTo(member.roles.highest) <=
        0
      ) {
        embed.setDescription(
          "No puedes banear a un usuario con un rango igual o mayor que el tuyo."
        );
        embed.setColor("WHITE");
        return message.reply({ embeds: [embed] });
      }
      if (!member.bannable) {
        embed.setDescription("No puedo banear a este usuario");
        embed.setColor("WHITE");
        return message.reply({ embeds: [embed] });
      }
    }

    let razon = args.slice(1).join(" ")
      ? args.slice(1).join(" ")
      : "Razon sin especificar";
    message.guild?.members.ban(member.id, { reason: razon });
    embed
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setThumbnail(
        !!member.user
          ? member.user.displayAvatarURL()
          : member.displayAvatarURL()
      )
      .setTitle("¡Hackban exitoso!")
      .addField(`> Usuario Baneado`, member.user.tag)
      .addField("> Razón", razon)
      .setColor("WHITE")
      .setTimestamp();

    if (!!member.user) member.user.send({ embeds: [embed] }).catch((e) => e);
    message.reply({ embeds: [embed] });
  };
}
