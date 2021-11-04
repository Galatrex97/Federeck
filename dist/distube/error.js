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
module.exports.run = (client, error) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(error);
    let errmsg = new (require('discord.js')).MessageEmbed()
        .setTitle('Ha ocurrido un error')
        .setDescription(`**Tengo el siguiente error:** ${error}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter('Tipico')
        .setTimestamp();
    client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
});
