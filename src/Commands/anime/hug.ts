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

export class HugCommand extends BaseCommand {
constructor() {
  super({
    name: "hug",
    aliases: ["abrazar"],
    description: "Abraza a quién lo necesite",   
    usage: "hug",
    category: "Anime",
    cooldown: 0,
    botPerms: ["SEND_MESSAGES"],
    userPerms: [],
    devOnly: false,
    guildOnly: true,
  })
};


  run = async(client, message, args) => {
    const person = message.mentions.members?.first();
    if (!person) return message.reply("Debes mencionar a alguien.");

    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    neko.sfw
      .hug()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** Abraza a **${person.user.username}**`
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
};
