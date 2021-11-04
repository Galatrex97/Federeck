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
const fs_1 = require("fs");
const ascii_table_1 = __importDefault(require("ascii-table"));
// Crea una tabla ascii
let table = new ascii_table_1.default("Interacciones");
table.setHeading("Comandos", "Estado");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const gg = Array();
    // Lee los comandos en subcarpetas
    (0, fs_1.readdirSync)(__dirname.replace("\handlers", "\interaction-commands")).forEach(dir => {
        // Filtro de archivos .js
        const commands = (0, fs_1.readdirSync)(`${__dirname.replace("\handlers", "\interaction-commands")}/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`${__dirname.replace("\handlers", "\interaction-commands")}/${dir}/${file}`);
            if (pull.name) {
                client.interactionz.set(pull.name, pull);
                if (["MESSAGE", "USER"].includes(pull.type))
                    delete pull.description;
                gg.push(pull);
                client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                    const guild = client.guilds.cache.get("868962467450085377");
                    yield client.application.commands.set(gg);
                }));
                table.addRow(file, '✅');
            }
            else {
                table.addRow(file, `❌  -> falta el nombre`);
                continue;
            }
        }
    });
    // Log the table
    console.log(table.toString());
});
