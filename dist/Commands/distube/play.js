"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "play",
    aliases: ["p"],
    category: 'Música',
    usage: 'play/p',
    description: 'Reproduce una canción o la añade a la playlist',
    run: (client, message, args) => {
        const song = args.join(" ");
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz...");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        if (!song)
            return message.channel.send("Debes escribir algo...");
        client.distube.play(message, song);
    }
};
//# sourceMappingURL=play.js.map