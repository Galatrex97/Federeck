import Discord from "discord.js";
import { Client, Message, MessageEmbed } from "discord.js";
const YouTube = require("youtube-node");
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class YTSearchCommand extends BaseCommand {
  constructor() {
    super({
      name: "yt-search",
      aliases: [],
      description: "Busca un vídeo en youtube.",
      usage: "yt-search <video>",
      category: "Info",
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
    let youTube = new YouTube();

    //Necesita tener una clave para usar la API de YouTube Data API v3
    //video tutorial: https://www.youtube.com/watch?v=VxQPG991YUs

    youTube.setKey(process.env.youtubeApi); //Acá ponen su API-KEY

    let nombreyt = args.join(" "); //Definimos: nombreyt
    if (!nombreyt) return message.reply("Que quieres buscar?"); //Si no tiene un nombre de vídeo en yt, retornar.

    message
      .reply("<a:xdd:841332542220927016> | Buscando..!")
      .then((m) => {
        youTube.search(args.join(" "), 2, function (err: Error, result: any) {
          if (err) {
            return console.log(err);
          }
          if (result?.items[0]["id"].videoId == undefined) {
            return message.reply(
              "No he encontrado un video, relacionado con tu busqueda."
            ); //Si el vídeo no existe, retornar
          } else {
            let link = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`;
            m.edit(link); //Editar el mensaje ''Búscando'' por el link del vídeo
          }
        });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  }; //Cerramos código
}
