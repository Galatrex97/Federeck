"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const functions_1 = require("../../functions");
const BOT_OWNER = "";
exports.command = {
    name: 'help',
    aliases: ['commands'],
    category: 'Info',
    description: `Muestra la página <Ayuda> o Información sobre un comando especifíco`,
    usage: 'help [comando/categoria]',
    userperms: [],
    botperms: [],
    run: async (client, message, args, p) => {
        if (args.join(' ')) {
            const command = client.commands.get(args.join(' ').toLowerCase()) || client.commands.get(client.aliases?.get(args.join(' ').toLowerCase()));
            if (!command)
                return;
            if (!command.usage) {
                p = "";
            }
            const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setStyle("LINK")
                .setURL("https://discord.gg/rk3FacaS2U")
                .setLabel("Soporte"));
            const h_embed = new discord_js_1.MessageEmbed()
                .setTitle(`Información del comando ${command.name.toString().toLowerCase()}`)
                .setColor('WHITE')
                .setTimestamp()
                .setFooter('Sintaxis: <> = obligatorio, [] = opcional', `${client.user?.avatarURL()}`)
                .setDescription([
                `> **Nombre: \`${command.name}\`**`,
                `> **Categoria: \`${command.category?.toString()}\`**`,
                `> **Descripcion: \`${(0, functions_1.capitalizeFirstLetter)(command.description || 'Este comando no tiene descripción.')}\`**`,
                `> **Uso: \`${p}${command.usage || `No hay instrucciones de uso sobre este comando.`}\`**`,
                `> **Alias: \`${command.aliases?.length ? command.aliases?.map((a) => `${a}`).join('`, `') : 'Ninguno'}\`**`,
                `>  **Aclaraciones: \`No se deben usar los "<>" ni los "[]" puestos abajo o en las instrucciones de uso, son ejemplos.\`**`
            ].join("\n"));
            try {
                return message.reply({ embeds: [h_embed], components: [row] });
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            const general_row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setStyle("LINK")
                .setURL("https://discord.gg/rk3FacaS2U")
                .setLabel("Soporte"));
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Comandos de ${client.user?.username}`)
                .setColor('WHITE')
                .addField(`Comandos de ${client.user?.username} en Total:`, `\`${client.commands.size} Comandos\``)
                .setDescription(`
				El prefix de este server es \`${p}\` recuerda que puedes cambiarlo con \`${p}set-prefix\`
				Para más información en un comando especifíco, escribe \`${p}help <comando>\`.`)
                .setFooter(`${client.user?.username} Help`, `${client.user?.avatarURL()}`)
                .setTimestamp();
            let categories;
            if (message.author.id !== process.env.botOwner) {
                categories = [...new Set(client.commands.filter(command => command.category !== 'Owner').map(command => command.category))];
            }
            else {
                categories = [...new Set(client.commands.map(command => command.category))];
            }
            for (const id of categories) {
                const category = client.commands.filter(command => command.category === id);
                if (id == "NSFW" && !message.channel.nsfw) {
                    embed.addField(`NSFW`, '***\`Para ver los comandos de esta categoria ejecuta este comando en un canal NSFW\`***');
                }
                else {
                    embed.addField(`${id} (${category.size})`, category.map(command => `\`${command.name}\``).join(' '));
                }
            }
            try {
                return message.reply({ embeds: [embed], components: [general_row] });
            }
            catch (err) {
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
    },
};
//# sourceMappingURL=help.js.map