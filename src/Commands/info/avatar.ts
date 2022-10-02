import Discord, { GuildMember, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class AvatarCommand extends BaseCommand {
  constructor() {
    super({
      name: "avatar",
      aliases: ["pfp"],
      description:
        "¿Alguna vez quisiste descargar tu foto de perfil o ver la foto de algún usuario más cerca? Con este comando podrás ver tu propio avatar, el de otros miembros e incluso el de usuarios que no están en el servidor.",
      usage: "Avatar [@user]",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
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
      let a = await client.users.fetch(member);
      let pfp = await a.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 4096,
      });
      const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de: **${a.username}**`)
        .addField("Pedido por:", `${message.member}`)
        .setImage(`${pfp}`)
        .setColor("WHITE")
        .setFooter({ text: ":)", iconURL: `${client.user?.avatarURL()}` })
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      message.channel.send("Ha ocurrido un error.");
    }
  };
}
