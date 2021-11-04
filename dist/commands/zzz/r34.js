"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const discord_js_1 = __importDefault(require("discord.js"));
const booru = __importStar(require("booru"));
module.exports = {
    name: "rule34",
    aliases: ["r34"],
    usage: 'rule34 <tags>',
    dev: false,
    category: 'NSFW',
    description: 'Busca algo en la rule',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.channel.nsfw)
            return message.reply("Este canal no es NSFW, abstienete de usar esos comandos aqui");
        const tags = args.join("_"); //los tags que buscaremos
        if (!tags)
            return message.reply("Escribe algo a buscar en la r34");
        booru.search('rule34', [tags], { limit: 1, random: true }) //el primero es para buscar en la rule 34, luego se busca con los tags, luego agarramos una sola imagen y que sea una imagen aleatoria
            .then(posts => {
            for (let post of posts) { //luego la parte post de posts
                const embed = new discord_js_1.default.MessageEmbed() //creamos el embed
                    .setColor("WHITE")
                    .setTitle(`Resultado de la busqueda: ${tags}`)
                    .setImage(post.fileUrl); //fileUrl es el URL directo de la imagen
                message.channel.send({ embeds: [embed] }); //mandamos el embed
            }
        }).catch((e) => {
            message.reply(`Ha ocurrido un error: ${e} `);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${e.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }); //un catch por si da error
    })
};
