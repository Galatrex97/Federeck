"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "delete-ticket",
    aliases: [],
    usage: 'delete',
    category: 'Soporte',
    description: 'Esto borrará el ticket',
    run: (client, message, args) => {
        var _a, _b, _c;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_CHANNELS")))
            return message.reply("No puedes hacer esto por la ausencia del permiso **Gestionar Canales**");
        if (!((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("MANAGE_CHANNELS")))
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
