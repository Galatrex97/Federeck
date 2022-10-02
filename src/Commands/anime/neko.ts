import { Message, TextChannel } from "discord.js";
import Klar from "../../Client";

const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const clientnt = require("nekos.life");
const neko = new clientnt();
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class NekoCommand extends BaseCommand {
  constructor() {
    super({
      name: "neko",
      aliases: [],
      description: "Nekos",
      usage: "neko",
      category: "Anime",
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
    if (!(message.channel as TextChannel).nsfw) {
      neko.sfw
        .neko()
        .then((asd: any) => {
          const embed = new MessageEmbed()
            .setDescription(`Meow`)
            .setImage(asd.url)
            .setColor("WHITE");

          message.reply({ embeds: [embed] });
        })
        .catch((error) => {
          console.log(error);

          message.channel.send("Ha ocurrido un error.");
        });
    }
    if ((message.channel as TextChannel).nsfw) {
      neko.nsfw
        .neko()
        .then((aa: any) => {
          const embed = new MessageEmbed()
            .setDescription("Nekos")
            .setFooter("Nya~")
            .setTimestamp()
            .setColor("WHITE")
            .setImage(aa.url);

          message.reply({ embeds: [embed] });
        })
        .catch((error: Error) => {
          console.log(error);

          message.channel.send("Ha ocurrido un error.");
        });
    }
  };
}
