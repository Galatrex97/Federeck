import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class PlayCommand extends BaseCommand {
  constructor() {
    super({
      name: "play",
      aliases: ["p"],
      description:
        "Reproduce alguna canción solicitada o la añade a la lista de reproducción actual.",
      usage: "play",
      category: "Música",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES", "SPEAK", "CONNECT"],
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
    let guildList = client.player.getQueue(message.guild?.id as string);

    let si = args.join(" ");
    if (!si) return message.channel.send("Debes escribir algo");
    if (!message.member?.voice.channel)
      return message.channel.send("Debes estar en un canal de voz...");

    if (
      message.guild?.me?.voice.channel &&
      message.member?.voice.channel?.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente..."
      );

    let queue = client.player.createQueue(message.guild?.id as any, {
      data: {
        msg: message,
      },
    });
    await queue.join(message.member?.voice.channel as any);
    let song: any = await queue.play(si).catch((err) => {
      console.log(err);
    });

    song.setData({
      msg: message,
    });
  };
}
