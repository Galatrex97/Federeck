"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "delete-ticket",
    aliases: [],
    usage: 'delete',
    category: 'Soporte',
    description: 'Esto borrará el ticket',
    run: (client, message, args) => {
        if (!message.member?.permissions.has("MANAGE_CHANNELS"))
            return message.reply("No puedes hacer esto por la ausencia del permiso **Gestionar Canales**");
        if (!message.guild?.me?.permissions.has("MANAGE_CHANNELS"))
            return message.reply("No puedo hacer esto por la ausencia del permiso **Gestionar Canales**");
        if (message.channel.name.includes('ticket-')) {
            message.channel.delete();
        }
        else if (message.channel.name === 'ticket-logs') {
            return;
        }
        else {
            return message.reply('No puedes usar este comando aqui, úsalo en un ticket.');
        }
    },
};
//# sourceMappingURL=delete.uwu.js.map