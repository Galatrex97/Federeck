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
const Discord = __importStar(require("discord.js"));
const beautify_1 = __importDefault(require("beautify"));
module.exports = {
    name: "eval",
    description: "Evalúa un code",
    options: [
        {
            name: 'beval',
            description: 'Lo que se evaluará',
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
        let toEval = interaction.options.getString("beval");
        if (interaction.user.id !== process.env.botOwner) {
            let embed = new Discord.MessageEmbed() //Creamos el embed
                .setDescription("Mmm, no puedes hacer esto")
                .setColor("WHITE");
            return interaction.followUp({ embeds: [embed] });
        }
        let noArray = ["process.env", "client.token", "client.destroy", "client.destroy()"];
        try {
            if (noArray.includes(toEval)) {
                return interaction.followUp({ content: "Ni lo intentes", ephemeral: true });
            }
            let evaluated;
            try {
                evaluated = eval(toEval); //"evaluated" va a evaluar el comando
            }
            catch (err) {
                console.log(err);
            } //Se usa beautify para que funcione
            let embed = new Discord.MessageEmbed() //Creamos otro embed
                .setColor("WHITE")
                .setTimestamp() //Usamos un Timestamp
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTitle(`:desktop: ${client.user.username}`)
                .setDescription("Esto fue el resultado de lo que ingresaste")
                .addField("Codigo:", "```js\n" + (0, beautify_1.default)(args.join(" "), { format: "js" }) + "```")
                .addField("Evaluado:", "```js\n" + evaluated + "```"); //Aca aparecera lo que se evalua
            interaction.followUp({ embeds: [embed] });
        }
        catch (err) { //Hacemos un catch y que defina err
            let embed2 = new Discord.MessageEmbed()
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .addField("Hubo un error con el codigo que evaluaste", "```js\n" + err + "```") //Va a aparecer el error
                .setColor("WHITE");
            return interaction.followUp({ embeds: [embed2] });
        }
    }),
};
