"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const math_expression_evaluator_1 = __importDefault(require("math-expression-evaluator")); // Este NPM es con el que se podrá hacer los calculos
const discord_js_1 = __importDefault(require("discord.js"));
exports.command = {
    name: "math",
    aliases: ["Útil"],
    usage: 'math <args>',
    category: 'Útil',
    description: 'Una calculadora para resolver operaciones matematicas de forma sencilla.',
    run: async (client, message, args) => {
        const embed = new discord_js_1.default.MessageEmbed()
            .setColor(`WHITE`);
        if (!args[0]) {
            embed.setFooter("Por favor escribe una \`expresión\`.");
            return await message.reply({ embeds: [embed] }); // Devuelve un mensaje si es que ejecuta el comando sin nada
        }
        let resultado;
        try {
            resultado = math_expression_evaluator_1.default.eval(args.join(" ")); // El Args toma el calculo
        }
        catch (e) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${e}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
        }
        embed.addField("Entrada:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
            .setTitle("Calculadora de Lyon")
            .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
        await message.channel.send({ embeds: [embed] });
    }
};
// Finaliza el código
// Cualquier duda, lean la doc de la NPM 
//# sourceMappingURL=math.js.map