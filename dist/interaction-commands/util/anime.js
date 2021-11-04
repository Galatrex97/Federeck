"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const mal_scraper_1 = require("mal-scraper");
module.exports = {
    name: "anime",
    description: "Busca un anime",
    options: [
        {
            name: 'search',
            description: 'Busca un anime',
            type: 'STRING',
            required: true
        }
    ],
    /**
     *
         * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        let Text = interaction.options.getString("search");
        if (Text && Text.length > 200)
            return interaction.followUp({ content: `<a:noputo:868687565304246283> | **El limite de texto es de 200**`, ephemeral: true }); //limite de texto
        let Replaced;
        if (Text) {
            Replaced = Text.replace(/ /g, " ");
        }
        let Anime; //definimos el anime
        let Embed; //Definimos el embed
        try {
            Anime = yield (0, mal_scraper_1.getInfoFromName)(Replaced); //Información del anime cómo descripción.
            if (!Anime.genres[0] || Anime.genres[0] === null)
                Anime.genres[0] = "None";
            Embed = new discord_js_1.MessageEmbed() //ponemos el embed anterior.
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
        }
        catch (error) { //abrimos y cerramos el evento
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            let channel = client.channels.cache.get("901550991923630130");
            if (channel) {
                channel.send({ embeds: [errmsg] });
            }
            else {
                return false;
            }
            return interaction.followUp({ content: `Ha ocurrido un error.`, ephemeral: true });
        }
        ;
        return interaction.followUp({ embeds: [Embed] }); //enviamos el mensaje
    }),
};
