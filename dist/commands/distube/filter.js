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
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
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
