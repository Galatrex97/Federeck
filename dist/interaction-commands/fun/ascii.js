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
const figlet_1 = __importDefault(require("figlet"));
module.exports = {
    name: "ascii",
    description: "Muestra un texto en formato ASCII",
    options: [
        {
            name: 'text',
            description: 'Texto a convertir',
            type: 'STRING',
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        let str = interaction.options.getString("text");
        if (str.length > 15) {
            return interaction.followUp("El texto no puede sobrepasar los 15 carácteres para evitar errores.");
        }
        (0, figlet_1.default)(str, (err, data) => interaction.followUp("```" + data + "```"));
    }),
};
