"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "addrole",
    aliases: [],
    usage: 'addrole <@role> <@user>',
    category: 'Mod',
    description: 'Añade un rol al miembro mencionado',
    run: (client, message, args) => {
        if (!message.member?.permissions.has("ADMINISTRATOR"))
            return message.reply("No puedes hacer esto.");
        if (!message.guild?.me?.permissions.has("MANAGE_ROLES"))
            return message.reply("No tengo el permiso para **Gestionar Roles**");
        let role = message.mentions.roles.first();
        let member = message.mentions.members?.first() || message.guild.members.cache.get(args[1]);
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
            console.log(err);
        }
    }
};
//# sourceMappingURL=addrole.js.map