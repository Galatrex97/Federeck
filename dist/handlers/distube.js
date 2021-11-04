"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const Distube = require("distube");
// Create a new Ascii table
let table = new ascii("D-Handler");
table.setHeading("Eventos", "Estado");
module.exports = (client, message) => {
    const commands = readdirSync(__dirname.replace("\handlers", "\distube")).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        try {
            let pull = require(`${__dirname.replace("\handlers", "\distube")}/${file}`);
            if (pull.event && typeof pull.event !== "string") {
                table.addRow(file, `❌ -> Property event should be string.`);
                continue;
            }
            pull.event = pull.event || file.replace(".js", "");
            client.distube.on(pull.event, pull.run.bind(null, client));
            table.addRow(file, '✅');
        }
        catch (err) {
            console.log("Ha ocurrido un error, truly shit bro");
            console.log(err);
            table.addRow(file, `❌ -> Errores del ortooo`);
        }
    }
    console.log(table.toString());
};
