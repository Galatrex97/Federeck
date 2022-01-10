import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Role,
  GuildMember,
  Message,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class SayToChannelCommand extends BaseCommand {
constructor() {
  super({
    name: "say-c",
    aliases: [],
    description: "Decir algo en otro canal",   
    usage: "say-c <texto>",
    category: "Útil",
    cooldown: 0,
    botPerms: [],
    userPerms: ["ADMINISTRATOR"],
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

    let canal = message.mentions.channels.first();
    if (!canal) return message.channel.send("Debes mencionar un canal.");

    let texto = args.slice(1).join(" ");
    if (!texto) return message.channel.send("Debes escribir algo.");
    if(message.deletable) {
      message.delete()
    }

    try {
      (canal as TextChannel).send({content: texto, allowedMentions: {
        parse: [],
        },
       });
    } catch (err) {
      console.log(err);
    }
  };
};
