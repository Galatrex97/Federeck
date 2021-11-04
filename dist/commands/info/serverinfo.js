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
const discord_js_1 = __importDefault(require("discord.js"));
module.exports = {
    name: "serverinfo",
    aliases: ["sv-info"],
    usage: 'serverinfo/sv-info',
    category: 'Info',
    description: 'Muestra la información del server',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const owner = (yield message.guild.fetchOwner()).user;
        let server = message.guild; //definimos server
        let serverSi = (_a = server === null || server === void 0 ? void 0 : server.premiumSubscriptionCount) === null || _a === void 0 ? void 0 : _a.toString();
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
        let serverIcon = server === null || server === void 0 ? void 0 : server.iconURL();
        let serverName = server === null || server === void 0 ? void 0 : server.name;
        const embed = new discord_js_1.default.MessageEmbed()
            .setTitle("**Información del server**")
            .setDescription("**Información actual del server**")
            .setThumbnail(serverIcon)
            .setAuthor(serverName, serverIcon)
            .addField('**ID**', server === null || server === void 0 ? void 0 : server.id, true)
            .addField('**Fecha de creación**', `${server === null || server === void 0 ? void 0 : server.joinedAt}`)
            .addField("**Región:**", regions[server.preferredLocale])
            .addField("**Dueño del server:**", `${owner}`)
            .addField("** ID del dueño :**", `${owner.id}`)
            .addField(`**Canales**: ${server === null || server === void 0 ? void 0 : server.channels.cache.size}ㅤㅤ`, `Categorias:  ${server.channels.cache.filter(x => x.type === "GUILD_CATEGORY").size}\nTexto: ${server.channels.cache.filter(x => x.type === "GUILD_TEXT").size} \nVoz: ${server.channels.cache.filter(x => x.type === "GUILD_VOICE").size}`, true)
            .addField('**Miembros**', server === null || server === void 0 ? void 0 : server.memberCount.toString(), true)
            .addField("**Bots**", `${(_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.filter(m => m.user.bot).size}`)
            .addField('**Emojis**', `${(_c = message.guild) === null || _c === void 0 ? void 0 : _c.emojis.cache.size}`)
            .addField('**Boosts**', serverSi)
            .addField('**Nivel de verificación**', `${nya[server === null || server === void 0 ? void 0 : server.verificationLevel]}`)
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
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    })
};
