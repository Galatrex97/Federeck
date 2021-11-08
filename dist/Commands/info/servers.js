"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const gg = process.env.botOwner;
const nya = process.env.nya;
exports.command = {
    name: "servers",
    aliases: ["sv"],
    usage: 'servers/sv',
    category: 'Info',
    description: "...",
    run: async (client, message, args) => {
        if (![gg, nya].includes(message.author.id)) {
            return message.reply("No puedes usar este comando, no te diré porque pero no tiene nada que ver con permisos o roles.");
        }
        let embed = new discord_js_1.default.MessageEmbed()
            .setTitle(`Estoy en ${client.guilds.cache.size} servers con ${client.users.cache.size} usuarios`)
            .setDescription(`${client.guilds.cache.map(x => x).sort((a, b) => b.memberCount - a.memberCount).map((r, i) => `**${i + 1}** | ${r.name}, con **${r.memberCount} usuarios**.`).join("\n")}`)
            .setColor("WHITE")
            .setThumbnail(`${client.user?.avatarURL()}`)
            .setFooter(`Servidores de ${client.user?.username}`)
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
        }
    }
};
//# sourceMappingURL=servers.js.map