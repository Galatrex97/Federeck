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
module.exports = {
    name: "say",
    aliases: ["d"],
    category: 'Útil',
    usage: 'say/d',
    description: 'Este comando hace que yo diga algo en el canal en el que se ejecuto el comando',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        function is_url(str) {
            let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        let roleMention = message.mentions.roles.first();
        let texto = args.join(' ');
        if (["@everyone", "@here"].includes(texto) && !((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR")))
            return message.reply("Para mencionar debes tener el permiso de Administrador.").then(nya => {
                nya.delete();
            });
        if (roleMention && !((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has("ADMINISTRATOR"))) {
            return message.reply("Para mencionar debes tener el permiso de Administrador.");
        }
        if (!message.member.permissions.has("ADMINISTRATOR") && (is_url(texto) === true))
            return message.reply("Para mencionar debes tener el permiso de Administrador.");
        if (!texto)
            return message.channel.send("Debes escribir algo...");
        if (((_c = message.guild) === null || _c === void 0 ? void 0 : _c.mfaLevel) === "NONE") {
            message.delete();
        }
        try {
            message.channel.send(texto);
        }
        catch (e) {
            console.log(e);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setColor("WHITE")
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    })
};
