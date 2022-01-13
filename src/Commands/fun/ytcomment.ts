import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import canvacord from "canvacord";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class YT_CommentCommand extends BaseCommand {
  constructor() {
    super({
      name: "yt-comment",
      aliases: [],
      description: "Comenta algo en youtube con tu nombre de usuario y avatar,",
      usage: "yt-comment <texto>",
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
   * @ts-chec
   */

  run = async (client: Lyon, message: Message, args) => {
    const comment = args.join(""); // definimos el comentario a poner
    if (!comment) return message.reply(`Que quieres comentar?`); // si el usuario no indica ningun comentario dice que lo pongas ;)
    try {
      let yt = await canvacord.Canvacord.youtube({
        avatar: message.author.displayAvatarURL({ format: "png", size: 4096 }),
        username: message.author.username,
        content: args.join(" "),
      }); // generamos la foto, podemos canviar el user a lo que queramos
      let enviar = new Discord.MessageAttachment(yt, "comentario.png"); // generamos el Attachment para enviarlo
      message.reply({ files: [enviar] }); // finalmente lo enviamos, se puede puede poner en embed si lo deseas.
    } catch (err) {
      // si hay un error lo loguea en la consola

      console.log("Ha ocurrido un error."); // logeamos en caso de error
    }

    /*
Bien ahora se puede hacer otra cosa y es con await messages cojer la foto, el user y el contenido. Quedaria mejor.
10 likes y lo subo ;)
*/
  };
}
