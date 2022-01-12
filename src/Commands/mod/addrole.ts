import Discord, {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class AddRoleCommand extends BaseCommand {
  constructor() {
    super({
      name: "add-role",
      aliases: [],
      description: "Añade un rol a un miembro del servidor.",
      usage: "add-role <@rol> <@user>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["MANAGE_ROLES", "SEND_MESSAGES"],
      userPerms: ["MANAGE_ROLES"],
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
    let role: any = message.mentions.roles.first();
    let member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[1]);

    if (!role) return message.reply("Debes mencionar un rol.");
    if (!member)
      return message.reply("Debes mencionar un miembro o escribir su id.");
    if (args[0].includes(member))
      return message.reply("Primero menciona el rol y luego el usuario.");
    if (args[1].includes(role))
      return message.reply("Primero menciona el rol y luego el usuario.");
    if (role.managed) return message.reply("No se puede re-asignar este rol.");
    if (role.id.includes(member.roles))
      return message.reply("Este miembro ya tiene este rol.");

    try {
      member.roles
        .add(role)
        .then(() =>
          message.channel
            .send(`El rol ${role} ha sido añadido a ${member} con éxito.`)
            .catch((err) => console.log(err))
        );
    } catch (err) {
      message.channel.send(`Ha ocurrido un error.`);
      console.log(err);
    }
  };
}
