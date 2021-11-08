"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distubeEvent = void 0;
exports.distubeEvent = {
    name: "error",
    run: async (client, error) => {
        console.log(error);
        let errmsg = new (require('discord.js')).MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${error}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp();
    }
};
//# sourceMappingURL=error.js.map