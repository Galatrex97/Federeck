"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "filter",
    aliases: [],
    usage: 'filter <filter>',
    category: 'Música',
    description: 'Coloca un filtro',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            return message.channel.send("Debes estar en un canal de voz...");
        if (((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.voice.channel) && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        const filtrs = args[0];
        try {
            if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(filtrs)) {
                let filter = client.distube.setFilter(message, filtrs);
                message.reply({ content: `Filtro actual:  + (filter || "Apagado")`, allowedMentions: { repliedUser: false } });
            }
        }
        catch (err) {
            message.reply("No hay nada reproduciendose.");
        }
        if (!args[0])
            return message.reply("Debes decir un filtro");
        if (![`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(args[0])) {
            message.reply("Debes enviar un filtro válido (`3d, bassboost, echo, vaporwave, nightcore, karaoke, flanger, gate, haas, reverse, surround, mcompand, phaser, tremolo, earwax`)");
        }
    })
};
