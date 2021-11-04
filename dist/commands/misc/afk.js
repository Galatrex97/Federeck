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
const afk_1 = __importDefault(require("../../models/afk"));
module.exports = {
    name: 'afk',
    aliases: [],
    usage: 'afk',
    description: 'Comando AFK',
    category: 'Misceláneo',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let data;
        try {
            data = yield afk_1.default.findOne({
                userId: message.author.id,
                guildId: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id,
            });
            if (!data) {
                data = yield afk_1.default.create({
                    userId: message.author.id,
                    guildId: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id,
                });
            }
        }
        catch (e) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(e);
        }
        data.AFK_Reason = args.join(" ");
        if (data.AFK_Reason) {
            message.channel.send(`${message.author} tu AFK se ha establecido a: **${data.AFK_Reason}**`);
        }
        if (!data.AFK_Reason) {
            message.channel.send(`${message.author} Ahora estás en AFK`);
        }
        data.AFK = true;
        yield data.save();
    })
};
