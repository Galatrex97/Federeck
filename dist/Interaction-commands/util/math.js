"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const math_expression_evaluator_1 = __importDefault(require("math-expression-evaluator"));
const discord_js_1 = __importStar(require("discord.js"));
exports.Interaction = {
    name: "math",
    description: "Calcula una expresión.",
    options: [
        {
            name: 'expression',
            description: 'Expresión a evaluar',
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
        const embed = new discord_js_1.default.MessageEmbed()
            .setColor(`WHITE`);
        let calc = interaction.options.getString("expression");
        let resultado;
        try {
            resultado = math_expression_evaluator_1.default.eval(calc); // El Args toma el calculo
        }
        catch (e) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
        }
        embed.addField("Entrada:", `\`\`\`js\n${calc}\`\`\``, false) // Te da el calculo
            .setTitle("Calculadora de Lyon")
            .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
        await interaction.followUp({ embeds: [embed] });
    },
};
//# sourceMappingURL=math.js.map