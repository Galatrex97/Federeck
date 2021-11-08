"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distubeEvent = void 0;
exports.distubeEvent = {
    name: "addList",
    run: async (client, queue, playlist) => {
        try {
            queue.textChannel?.send(`Playlist añadida correctamente: **${playlist.name}** con **${playlist.songs.length}** canciones`);
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            console.log(err);
        }
    }
};
//# sourceMappingURL=addList.js.map