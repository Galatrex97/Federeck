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
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    process.on('uncaughtException', (error, origin) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(chalk_1.default.blue('----- Uncaught exception -----'));
        console.log(error.stack);
        console.log(chalk_1.default.blue('----- Exception origin -----'));
        console.log(origin);
        let errmsg = new discord_js_1.MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp()
            .setColor("WHITE");
        yield client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
    }));
    process.on('unhandledRejection', (reason, promise) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(chalk_1.default.blue('----- Unhandled Rejection at -----'));
        console.log(promise);
        console.log(chalk_1.default.blue('----- Reason -----'));
        console.log(reason);
        let errmsg = new discord_js_1.MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${reason}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp()
            .setColor("WHITE");
        yield client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
    }));
});
