import Discord from "discord.js";
import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class InviteCommand extends BaseCommand {
  constructor() {
    super({
      name: "invite",
      aliases: [],
      description:
        "¿Estás intentando invitarme a tu servidor? ¡Muchas gracias!",
      usage: "invite",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args, p) => {
    let link =
      "https://discord.com/oauth2/authorize?client_id=849395994973700117&scope=bot%20applications.commands&permissions=2146938238";

    const inviteEmbed = new Discord.MessageEmbed()
      .setTitle("Link de invitación")
      .setColor("WHITE")
      .setTimestamp()
      .setDescription(
        `Haz click [\`aquí\`](${link}) para invitarme a tu servidor.\nSi tienes alguna duda, puedes usar \`${p}help\``
      )
      .setThumbnail(`${client.user?.avatarURL()}`);

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setURL(link)
        .setStyle("LINK")
        .setLabel("Invitame")
    );

    try {
      message.reply({ embeds: [inviteEmbed], components: [row] });
    } catch (err) {
      console.log(err);
    }
  };
}
