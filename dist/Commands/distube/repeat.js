"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "repeat",
    aliases: [],
    category: 'Música',
    usage: 'repeat 0/1/2',
    description: 'Cambia al modo repetición. El modo 1 repite la canción actual, el 2 la lista de reproducción entera y el 0 apaga este modo.',
    run: async (client, message, args) => {
        let guildQueue = await client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        let parsedString = parseInt(args[0]);
        let mode = client.distube.setRepeatMode(message, parsedString);
        mode = mode ? mode == 2 ? "Repetir playlist" : "Repetir canción" : "Apagado";
        message.channel.send("El modo de repetición actual es: `" + mode + "`");
    }
};
//# sourceMappingURL=repeat.js.map