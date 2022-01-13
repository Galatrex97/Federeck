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

export class WaifuCommand extends BaseCommand {
  constructor() {
    super({
      name: "waifu",
      aliases: [],
      description: "",
      usage: "waifu",
      category: "Anime",
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

  run = async (client: Lyon, message: Message, args) => {
    neko.sfw
      .waifu()
      .then((aa) => {
        const embed = new MessageEmbed().setDescription("ugu").setImage(aa.url);

        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  };
}
