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
const discord_nsfw_1 = __importDefault(require("discord-nsfw"));
const nsfw = new discord_nsfw_1.default();
module.exports = {
    name: "real-pussy",
    aliases: ["rpussy"],
    usage: 'real-pussy',
    category: 'NSFW',
    description: 'nya',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        const image = yield nsfw.pussy();
        const embed = new discord_js_1.default.MessageEmbed()
            .setDescription(`Koya afk`)
            .setColor("WHITE")
            .setImage(image);
        message.channel.send({ embeds: [embed] });
    })
};
