import Discord, {
  Client,
  Message,
  Guild,
  MessageEmbed,
  GuildMember,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class KickCommand extends BaseCommand {
  constructor() {
    super({
      name: "kick",
      aliases: ["pg"],
      description: "Expulsa a un miembro del servidor",
      usage: "kick <@user> [razón]",
      category: "Mod",
      cooldown: 0,
      botPerms: ["KICK_MEMBERS", "SEND_MESSAGES"],
      userPerms: ["KICK_MEMBERS"],
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
    const reason = args.join(" ").slice(22);

    if (!message.guild?.me?.permissions.has("KICK_MEMBERS")) {
      return message.reply(
        "No tengo el permiso **Expulsar Miembros**, para usar este comando, este permiso es de carácter __obligatorio__, así que tendrás que otorgarme un rol con ese permiso o modificar mis permisos actuales para usar este comando."
      );
    } else if (!message.member?.permissions.has("KICK_MEMBERS")) {
      return message.reply("No tienes el permiso para **Expulsar miembros**.");
    } else if (!user) {
      return message.reply("¿A quién quieres expulsar?");
    } else if (user.id === message.author.id) {
      return message.reply("No puedes auto-expulsarte.");
    } else if (user.id === owner) {
      return message.reply("No se puede expulsar al dueño del servidor. XD");
    } else if (user.id === client.user?.id) {
      return message.reply(":pensive: ¿Qué hice mal?");
    } else if (
      message.guild.me.roles.highest.comparePositionTo(user.roles.highest) < 0
    ) {
      return message.channel.send(
        "No puedo expulsar a esa persona por qué tiene un rol más alto que el mío."
      );
    } else if (
      message.guild.me.roles.highest.comparePositionTo(user.roles.highest) == 0
    ) {
      return message.channel.send(
        "No puedo expulsar a esa persona por qué tiene un rol igual que el mío. Compartimos nuestro rol más alto."
      );
    } else if (
      message.member?.roles.highest.comparePositionTo(user.roles.highest) < 0
    ) {
      return message.reply(
        "No puedes expulsar a esa persona por que tiene un rol más alto que el tuyo."
      );
    } else if (
      message.member.roles.highest.comparePositionTo(user.roles.highest) == 0
    ) {
      return message.reply(
        "No puedes expulsar a esa persona por qué ambos comparten un rol de igual jerarquía. Ambos comparten su rol más alto."
      );
    } else if (!user.kickable) {
      return message.reply(
        "No puedo expulsar a ese usuario, seguramente sea un administrador/moderador u otro motivo."
      );
    } else if (!reason) {
      return message.reply("Escribe una razón.");
    }
    try {
      user.kick(reason);
    } catch (err) {
      console.log(err);
    }

    message.reply(
      `El usuario **${user}** fue expulsado por **${reason}**\nModerador: **${message.author}**`
    );
  };
}
