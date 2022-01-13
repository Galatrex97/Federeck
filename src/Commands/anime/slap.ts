import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt();
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class SlapCommand extends BaseCommand {
  constructor() {
    super({
      name: "slap",
      aliases: ["abofetear", "cachetear"],
      description: "",
      usage: "",
      category: "Anime",
      cooldown: 0,
      botPerms: [],
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
    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    const person = message.mentions.members?.first();
    if (!person) return message.reply("Debes mencionar a alguien.");

    neko.sfw
      .slap()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** abofetea a **${person.user.username}**`
          )
          .setImage(asd.url)
          .setColor("WHITE");

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  };
}
