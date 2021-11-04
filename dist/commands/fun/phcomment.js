"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
module.exports = {
    name: "phcomment",
    aliases: ["hubcomment"],
    usage: 'phcomment/hubcomment <args>',
    category: 'Fun',
    description: 'XDD',
    run: (client, message, args) => {
        let txt = args.join('%20'); //Argumentos
        if ((txt).includes("@"))
            return message.reply("Intenta no mencionar, esto puede provocar errores.");
        if (!txt)
            return message.reply("Olvidaste colocar el comentario."); //Si no hay argumentos...
        let autor = message.author; //Definimos autor
        let attachment = new discord_js_1.default.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${autor.displayAvatarURL()}&text=${txt}&username=${autor.username}&raw=1`, "logo.png"); //Pedimos la imagen
        try {
            message.reply({ files: [attachment] }); //La enviamos
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    } //Fin del codigo :D
};
