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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const canvacord_1 = __importDefault(require("canvacord"));
exports.command = {
    name: "ytcomment",
    aliases: [],
    usage: 'ytcomment <args>',
    category: 'Fun',
    description: '"comenta" algo en yt',
    run: async (client, message, args) => {
        const comment = args.join(''); // definimos el comentario a poner
        if (!comment)
            return message.reply(`Que quieres comentar?`); // si el usuario no indica ningun comentario dice que lo pongas ;)
        try {
            let yt = await canvacord_1.default.Canvacord.youtube({ "avatar": message.author.displayAvatarURL({ format: "png", size: 4096 }), "username": message.author.username, "content": args.join(" ") }); // generamos la foto, podemos canviar el user a lo que queramos
            let enviar = new discord_js_1.default.MessageAttachment(yt, 'comentario.png'); // generamos el Attachment para enviarlo
            message.reply({ files: [enviar] }); // finalmente lo enviamos, se puede puede poner en embed si lo deseas.
        }
        catch (err) { // si hay un error lo loguea en la consola
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            console.log("Ha ocurrido un error."); // logeamos en caso de error
        }
        /*
        Bien ahora se puede hacer otra cosa y es con await messages cojer la foto, el user y el contenido. Quedaria mejor.
        10 likes y lo subo ;)
        */
    }
};
//# sourceMappingURL=ytcomment.js.map