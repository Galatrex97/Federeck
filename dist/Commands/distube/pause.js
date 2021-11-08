"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "pause",
    aliases: ["ps"],
    category: 'Música',
    usage: 'pause/ps',
    description: 'Pausa la canción que se está reproduciendo.',
    run: async (client, message, args) => {
        const serverQueue = await client.distube.getQueue(message);
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz para usar el cmd");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo");
        if (!serverQueue)
            return message.channel.send("No hay canciones reproduciéndose...");
        if (serverQueue.paused)
            return message.channel.send("La canción ya había sido pausada...");
        try {
            client.distube.pause(message);
            message.channel.send("La canción ha sido pausada.");
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
            console.log(err);
        }
    }
};
//# sourceMappingURL=pause.js.map