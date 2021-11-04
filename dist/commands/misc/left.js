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
module.exports = {
    name: "left",
    description: "Muestra los servidores restantes para la verificación",
    category: "Misceláneo",
    usage: "left",
    aliases: [],
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let si = (75 - client.guilds.cache.size);
            let embed = new discord_js_1.MessageEmbed()
                .setTitle("Servidores restantes")
                .setColor("WHITE")
                .setTimestamp();
            if (si > 75) {
                embed.setDescription("Hemos sobrepasado la meta para solicitar mi verificación.");
                embed.setFooter("Lo hemos logrado, gracias a todos.");
            }
            else if (si === 75) {
                embed.setDescription("Hemos alcanzado la meta, tenemos los 75. Ya puedo solicitar mi verificación.");
                embed.setFooter("Gracias a todos, no lo hubiera logrado sin ustedes.");
            }
            else {
                embed.setDescription(`Faltan \`${si} servidores\` para solicitar mi verificación`);
                embed.setFooter("Ya casi");
            }
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        });
    }
};
