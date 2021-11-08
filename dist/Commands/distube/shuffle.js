"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "shuffle",
    aliases: ["aleatorio"],
    category: 'Música',
    usage: 'shuffle/aleatorio',
    description: 'Activa el modo aleatorio de la playlist.',
    run: async (client, message, args) => {
        let guildQueue = await client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz...");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        try {
            client.distube.shuffle(message);
            message.reply("Se ha activado el modo aleatorio.");
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setColor("WHITE")
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
            console.log(err);
        }
    }
};
//# sourceMappingURL=shuffle.js.map