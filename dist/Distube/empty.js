"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distubeEvent = void 0;
const discord_js_1 = require("discord.js");
exports.distubeEvent = {
    name: "empty",
    run: async (client, queue) => {
        try {
            queue.textChannel?.send("No hay nadie en el canal de voz, así que me voy a salir.");
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            console.log(err);
        }
    }
};
//# sourceMappingURL=empty.js.map