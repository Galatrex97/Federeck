"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "queue",
    aliases: [],
    category: 'Música',
    usage: 'queue',
    description: 'Muestra la lista de reproducción',
    run: async (client, message, args) => {
        let queue = await client.distube.getQueue(message);
        if (!queue) {
            return message.channel.send("No hay nada reproduciéndose");
        }
        let embed = new discord_js_1.MessageEmbed()
            .setTitle("Lista de reproducción actual")
            .setDescription("En la siguiente lista está(n) la(s) canción(es) reproduciéndose y su posición actual: \n" + queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n"))
            .setColor("WHITE");
    }
};
//# sourceMappingURL=queue.js.map