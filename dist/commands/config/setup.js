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
const parent_1 = __importDefault(require("../../models/parent"));
module.exports = {
    name: 'ticket-setup',
    category: 'Configuración',
    aliases: [],
    description: 'Esto abrirá un ticket para resolver inconvenientes y/o problemas o dudas.',
    usage: 'setup',
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        let idParent = args[0];
        if (!idParent)
            return;
        let data = yield parent_1.default.findOne({ guildId: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id, parentId: idParent });
        if (!data) {
            data = new parent_1.default({ guildId: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, parentId: idParent });
            data.save();
            if (!idParent)
                return message.channel.send(`Necesitas dar el id de una categoría.`);
            let category = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.channels.resolve(idParent);
            if (category.type !== "GUILD_CATEGORY")
                return message.reply("Esa no es una categoria válida");
            message.channel.send("Se ha configurado la categoría para los tickets.");
        }
        if (data) {
            yield parent_1.default.findOneAndDelete({ guildId: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id });
            data = new parent_1.default({ guildId: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id, parentId: idParent });
            if (!idParent)
                return message.channel.send(`Necesitas dar el id de una categoría.`);
            let category = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.channels.resolve(idParent);
            if (category.type !== "GUILD_CATEGORY") {
                return message.reply("Esa no es una categoria válida");
            }
            data.save();
            message.channel.send("Se ha configurado la categoría para los tickets.");
        }
    })
};
