"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "say-c",
    aliases: ["sc"],
    category: 'Útil',
    usage: 'say-c/sc',
    description: 'Este comando hace que yo diga algo en un canal especifico (tienes que mencionar el canal obviamente).',
    run: (client, message, args) => {
        var _a;
        let perms = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR");
        if (!perms)
            return message.channel.send("No tienes los permisos requeridos para usar este comando.");
        let canal = message.mentions.channels.first();
        if (!canal)
            return message.channel.send("Debes mencionar un canal eh");
        let texto = args.slice(1).join(" ");
        if (texto.includes("@everyone") && !perms)
            return message.reply("No, simplemente no.").then(e => {
                setTimeout(() => {
                    e.delete();
                }, 7000);
            });
        if (texto.includes("@here") && !perms)
            return message.reply("No, simplemente no.").then(e => {
                setTimeout(() => {
                    e.delete();
                }, 7000);
            });
        if (!texto)
            return message.channel.send("Debes escribir algo.");
        message.delete().catch(() => null);
        try {
            canal.send(texto);
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    }
};
