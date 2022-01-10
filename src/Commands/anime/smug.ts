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

export class SmugCommand extends BaseCommand {
constructor() {
  super({
    name: "smug",
    aliases: [],
    description: "",   
    usage: "smug",
    category: "Anime",
    cooldown: 0,
    botPerms: ["SEND_MESSAGES"],
    userPerms: [],
    devOnly: false,
    guildOnly: true,
  })
};

/**
 * 
 * @param { Lyon } client 
 * @param { Message } message 
 * @param { String[] } args 
 */


  run = async(client: Lyon, message: Message, args) => {

    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    neko.sfw
      .smug()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(`JAJAJAJAJA`)
          .setColor("WHITE")
          .setImage(asd.url);

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  };
};
