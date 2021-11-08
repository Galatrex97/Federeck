"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "volume",
    aliases: ["vol"],
    category: 'Música',
    usage: 'volume/vol',
    description: 'Cambia el volumen 😐',
    run: async (client, message, args) => {
        let guildQueue = await client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        const nya = args[0];
        let parsedNya = parseInt(nya);
        if (isNaN(parsedNya)) {
            return message.reply("Me pasó mañana.").then(() => message.react("<a:xdd:841332542220927016>"));
        }
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz...");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        try {
            client.distube.setVolume(message, parsedNya);
            message.react("<a:vale:798231883024433163>");
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            message.reply("No hay nada reproduciendose.");
        }
    }
};
//# sourceMappingURL=volume.js.map