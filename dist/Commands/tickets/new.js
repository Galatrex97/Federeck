"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const parent_1 = __importDefault(require("../../Models/parent"));
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'new-ticket',
    category: 'Soporte',
    aliases: [],
    description: 'Esto abrirá un ticket para resolver inconvenientes, problemas y/o dudas.',
    usage: 'new',
    run: async (client, message, args, p) => {
        let logchannel = message.guild?.channels.cache.find(channel => channel.name === `ticket-logs`);
        let data = await parent_1.default.findOne({ guildId: message.guild?.id });
        if (!data)
            data = await new parent_1.default({ guildId: message.guild?.id });
        if (!data.parentId)
            return message.channel.send(`No has establecido una categoría para los tickets. Usa ${p}ticket-setup.`);
        let category = message.guild?.channels.resolve(data.parentId);
        if (category.type !== "GUILD_CATEGORY")
            return message.reply("Necesitas volver a configurar los tickets ya que la categoria ha dejado de existir o no es válida, usa " + p + "setup para configurar los tickets e nuevo.");
        data.save();
        if (!message.guild?.me?.permissions.has("MANAGE_CHANNELS"))
            return message.reply("No puedo. intenta ponerme un rol con el permiso **Gestionar Canales**");
        if (!logchannel) {
            message.guild?.channels.create('ticket-logs', {
                permissionOverwrites: [
                    {
                        id: message.guild?.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    }
                ],
                type: 'GUILD_TEXT',
                parent: data.parentId,
            });
        }
        if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
            return message.reply('Ya tienes un ticket abierto, cierralo y luego vuelve a intentarlo o espera a que nos contactemos contigo');
        }
        message.guild.channels.create(`ticket-${message.author.id}`, {
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
            type: 'GUILD_TEXT',
            parent: data.parentId,
        }).then(async (channel) => {
            if (logchannel)
                logchannel.send(`Ticket de ${message.author} creado. <#${channel.id}>`);
            message.reply(`Se ha creado el ticket correctamente, ve a ${channel} para ver tu ticket`);
            channel.send(`Hola ${message.author}, Bienvenido/a a tu ticket! Se paciente, Nos contactaremos contigo lo más pronto posible, Si quieres cerrar este ticket utiliza: \`${p}close-ticket\``);
        }).catch(error => {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
        });
    },
};
// to add a custom role copy this and paste it as explained in the video and replace role-id with the role ya want :D
// {
//					id: message.guild.roles.cache.get("role-id"),
//					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
//				}
//# sourceMappingURL=new.js.map