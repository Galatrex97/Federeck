"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distubeEvent = void 0;
exports.distubeEvent = {
    name: "playSong",
    run: async (client, queue, song) => {
        try {
            queue.textChannel?.send(`Reproduciendo: **${song.name}** - **${song.formattedDuration}**`);
        }
        catch (err) {
            console.log(err);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
        }
    }
};
//# sourceMappingURL=playSong.js.map