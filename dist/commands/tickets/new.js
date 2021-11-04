"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parent_1 = __importDefault(require("../../models/parent"));
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'new-ticket',
    category: 'Soporte',
    aliases: [],
    description: 'Esto abrirá un ticket para resolver inconvenientes, problemas y/o dudas.',
    usage: 'new',
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let logchannel = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(channel => channel.name === `ticket-logs`);
        let data = yield parent_1.default.findOne({ guildId: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id });
        if (!data)
            data = yield new parent_1.default({ guildId: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id });
        if (!data.parentId)
            return message.channel.send(`No has establecido una categoría para los tickets. Usa ${p}ticket-setup.`);
        let category = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.channels.resolve(data.parentId);
        if (category.type !== "GUILD_CATEGORY")
            return message.reply("Necesitas volver a configurar los tickets ya que la categoria ha dejado de existir o no es válida, usa " + p + "setup para configurar los tickets e nuevo.");
        data.save();
        if (!((_f = (_e = message.guild) === null || _e === void 0 ? void 0 : _e.me) === null || _f === void 0 ? void 0 : _f.permissions.has("MANAGE_CHANNELS")))
            return message.reply("No puedo. intenta ponerme un rol con el permiso **Gestionar Canales**");
        if (!logchannel) {
            (_g = message.guild) === null || _g === void 0 ? void 0 : _g.channels.create('ticket-logs', {
                permissionOverwrites: [
                    {
                        id: (_h = message.guild) === null || _h === void 0 ? void 0 : _h.roles.everyone,
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
        }).then((channel) => __awaiter(void 0, void 0, void 0, function* () {
            if (logchannel)
                logchannel.send(`Ticket de ${message.author} creado. <#${channel.id}>`);
            message.reply(`Se ha creado el ticket correctamente, ve a ${channel} para ver tu ticket`);
            channel.send(`Hola ${message.author}, Bienvenido/a a tu ticket! Se paciente, Nos contactaremos contigo lo más pronto posible, Si quieres cerrar este ticket utiliza: \`${p}close-ticket\``);
        })).catch(error => {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
        });
    }),
};
// to add a custom role copy this and paste it as explained in the video and replace role-id with the role ya want :D
// {
//					id: message.guild.roles.cache.get("role-id"),
//					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
//				}
