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
const Scraper = require('mal-scraper');
module.exports = {
    name: "anime",
    aliases: [],
    usage: 'anime <Anime a buscar>',
    category: 'Anime',
    description: 'Busca un anime a partir de lo que escribe el user.',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let Text = args.join(" ");
        if (!Text)
            return message.reply(`<a:noputo:868687565304246283> |**Debes escribir el nombre del anime.**`); //Por si no hay nombre esto lanza.
        if (Text.length > 200)
            return message.reply(`<a:noputo:868687565304246283> | **El limete de texto es de 200**`); //limite de texto
        let Msg = yield message.reply(`<a:see:868645120289943552> | **Buscando..**`); //tiempo de busqueda
        let Replaced = Text.replace(/ /g, " ");
        let Anime; //definimos el anime
        let Embed; //Definimos el embed
        try {
            Anime = yield Scraper.getInfoFromName(Replaced); //Información del anime cómo descripción.
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
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(error);
            return message.reply(`Ha ocurrido un error.`);
        }
        ;
        return message.reply({ embeds: [Embed] }); //enviamos el mensaje
    })
};
