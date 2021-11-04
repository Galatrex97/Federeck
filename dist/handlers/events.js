"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ascii_table_1 = __importDefault(require("ascii-table"));
// Create a new Ascii table
let table = new ascii_table_1.default("Eventos");
table.setHeading("Eventos", "Estado");
module.exports = (client) => {
    const commands = (0, fs_1.readdirSync)(__dirname.replace("\handlers", "\events")).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        try {
            let pull = require(`${__dirname.replace("\handlers", "\events")}/${file}`);
            if (pull.event && typeof pull.event !== "string") {
                table.addRow(file, `❌ -> Property event should be string.`);
                continue;
            }
            pull.event = pull.event || file.replace(".js", "");
            client.on(pull.event, pull.run.bind(null, client));
            table.addRow(file, '✅');
        }
        catch (err) {
            console.log("Ha ocurrido un error cargando los eventos.");
            console.log(err);
            table.addRow(file, `❌ -> Error`);
        }
    }
    console.log(table.toString());
};
