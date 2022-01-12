import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class HubCommentCommand extends BaseCommand {
  constructor() {
    super({
      name: "phcomment",
      aliases: ["hubcomment"],
      description: "Envía una imagen de un comentario tuyo en el hub.",
      usage: "phcomment <texto>",
      category: "Fun",
      cooldown: 0,
      botPerms: ["ATTACH_FILES", "SEND_MESSAGES"],
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
    let txt = args.join("%20"); //Argumentos
    if (txt.includes("@"))
      return message.reply(
        "Intenta no mencionar, esto puede provocar errores."
      );
    if (!txt) return message.reply("Olvidaste colocar el comentario."); //Si no hay argumentos...
    if (txt.length > 30)
      return message.reply("El texto debe ser menor a 30 carácteres.");
    let autor = message.author; //Definimos autor

    let attachment = new Discord.MessageAttachment(
      `https://nekobot.xyz/api/imagegen?type=phcomment&image=${autor.displayAvatarURL()}&text=${txt}&username=${
        autor.username
      }&raw=1`,
      "logo.png"
    ); //Pedimos la imagen

    try {
      message.reply({ files: [attachment] }); //La enviamos
    } catch (err) {
      console.log(err);
    }
  }; //Fin del codigo :D
}
