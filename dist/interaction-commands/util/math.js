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
const math_expression_evaluator_1 = __importDefault(require("math-expression-evaluator"));
const discord_js_1 = __importDefault(require("discord.js"));
const discord_js_2 = require("discord.js");
module.exports = {
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
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.default.MessageEmbed()
            .setColor(`WHITE`);
        let calc = interaction.options.getString("expression");
        let resultado;
        try {
            resultado = math_expression_evaluator_1.default.eval(calc); // El Args toma el calculo
        }
        catch (e) {
            let errmsg = new discord_js_2.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
        }
        embed.addField("Entrada:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
            .setTitle("Calculadora de Lyon")
            .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
        yield interaction.followUp({ embeds: [embed] });
    }),
};
