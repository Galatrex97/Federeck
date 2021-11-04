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
const nya = process.env.botOwner;
module.exports = {
    name: "eval",
    aliases: [],
    usage: 'eval',
    category: 'Misceláneo',
    description: '...',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.id !== nya) {
            let embed = new discord_js_1.default.MessageEmbed() //Creamos el embed
                .setDescription("Mmm, no puedes hacer esto")
                .setColor("WHITE");
            return message.reply({ embeds: [embed] });
        }
        let no = ["process.env", "client.token", "client.destroy", "client.destroy()"];
        let toEval = args.join(" "); //Definimos toEval con argumentos
        if ([no].includes(toEval))
            return;
        if (!toEval) { //Creamos un if para que diga
            let embed = new discord_js_1.default.MessageEmbed()
                .setDescription("Y el code? <a:xdd:841332542220927016>")
                .setColor("WHITE");
            return message.reply({ embeds: [embed] })
                .then((m) => m.delete()).catch(error => {
                console.log(error);
                message.channel.send("Ha ocurrido un error.");
            });
        }
        try {
            if (no.includes(toEval)) {
                return message.reply("No puedes intentar la acción que ingresaste.");
            }
            let evaluated;
            try {
                evaluated = eval(toEval); //"evaluated" va a evaluar el comando
            }
            catch (err) {
                console.log(err);
            }
            if (!args.join(" "))
                return;
            let beautify = require("beautify"); //Se usa beautify para que funcione
            let embed = new discord_js_1.default.MessageEmbed() //Creamos otro embed
                .setColor("WHITE")
                .setTimestamp() //Usamos un Timestamp
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setTitle(`:desktop: ${client.user.username}`)
                .setDescription("Este comando sirve para ejecutar codes")
                .addField("Codigo:", "```js\n" + beautify(args.join(" "), { format: "js" }) + "```")
                .addField("Evaluado:", "```js\n" + evaluated + "```"); //Aca aparecera lo que se evalua
            message.reply({ embeds: [embed] });
        }
        catch (err) { //Hacemos un catch y que defina err
            let beautify = require("beautify");
            let embed2 = new discord_js_1.default.MessageEmbed()
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .addField("Hubo un error con el codigo que evaluaste", "```js\n" + err + "```") //Va a aparecer el error
                .setColor("WHITE");
            return message.reply({ embeds: [embed2] });
        }
    })
};
