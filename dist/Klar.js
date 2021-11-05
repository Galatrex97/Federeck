"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Collection, Client, Message } = require('discord.js');
const Distube = __importStar(require("distube"));
class Klar extends Client {
    constructor() {
        super({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'] });
        // String sería el nombre del comando, en la parte que haces el set, y Command debería ser una interfaz o clase, pero mejor interfaz, de las cosas que tengan cada comando, por ejemplo name: 'hola', run: ...
        this.commands = new Collection();
        this.aliases = new Collection();
        this.distube = new Distube.default(Client, {
            emitNewSongOnly: true,
            searchSongs: 1,
            leaveOnStop: true,
            leaveOnFinish: true,
            leaveOnEmpty: true,
            youtubeCookie: process.env.youtubeCookie,
            customFilters: {
                "8d": "apulsator=hz=0.075"
            }
        });
        this.interactionz = new Collection();
        this.snipes = new Map();
    }
    ;
    setup() {
        require('./handlers/command')(this);
        require('./handlers/events')(this);
        require('./handlers/interactions')(this);
        require('./handlers/distube')(this);
        this.login(process.env.token);
    }
    ;
}
exports.default = Klar;
