"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
exports.command = {
    name: "serverinfo",
    aliases: ["sv-info"],
    usage: 'serverinfo/sv-info',
    category: 'Info',
    description: 'Muestra la información del server',
    run: async (client, message, args) => {
        const owner = (await message.guild.fetchOwner()).user;
        let server = message.guild; //definimos server
        let serverSi = server?.premiumSubscriptionCount?.toString();
        const nya = {
            "NONE": "Ninguno, ez",
            "LOW": "Bajo",
            "MEDIUM": "Mediano",
            "HIGH": "Alto",
            "VERY_HIGH": "Tryhard"
        };
        const regions = {
            'en-US': 'English (United States)',
            'en-GB': 'English (Great Britain)',
            'zh-CN': 'Chinese (China)',
            'zh-TW': 'Chinese (Taiwan)',
            'pt-BR': 'Portuguese (Brazil)',
            'es-ES': 'Spanish (Spain)',
            'sv-SE': 'Swedish',
            cs: 'Czech',
            da: 'Danish',
            nl: 'Dutch',
            fr: 'French',
            de: 'German',
            el: 'Greek',
            hu: 'Hungarian',
            it: 'Italian',
            ja: 'Japanese',
            ko: 'Korean',
            no: 'Norwegian',
            pl: 'Polish',
            ru: 'Russian',
            tr: 'Turkish',
            bg: 'Bulgarian',
            uk: 'Ukrainian',
            fi: 'Finnish',
            hr: 'Croatian',
            ro: 'Romanian',
            lt: 'Lithuanian',
        };
        let serverIcon = server?.iconURL();
        let serverName = server?.name;
        const embed = new discord_js_1.default.MessageEmbed()
            .setTitle("**Información del server**")
            .setDescription("**Información actual del server**")
            .setThumbnail(serverIcon)
            .setAuthor(serverName, serverIcon)
            .addField('**ID**', server?.id, true)
            .addField('**Fecha de creación**', `${server?.joinedAt}`)
            .addField("**Región:**", regions[server.preferredLocale])
            .addField("**Dueño del server:**", `${owner}`)
            .addField("** ID del dueño :**", `${owner.id}`)
            .addField(`**Canales**: ${server?.channels.cache.size}ㅤㅤ`, `Categorias:  ${server.channels.cache.filter(x => x.type === "GUILD_CATEGORY").size}\nTexto: ${server.channels.cache.filter(x => x.type === "GUILD_TEXT").size} \nVoz: ${server.channels.cache.filter(x => x.type === "GUILD_VOICE").size}`, true)
            .addField('**Miembros**', server?.memberCount.toString(), true)
            .addField("**Bots**", `${message.guild?.members.cache.filter(m => m.user.bot).size}`)
            .addField('**Emojis**', `${message.guild?.emojis.cache.size}`)
            .addField('**Boosts**', serverSi)
            .addField('**Nivel de verificación**', `${nya[server?.verificationLevel]}`)
            .addField('**Roles**', `${server.roles.cache.size}`, true)
            .setColor("WHITE");
        try {
            message.reply({ embeds: [embed] });
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
};
//# sourceMappingURL=serverinfo.js.map