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
exports.command = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const backup = __importStar(require("discord-backup"));
backup.setStorageFolder(__dirname + "/backups/");
exports.command = {
    name: "backup",
    aliases: ["cloud"],
    usage: 'backup/cloud',
    category: 'Mod',
    description: 'Crea una copia de seguridad del server',
    run: (client, message, args) => {
        //Otra vez vuelvo a subir este comando, por favor, no me lo borren por los comentaios que hay en los codigos, son porque estoy desarrollando un bot en ingles
        //Aparte de eso no olviden instalar el npm de "discord-backup" y crear una carpeta llamda backups
        let guild = message.guild;
        let i = message.guild?.me;
        let perms = message.member?.permissions.has("ADMINISTRATOR");
        if (!perms)
            return message.reply("No tienes el permiso de Administrador como para usar este comando");
        backup
            .create(guild, {
            jsonBeautify: true
        })
            .then(backupData => {
            // And send informations to the backup owner
            message.author.send({ embeds: [
                    new discord_js_1.default.MessageEmbed()
                        .setAuthor(`Backup creada correctamente`)
                        .setColor(i.displayHexColor)
                        .setDescription(`Para cargar esta backup usa ${backupData.id}`)
                        .setThumbnail(message.author.displayAvatarURL())
                ]
            });
            message.channel.send({ embeds: [
                    new discord_js_1.default.MessageEmbed()
                        .setAuthor(`Backup creada correctamente`)
                        .setColor(i.displayHexColor)
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription("**El ID de la backup se ha enviado a tu MD**")
                ] });
        }).catch(error => {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
//# sourceMappingURL=backup.js.map