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
const prefix_1 = __importDefault(require("../../models/prefix"));
let prefix = process.env.prefix;
module.exports = {
    name: "prefix-reset",
    aliases: ["prefix-rs"],
    category: 'Configuración',
    usage: 'prefix-rs/prefix-reset',
    description: 'Hace que el prefix vuelva a ser el prefix por defecto (k!).',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR")))
            return message.reply("No.").then(nya => {
                setTimeout(() => {
                    nya.delete();
                }, 7000);
            }).catch((error) => {
                console.log(error);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                message.channel.send("Ha ocurrido un error.");
            });
        yield prefix_1.default.findOneAndDelete({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id });
        message.reply(`El prefix ha sido reestablecido a **${prefix}**`);
    })
};
