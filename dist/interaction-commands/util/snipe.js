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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "snipe",
    description: "Mira el último mensaje borrado en este canal o un canal mencionado",
    options: [
        {
            name: 'channel',
            description: 'Ve los mensajes borrados en el canal seleccionado.',
            type: 'CHANNEL',
            required: false
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let chan = interaction.options.getChannel("channel");
        let msg;
        if (chan) {
            msg = yield client.snipes.get(chan.id);
        }
        else {
            msg = yield client.snipes.get((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.id);
        }
        //en esta constante definimos nuestro client.snipes que es nuestro objeto Map, con el metodo .get() tratamos de ver si channel.id(id del canal) esta dentro del Map  
        if (!msg) {
            yield interaction.followUp({ content: "No se ha borrado recientemente ningún mensaje", ephemeral: true });
            //Si no lo esta mandamos este mensaje ^    
        }
        else {
            const main = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setAuthor(`Mensaje Escrito de ${msg.delete.tag}`, msg.delete.displayAvatarURL())
                .addField("Canal", `<#${msg.canal.id}>`)
                .setDescription(`${msg.content}`);
            yield interaction.followUp({ embeds: [main] });
        }
        /*
        Cada Valor esta en el evento messageDelete del cual en el comando los vas a obtener.
        */
    }),
};
