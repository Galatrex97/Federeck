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
// Create a new Ascii table
let table = new ascii_table_1.default("Monitor");
table.setHeading("Eventos", "Estado");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const commands = (0, fs_1.readdirSync)(__dirname.replace("\handlers", "\m-events")).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        try {
            let pull = require(`${__dirname.replace("\handlers", "\m-events")}/${file}`);
            if (pull.event && typeof pull.event !== "string") {
                table.addRow(file, `❌ -> Este evento no tiene nombre.`);
                continue;
            }
            pull.event = pull.event || file.replace(".js", "");
            client.monitor.on(pull.event, pull.run.bind(null, client));
            table.addRow(file, '✅');
        }
        catch (err) {
            console.log("Error with the monitorzzz");
            console.log(err);
            table.addRow(file, `❌ -> Error`);
        }
    }
    console.log(table.toString());
});
