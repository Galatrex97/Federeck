import {
  Client,
  CommandInteraction,
  MessageEmbed,
  ChannelResolvable,
  TextChannelResolvable,
  TextChannel,
  GuildChannel,
} from "discord.js";
import { getInfoFromName } from "mal-scraper";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "anime",
  description: "Busca un anime",
  options: [
    {
      name: "search",
      description: "Busca un anime",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: CommandInteraction) => {
    let Text = interaction.options.getString("search");

    if (Text && Text.length > 200)
      return interaction.followUp({
        content: `<a:noputo:868687565304246283> | **El limite de texto es de 200**`,
        ephemeral: true,
      }); //limite de texto

    let Replaced;

    if (Text) {
      Replaced = Text.replace(/ /g, " ");
    }

    let Anime: any; //definimos el anime

    let Embed: any; //Definimos el embed

    try {
      Anime = await getInfoFromName(Replaced); //Información del anime cómo descripción.

      if (!Anime.genres[0] || Anime.genres[0] === null)
        Anime.genres[0] = "None";

      Embed = new MessageEmbed() //ponemos el embed anterior.

        .setColor("WHITE") //color del embed
        .setURL(Anime.url) //URL Del anime.
        .setTitle(Anime.title) //un contexto en el anime
        .setDescription(Anime.synopsis) //Escrito por
        .addField(`Tipo`, Anime.type, true) //tipo de plataforma que se mira el anime
        .addField(`Estreno`, Anime.status, true) //dice si esta transmitiendo capitulos o no
        .addField(`Episodios`, Anime.episodes, true) //cuentos episodios tiene el anime.
        .addField(`Duración`, Anime.duration, true) //duración del anime
        .addField(`Popularidad`, Anime.popularity, true) //popularidad del anime o entre lugar que esta
        .addField(`Generos`, Anime.genres.join(", ")) //tipo de anime del anime ejemplo comedia o romantico
        .setThumbnail(Anime.picture) //foto de portada del anime
        .setFooter(`Puntaje - ${Anime.score}`) //puntaje del anime
        .setTimestamp();
    } catch (error: any) {
      //abrimos y cerramos el evento
      console.log(error);
      let errmsg = new MessageEmbed()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setTimestamp()
        .setColor("WHITE");

      let channel = client.channels.cache.get(
        "901550991923630130"
      ) as TextChannel;

      if (channel) {
        channel.send({ embeds: [errmsg] });
      } else {
        return false;
      }
      return interaction.followUp({
        content: `Ha ocurrido un error.`,
        ephemeral: true,
      });
    }

    return interaction.followUp({ embeds: [Embed] }); //enviamos el mensaje
  },
};
