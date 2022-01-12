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

export default class KissCommand extends BaseCommand {
  constructor() {
    super({
      name: "kiss",
      aliases: [],
      description: "Besa a alguien con este comando",
      usage: "kiss",
      category: "Anime",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: true,
    });
  }

  run = async (client, message, args) => {
    let nya = message.mentions.members?.first();
    if (!nya) return message.reply("Debes mencionar a alguien");

    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send("No puedes besarte.");
    }

    neko.sfw
      .kiss()
      .then((neko) => {
        const embed = new MessageEmbed()
          .setTitle(
            `${message.author.username} Le ha dado un beso a ${nya?.user.username}`
          )
          .setImage(neko.url)
          .setColor("WHITE")
          .setFooter({ text: "Para cuando la boda?" })
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  };
}
