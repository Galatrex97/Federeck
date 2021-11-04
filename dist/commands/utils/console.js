"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "bugreport",
    aliases: ["console", "bug", "reportbug", "report-bug", "bug-report"],
    usage: 'console/bugreport/bug/reportbug/report-bug/bug-report',
    category: 'Útil',
    description: '...',
    run: (client, message, args) => {
        var _a;
        const a = args.join(" ");
        if (!a)
            return message.reply("Que bug quieres reportar?");
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('Nuevo reporte de bug')
            .setColor("WHITE")
            .setFooter("Mmm")
            .setTimestamp()
            .setDescription(`El usuario **${message.author.tag}** ha reportado un bug desde el server **${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name}**.\nEl bug reportado es el siguiente: **${a}**`);
        try {
            client.users.cache.get(process.env.botOwner).send({ embeds: [embed] });
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
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
        message.reply(`Tu bug se ha reportado correctamente y estará en revisión muy pronto.`);
    }
};
