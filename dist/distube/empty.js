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
module.exports.run = (client, queue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send("No hay nadie en el canal de voz, así que me voy a salir.");
    }
    catch (err) {
        let errmsg = new discord_js_1.MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${err}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp();
        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        console.log(err);
    }
});
