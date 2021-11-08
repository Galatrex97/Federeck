"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'add',
    category: 'Soporte',
    description: 'Añade un usuario a un ticket.',
    aliases: [],
    usage: 'add <@usuario>',
    userperms: ['ADMINISTRATOR'],
    botperms: [],
    run: async (client, message, args, p) => {
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        if (message.channel.name.includes('ticket-')) {
            const member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]) || message.guild?.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
            if (!member) {
                return message.channel.send(`Uso incorrecto! El uso correcto es: \`${p}add @usuario\` (tiene que ser con el arroba, puedes copiarlo de otro canal)`);
            }
            try {
                message.channel.permissionOverwrites.edit(member.user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGE_HISTORY: true,
                }).then(() => {
                    message.channel.send(`${member} fue añadido correctamente a ${message.channel}`);
                });
            }
            catch (e) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${e}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                return message.channel.send('Ha ocurrido un error, vuelve a intentarlo!');
            }
        }
    },
};
//# sourceMappingURL=add.js.map