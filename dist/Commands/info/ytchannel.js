"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const zjuqn_1 = require("zjuqn");
exports.command = {
    name: "ytchannel",
    aliases: ["ytchan"],
    dev: true,
    category: "Info",
    description: "Busca un canal de YouTube y te muestra sus estadísticas",
    usage: "ytchannel <canal>",
    run: async (client, message, args) => {
        let canalName = args.join(" ");
        if (!canalName) {
            return message.reply("Por favor, escribe un canal.");
        }
        let ñ = new zjuqn_1.youtubeChannelInfo({
            message: message,
            color: "WHITE",
            channelName: canalName
        });
        try {
            ñ.send();
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            console.log(err);
        }
    }
};
//# sourceMappingURL=ytchannel.js.map