"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const figlet_1 = __importDefault(require("figlet"));
let cooldown = new Set();
exports.command = {
    name: "ascii",
    aliases: [],
    usage: 'ascii',
    category: 'Misceláneo',
    description: '',
    run: (client, message, args) => {
        if (cooldown.has(message.author.id)) {
            message.reply(`Hey ${message.author} espera 7seg antes de volver a usar el comando`);
            return;
        }
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 7000);
        let si = args[0];
        if (!si)
            return message.reply("¿Y el Texto?");
        if (si.length > 15)
            message.reply("El texto no puede contener más de 15 Caracteres");
        (0, figlet_1.default)(si, (err, data) => message.reply("```" + data + "```"));
    }
};
//# sourceMappingURL=ascii.js.map