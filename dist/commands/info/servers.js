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
const discord_js_1 = __importDefault(require("discord.js"));
const gg = process.env.botOwner;
const nya = process.env.nya;
module.exports = {
    name: "servers",
    aliases: ["sv"],
    usage: 'servers/sv',
    category: 'Info',
    description: "...",
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (![gg, nya].includes(message.author.id)) {
            return message.reply("No puedes usar este comando, no te diré porque pero no tiene nada que ver con permisos o roles.");
        }
        let embed = new discord_js_1.default.MessageEmbed()
            .setTitle(`Estoy en ${client.guilds.cache.size} servers con ${client.users.cache.size} usuarios`)
            .setDescription(`${client.guilds.cache.map(x => x).sort((a, b) => b.memberCount - a.memberCount).map((r, i) => `**${i + 1}** | ${r.name}, con **${r.memberCount} usuarios**.`).join("\n")}`)
            .setColor("WHITE")
            .setThumbnail(`${client.user.avatarURL()}`)
            .setFooter(`Servidores de ${client.user.username}`)
            .setTimestamp();
        try {
            message.reply({ embeds: [embed] });
        }
        catch (err) {
            console.log(err);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setColor("WHITE")
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    })
};
