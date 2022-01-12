import Discord from "discord.js";
const gg = process.env.botOwner;
const nya = process.env.nya;

import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class NameCommand extends BaseCommand {
  constructor() {
    super({
      name: "servers",
      aliases: [],
      description: "Muestra los servers en los que está el bot",
      usage: "servers",
      category: "Info",
      cooldown: 7,
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

  run = async (client: Lyon, message: Message, args) => {
    /*    if (![gg, nya].includes(message.author.id)) {
      return message.reply(
        "No puedes usar este comando, no te diré porque pero no tiene nada que ver con permisos o roles."
      );
    } */
    let embed = new Discord.MessageEmbed()
      .setTitle(
        `Estoy en ${
          client.guilds.cache.size
        } servers con ${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        )} usuarios`
      )
      .setDescription(
        `${client.guilds.cache
          .filter((r) => r.memberCount >= 50)
          .map((x) => x)
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(
            (r, i) =>
              `**${i + 1}** | ${r.name}, con **${r.memberCount} usuarios**.`
          )
          .join(
            "\n"
          )}\n\n***Debido a muchos servidores hemos decidido mostrar solo los destacados.***`
      )
      .setColor("WHITE")
      .setThumbnail(`${client.user?.avatarURL()}`)
      .setFooter(`Servidores de ${client.user?.username}`)
      .setTimestamp();
    try {
      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  };
}
