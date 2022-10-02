import Discord, { Guild, GuildMember, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class BanCommand extends BaseCommand {
  constructor() {
    super({
      name: "ban",
      aliases: [],
      description: "Banea a un usuario.",
      usage: "ban <@user> <@razón>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["BAN_MEMBERS", "SEND_MESSAGES"],
      userPerms: ["BAN_MEMBERS"],
      devOnly: false,
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
    const owner = (await (message.guild as Guild).fetchOwner()).user.id;
    const user = message.mentions.members?.first();
    const banReason = args.join(" ").slice(22);
    if (!user) {
      return message.reply("¿A quién quieres banear?");
    } else if (user.id === message.author.id) {
      return message.reply("No puedes auto-banearte.");
    } else if (user.id === owner) {
      return message.reply("No se puede banear al dueño del servidor.");
    } else if (user.id === client.user?.id) {
      return message.reply(":pensive: ¿Qué hice mal?");
    } else if (
      (message.guild?.me as GuildMember).roles.highest.comparePositionTo(
        user.roles.highest
      ) < 0
    ) {
      return message.channel.send(
        "No puedo banear a esa persona porque tiene un rol más alto que el mío."
      );
    } else if (
      (message.guild?.me as GuildMember).roles.highest.comparePositionTo(
        user.roles.highest
      ) == 0
    ) {
      return message.channel.send(
        "No puedo banear a esa persona porque tiene un rol igual que el mío. Compartimos nuestro rol más alto."
      );
    } else if (
      message.member.roles?.highest.comparePositionTo(user?.roles?.highest) < 0
    ) {
      return message.reply(
        "No puedes banear a esa persona porque tiene un rol más alto que el tuyo."
      );
    } else if (
      message.member?.roles.highest.comparePositionTo(user.roles.highest) == 0
    ) {
      return message.reply(
        "No puedes banear a esa persona porque ambos comparten un rol de igual jerarquía. Ambos comparten su rol más alto."
      );
    } else if (!user.bannable) {
      return message.reply(
        "No puedo banear a ese usuario, seguramente sea un administrador/moderador u otro motivo me lo impide."
      );
    } else if (!banReason) {
      return message.reply("Escribe una razón.");
    }
    user.ban({ reason: banReason });

    message.reply(
      `El usuario **${user}** fue baneado por **${banReason}**\nModerador: **${message.author}**`
    );
    const bannedEmbed = new Discord.MessageEmbed()
      .setTitle("Adiós.")
      .setDescription(
        `Lamentablemente has sido baneado de **${message.guild?.name}** por el Moderador: **${message.author.username}**.\nLa razón de tu baneo fue: ${banReason}. ¡Hasta pronto!`
      )
      .setThumbnail(`${message.guild?.iconURL({ size: 4096, dynamic: true })}`)
      .setTimestamp();
    user.send({ embeds: [bannedEmbed] }).catch(() => {});
  };
}
