"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "addrole",
    aliases: [],
    usage: 'addrole <@role> <@user>',
    category: 'Mod',
    description: 'Añade un rol al miembro mencionado',
    run: (client, message, args) => {
        var _a, _b, _c, _d;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR")))
            return message.reply("No puedes hacer esto.");
        if (!((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("MANAGE_ROLES")))
            return message.reply("No tengo el permiso para **Gestionar Roles**");
        let role = message.mentions.roles.first();
        let member = ((_d = message.mentions.members) === null || _d === void 0 ? void 0 : _d.first()) || message.guild.members.cache.get(args[1]);
        if (!role)
            return message.reply("Debes mencionar un rol.");
        if (!member)
            return message.reply("Debes mencionar un miembro o escribir su id.");
        if (args[0].includes(member))
            return message.reply("Primero menciona el rol y luego el usuario.");
        if (args[1].includes(role))
            return message.reply("Primero menciona el rol y luego el usuario.");
        if (role.managed)
            return message.reply("No se puede re-asignar este rol.");
        if ((role.id).includes(member.roles))
            return message.reply("Este miembro ya tiene este rol.");
        try {
            member.roles.add(role).then(() => message.channel.send(`El rol ${role} ha sido añadido a ${member} con éxito.`).catch(err => console.log(err)));
        }
        catch (err) {
            message.channel.send(`Ha ocurrido un error.`);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    }
};
