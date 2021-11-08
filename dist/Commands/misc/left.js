"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "left",
    description: "Muestra los servidores restantes para la verificación",
    category: "Misceláneo",
    usage: "left",
    aliases: [],
    async run(client, message, args) {
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
    }
};
//# sourceMappingURL=left.js.map