"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "bugreport",
    aliases: ["console", "bug", "reportbug", "report-bug", "bug-report"],
    usage: 'console/bugreport/bug/reportbug/report-bug/bug-report',
    category: 'Útil',
    description: '...',
    run: (client, message, args) => {
        const a = args.join(" ");
        if (!a)
            return message.reply("Que bug quieres reportar?");
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('Nuevo reporte de bug')
            .setColor("WHITE")
            .setFooter("Mmm")
            .setTimestamp()
            .setDescription(`El usuario **${message.author.tag}** ha reportado un bug desde el server **${message.guild?.name}**.\nEl bug reportado es el siguiente: **${a}**`);
        try {
            client.users.cache.get(`${process.env.botOwner}`)?.send({ embeds: [embed] });
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
        message.reply(`Tu bug se ha reportado correctamente y estará en revisión muy pronto.`);
    }
};
//# sourceMappingURL=console.js.map