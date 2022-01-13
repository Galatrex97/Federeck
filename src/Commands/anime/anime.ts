import Lyon from "../../Client";
const Scraper = require("mal-scraper");
import translate from "@iamtraction/google-translate";

import { CommandOptions } from "../../Interfaces";

import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";

export class AnimeCommand extends BaseCommand {
  constructor() {
    super({
      name: "anime",
      aliases: [],
      description: "Busca un anime en MyAnimeList.net",
      usage: "anime <Anime a buscar>",
      category: "Anime",
      cooldown: 10,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  run = async (client: Lyon, message: Message, args) => {
    let Text = args.join(" ");

    if (!Text)
      return message.reply(
        `<a:noputo:868687565304246283> |**Debes escribir el nombre del anime.**`
      ); //Por si no hay nombre esto lanza.

    if (Text.length > 50)
      return message.reply(
        `<a:noputo:868687565304246283> | **El limite de texto es de 50 caracteres.**`
      ); //limite de texto

    let Msg = await message.reply({
      content: `<a:see:868645120289943552> | **Buscando...**`,
    }); //tiempo de busqueda

    let Replaced = Text.replace(/ /g, " ");

    let Anime; //definimos el anime

    let Embed; //Definimos el embed

    try {
      Anime = await Scraper.getInfoFromName(Replaced); //Información del anime cómo descripción.

      if (!Anime.genres[0] || Anime.genres[0] === null)
        Anime.genres[0] = "No hay información";

      let translatedStatus = {
        "Finished Airing": "Transmisión finalizada",
        "Currently Airing": "En transmisión",
      };

      let translatedSynopsis = translate(Anime.synopsis, { to: "es" });
      let translatedGenres = translate(Anime.genres.join(", "), { to: "es" });
      if (Anime.episodes == "Unknown") {
        Anime.episodes = "No hay información";
      }
      Embed = new MessageEmbed()

        .setColor("WHITE")
        .setURL(Anime.url)
        .setTitle(Anime.title)
        .setDescription((await translatedSynopsis).text)
        .addField(`Tipo`, Anime.type, true)
        .addField(`Estado`, translatedStatus[Anime.status], true)
        .addField(`Episodios`, Anime.episodes, true)
        .addField(`Duración por ep.`, Anime.duration, true)
        .addField(`Popularidad`, Anime.popularity, true)
        .addField(`Generos`, (await translatedGenres).text)
        .setThumbnail(Anime.picture)
        .setFooter(`Puntaje - ${Anime.score}`)
        .setTimestamp();
    } catch (error) {
      return message.reply(`No se ha encontrado el anime.`);
    }

    return await Msg.edit({ content: null, embeds: [Embed] }); //enviamos el mensaje
  };
}
