import Discord, { Client, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class ReportBugCommand extends BaseCommand {
  constructor() {
    super({
      name: "bug-report",
      aliases: ["bug", "reportbug", "report-bug", "bug-report"],
      description:
        "Reporta un bug a los desarrolladores para que sea arreglado",
      usage: "bug-report <bug a reportar>",
      category: "Útil",
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
    const reportedBug = args.join(" ");
    if (!reportedBug) return message.reply("Que bug quieres reportar?");
    const embed = new MessageEmbed()
      .setTitle("Nuevo reporte de bug")
      .setColor("WHITE")
      .setTimestamp()
      .setDescription(
        `El usuario **${message.author.tag}** ha reportado un bug desde el server **${message.guild?.name}**.\nEl bug reportado es el siguiente: **${reportedBug}**`
      );

    try {
      client.users.cache
        .get(`${process.env.botOwner}`)
        ?.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
    message.reply(
      `Tu bug se ha reportado correctamente y estará en revisión muy pronto.`
    );
  };
}
