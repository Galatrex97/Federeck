"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
let cooldown = new Set();
module.exports = {
    name: "clear",
    aliases: ["del", "purge"],
    category: 'Mod',
    usage: 'clear/del <numero de mensajes a borrar>',
    description: 'Elimina los mensajes que quieras',
    run: (client, message, args) => {
        var _a, _b, _c;
        if (cooldown.has(message.author.id)) {
            message.reply(`Hey ${message.author} espera 7seg antes de volver a usar el comando`);
            return;
        }
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 7000);
        let su = message.channel;
        let cantidad = args.join(" ");
        if (!cantidad)
            return message.reply("Debes escribir una cantidad");
        if (isNaN(cantidad))
            return message.reply('Las cantidades tienen que ser números.');
        let a = parseInt(cantidad);
        let perms = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_MESSAGES");
        if (!perms)
            return message.reply("No tienes los permisos requeridos para **Borrar Mensajes**");
        if (a === 0)
            return message.reply("No puedes borrar 0 mensajes");
        if (a < 0)
            return message.reply("No puedes borrar 0 o menos mensajes.");
        if (a > 100)
            return message.reply("No puedes borrar 100 o más mensajes a la vez.");
        if (!((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("MANAGE_MESSAGES")))
            return message.reply("Necesito el permiso **Gestionar Mensajes** para poder ejecutar este comando.");
        su.bulkDelete(a).then(() => {
            if (a === 1) {
                message.channel.send(`**${a}** mensaje borrado.`);
            }
            if (a > 1 && a < 101) {
                return message.channel.send(`**${a}** mensajes borrados`);
            }
        }).catch((error) => {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
