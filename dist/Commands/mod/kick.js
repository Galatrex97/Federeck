"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "kick",
    aliases: ["pg"],
    category: 'Mod',
    usage: 'kick/pg',
    description: 'Expulsa a alguien del server.',
    run: async (client, message, args) => {
        let owner = (await message.guild.fetchOwner()).user.id;
        let perms = message.member?.permissions.has("KICK_MEMBERS");
        if (!perms)
            return message.reply("No tienes los permisos requeridos para **Expulsar miembros**");
        const user = message.mentions.members?.first();
        if (!user)
            return message.reply("Debes mencionar a alguien");
        if (user.id === message.author.id)
            return message.reply("Es enserio? :neutral_face:");
        if (user.id === client.user?.id)
            return message.reply('😔');
        if (user.id === owner)
            return message.reply("No se puede kickear al dueño del servidor. XD?");
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0)
            return message.reply("No puedes banear a esa persona por que tiene un mayor o igual rango que tú.");
        let reason = args.slice(1).join(' ');
        if (!reason) {
            reason = 'No especificado';
        }
        try {
            user.kick(reason);
        }
        catch (err) {
            console.log(err);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
        }
        message.reply(`El usuario **${user}** fue expulsado por **${reason}**\nModerador: **${message.author}**`);
    }
};
//# sourceMappingURL=kick.js.map