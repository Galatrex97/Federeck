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
module.exports.run = (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (interaction.isCommand()) {
        interaction.deferReply();
        const cmd = yield client.interactionz.get(interaction.commandName);
        if (!cmd)
            return;
        const args = Array();
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name)
                    args.push(option.name);
                (_a = option.options) === null || _a === void 0 ? void 0 : _a.forEach((x) => {
                    if (x.value)
                        args.push(x.value);
                });
            }
            else if (option.value)
                args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        try {
            cmd.run(client, interaction, args);
        }
        catch (err) {
            console.log(err);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    }
    // Context Menu Handling
    if (interaction.isContextMenu()) {
        yield interaction.deferReply();
        const command = client.interactionz.get(interaction.commandName);
        try {
            if (command) {
                command.run(client, interaction);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
});
