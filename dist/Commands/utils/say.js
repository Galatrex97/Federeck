"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "say",
    aliases: ["d"],
    category: 'Útil',
    usage: 'say/d',
    description: 'Este comando hace que yo diga algo en el canal en el que se ejecuto el comando',
    run: async (client, message, args) => {
        function is_url(str) {
            let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        let roleMention = message.mentions.roles.first();
        let texto = args.join(' ');
        if (["@everyone", "@here"].includes(texto) && !message.member?.permissions.has("ADMINISTRATOR"))
            return message.reply("Para mencionar debes tener el permiso de Administrador.").then(nya => {
                nya.delete();
            });
        if (roleMention && !message.member?.permissions.has("ADMINISTRATOR")) {
            return message.reply("Para mencionar debes tener el permiso de Administrador.");
        }
        if (!message.member.permissions.has("ADMINISTRATOR") && (is_url(texto) === true))
            return message.reply("Para mencionar debes tener el permiso de Administrador.");
        if (!texto)
            return message.channel.send("Debes escribir algo...");
        if (message.guild?.mfaLevel === "NONE") {
            message.delete();
        }
        try {
            message.channel.send(texto);
        }
        catch (e) {
            console.log(e);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setColor("WHITE")
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
        }
    }
};
//# sourceMappingURL=say.js.map