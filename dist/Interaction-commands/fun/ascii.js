"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const figlet_1 = __importDefault(require("figlet"));
exports.Interaction = {
    name: "ascii",
    description: "Muestra un texto en formato ASCII",
    options: [
        {
            name: 'text',
            description: 'Texto a convertir',
            type: 'STRING',
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
        let str = interaction.options.getString("text");
        if (str.length > 15) {
            return interaction.followUp("El texto no puede sobrepasar los 15 carácteres para evitar errores.");
        }
        (0, figlet_1.default)(str, (err, data) => interaction.followUp("```" + data + "```"));
    },
};
//# sourceMappingURL=ascii.js.map