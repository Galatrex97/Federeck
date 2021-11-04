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
const { youtubeChannelInfo } = require("zjuqn");
module.exports = {
    name: "ytchannel",
    aliases: ["ytchan"],
    dev: true,
    category: "Info",
    description: "Busca un canal de YouTube y te muestra sus estadísticas",
    usage: "ytchannel <canal>",
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let canalName = args.join(" ");
        if (!canalName) {
            return message.reply("Por favor, escribe un canal.");
        }
        let ñ = new youtubeChannelInfo({
            message: message,
            color: "WHITE",
            channelName: canalName
        });
        try {
            ñ.send();
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    })
};
