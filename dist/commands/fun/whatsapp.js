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
const canvas_1 = require("canvas");
module.exports = {
    name: "whatsapp",
    aliases: ["wa"],
    usage: '',
    category: 'Fun',
    description: 'wasaaaa',
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let users;
        if (message.mentions.users.first()) {
            users = (_a = message.mentions.users.first()) === null || _a === void 0 ? void 0 : _a.id;
        }
        else if (args[0]) {
            users = args[0];
        }
        else {
            users = message.author.id;
        }
        let user = yield client.users.fetch(users);
        const avatar = yield (0, canvas_1.loadImage)(user.displayAvatarURL({ format: "png", size: 4096 }));
        const canvas = (0, canvas_1.createCanvas)(800, 800);
        const ctx = canvas.getContext("2d");
        const background = yield (0, canvas_1.loadImage)("https://cdn.discordapp.com/attachments/788657156428660757/836802519639392296/PicsArt_04-27-09.59.41.png");
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer(), `${user.username}_whatsapp.png`);
        message.channel.send({ files: [attachment] });
    })
};
