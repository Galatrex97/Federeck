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

export default class Trump_tweetCommand extends BaseCommand {
  constructor() {
    super({
      name: "trump-tweet",
      aliases: [],
      description: "Mira este tweet de Trump!",
      usage: "trump-tweet <texto>",
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

  run = async (client: Lyon, message: Message, args, p) => {
    const texto = args.join(" ");
    if (!texto) return message.channel.send("No has ingresado un texto");
    // Si no ingresan nada

    if (texto.length >= 80)
      return message.channel.send(
        "Para evitar problemas el texto no puede superar los 80 caracteres"
      );
    // Si el texto supera los 80 caracteres retorna el mensaje

    let attachment = new Discord.MessageAttachment(
      `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${texto}&raw=1`,
      "ttweet.png"
    ); //Creamos la imagen con la API de NekoBot

    message.channel.send({ files: [attachment] }).catch((err) => {
      // En caso de algun error
      if (
        err ==
        "TypeError [ERR_UNESCAPED_CHARACTERS]: Request path contains unescaped characters"
      ) {
        return message.channel.send(
          "El texto ingresado NO puede contener Emojis."
        );
      } else {
        message.channel.send(
          `Tengo este error, reportalo en nuestro server de Discord o con el comando ${p}bug-report.\n El error es: ||${err.message}||`
        );
      }
      // En caso de que en el texto haya emojis y la API te de este error retorna este mensaje
    });
  };
}
