"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const google_translate_1 = __importDefault(require("@iamtraction/google-translate")); //requerimos la API que necesitaremos...
exports.command = {
    name: 'translate',
    aliases: [],
    category: 'Útil',
    description: 'Traduce',
    usage: '',
    run: async (client, message, args) => {
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
            console.error(err); //En caso de haber un error en este caso seria introducir mal el lenguaje al que se traducirá 
        });
        //Nota: el idioma a traducir tiene que ser escrito en ingles, como spanish, japanese, english, etc...
    }
};
//# sourceMappingURL=translate.js.map