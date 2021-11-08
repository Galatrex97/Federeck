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
    name: "backupinfo",
    aliases: ["infobackup", "infocloud"],
    usage: 'backupinfo',
    category: 'Mod',
    description: 'Muestra la infomación de una backup',
    run: (client, message, args) => {
        //Codigo
        let backupID = args[0];
        if (!backupID) {
            return message.channel.send("Debes proporcionar el ID de una backup");
        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
            let embed = new discord_js_1.default.MessageEmbed()
                .setAuthor("Información dde la backup")
                // Display the backup ID
                .addField("Backup ID", backupInfos.id, false)
                // Displays the server from which this backup comes
                .addField("Server ID", backupInfos.data.guildID, false)
                // Display the size (in mb) of the backup
                .addField("Tamaño", `${backupInfos.size} mb`, false)
                // Display when the backup was created
                .addField("Creada el", formatedDate, false)
                .setColor("#FF0000");
            message.reply({ embeds: [embed] });
        }).catch((err) => {
            // if the backup wasn't found
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            return message.channel.send("No se ha encontrado una backup con la ID `" + backupID + "`!");
        });
    }
};
//# sourceMappingURL=backupinfo.js.map