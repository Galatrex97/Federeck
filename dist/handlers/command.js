"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ascii_table_1 = __importDefault(require("ascii-table"));
// Crea una tabla ascii
let table = new ascii_table_1.default("Cmds");
table.setHeading("Commandos", "Estado");
module.exports = (client) => {
    // Lee los comandos en subcarpetas
    (0, fs_1.readdirSync)(__dirname.replace("\handlers", "\commands")).forEach(dir => {
        // Filtro de archivos .js
        const commands = (0, fs_1.readdirSync)(`${__dirname.replace("\handlers", "\commands")}/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`${__dirname.replace("\handlers", "\commands")}/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            }
            else {
                table.addRow(file, `❌  -> falta el nombre`);
                continue;
            }
            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(table.toString());
};
