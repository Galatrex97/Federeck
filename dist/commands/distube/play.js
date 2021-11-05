"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "play",
    aliases: ["p"],
    category: 'Música',
    usage: 'play/p',
    description: 'Reproduce una canción o la añade a la playlist',
    run: (client, message, args) => {
        var _a, _b, _c;
        const song = args.join(" ");
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            return message.channel.send("Debes estar en un canal de voz...");
        if (((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.voice.channel) && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        if (!song)
            return message.channel.send("Debes escribir algo...");
        client.distube.play(message, song);
    }
};
