"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const google_translate_1 = __importDefault(require("@iamtraction/google-translate"));
const discord_js_1 = require("discord.js");
exports.Interaction = {
    name: "translate",
    description: "Traduce un texto a el idioma destino.",
    options: [
        {
            name: 'to',
            description: 'El idioma destino (El idioma al que se traducirá el texto).',
            type: 'STRING',
            choices: [
                {
                    name: "Arabic/Árabe",
                    value: "ar"
                },
                {
                    name: "Catalan",
                    value: "ca"
                },
                {
                    name: "Chinese Traditional/Chino Tradicional",
                    value: "zh-cn"
                },
                {
                    name: "Chinese Simplified/Chino Simplificado",
                    value: "zh-tw"
                },
                {
                    name: "Croatian/Croata",
                    value: "hr"
                },
                {
                    name: "English/Inglés",
                    value: "en"
                },
                {
                    name: "French/Francés",
                    value: "fr"
                },
                {
                    name: "German/Alemán",
                    value: "de"
                },
                {
                    name: "Dutch/Holandés",
                    value: "nl"
                },
                {
                    name: "Italian/Italiano",
                    value: "it"
                },
                {
                    name: "Japanese/Japonés",
                    value: "ja"
                },
                {
                    name: "Korean/Coreano",
                    value: "ko"
                },
                {
                    name: "Polish/Polaco",
                    value: "pl"
                },
                {
                    name: "Portuguese/Portugués",
                    value: "pt"
                },
                {
                    name: "Russian/Ruso",
                    value: "ru"
                },
                {
                    name: "Serbian/Serbio",
                    value: "sr"
                },
                {
                    name: "Spanish/Español",
                    value: "es"
                },
                {
                    name: "Turkish/Turco",
                    value: "tr"
                },
                {
                    name: "Vietnamese/Vietnamita",
                    value: "vi"
                }
            ],
            required: true
        },
        {
            name: "texto",
            description: "Texto a traducir",
            type: "STRING",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
        let text = interaction.options.getString("texto");
        let lang = interaction.options.getString("to");
        (0, google_translate_1.default)(text, { to: lang }).then(res => {
            let embed = new discord_js_1.MessageEmbed() //Me gusta usar embeds xd
                .setTitle('Traductor')
                .addField('Texto a traducir:', text)
                .addField('Traducción:', res.text)
                .setFooter("Traducción gracias a Google Translate")
                .setColor('WHITE'); //Un console log por si las dudas
            interaction.followUp({ embeds: [embed] }); //Se envia el embed
        });
    },
};
//# sourceMappingURL=translate.js.map