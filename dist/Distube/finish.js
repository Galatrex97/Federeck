"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distubeEvent = void 0;
exports.distubeEvent = {
    name: "finish",
    run: async (client, queue) => {
        try {
            queue.textChannel?.send("No hay más canciones para reproducir, abandonaré el canal.");
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
//# sourceMappingURL=finish.js.map