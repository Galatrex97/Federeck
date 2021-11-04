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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const google_translate_1 = __importDefault(require("@iamtraction/google-translate")); //requerimos la API que necesitaremos...
module.exports = {
    name: 'translate',
    aliases: [],
    category: 'Útil',
    description: 'Traduce',
    usage: '',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const idioma = args[0]; //Establecemos el argumento 0 como el idioma al que se traducira
        const texto = args.slice(1).join(' '); //A partir del argumento 1 tomara el texto a traducir 
        if (!idioma) { //Si no escribio el idioma de la manera correcta 
            return message.channel.send('Especifica el idioma a traducir del texto');
        }
        if (!texto) { //Si solamente escribio el idioma pero no el texto...
            return message.channel.send('Y el texto que quieres traducir?');
        }
        (0, google_translate_1.default)(texto, { to: idioma }).then(res => {
            let embed = new discord_js_1.MessageEmbed() //Me gusta usar embeds xd
                .setTitle('Traductor')
                .addField('Texto a traducir:', texto)
                .addField('Traducción:', res.text)
                .setColor('WHITE'); //Un console log por si las dudas
            message.channel.send({ embeds: [embed] }); //Se envia el embed
        }).catch(err => {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setColor("WHITE")
                .setFooter('Tipico')
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.error(err); //En caso de haber un error en este caso seria introducir mal el lenguaje al que se traducirá 
        });
        //Nota: el idioma a traducir tiene que ser escrito en ingles, como spanish, japanese, english, etc...
    })
};
