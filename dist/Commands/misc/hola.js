"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "hola",
    aliases: ["hi"],
    category: 'Misceláneo',
    usage: 'hola/hi',
    description: 'Es enserio? ._.XD',
    run: (client, message, args) => {
        try {
            message.reply(`Hola ${message.member}`);
        }
        catch (err) {
            console.log(err);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
        }
    }
};
//# sourceMappingURL=hola.js.map