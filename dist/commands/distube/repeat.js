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
    name: "repeat",
    aliases: [],
    category: 'Música',
    usage: 'repeat 0/1/2',
    description: 'Cambia al modo repetición. El modo 1 repite la canción actual, el 2 la lista de reproducción entera y el 0 apaga este modo.',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        let mode = yield client.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repetir playlist" : "Repetir canción" : "Apagado";
        message.channel.send("El modo de repetición actual es: `" + mode + "`");
    })
};
