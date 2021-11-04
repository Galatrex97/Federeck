"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Distube = require('distube');
const Monitor = require('ping-monitor');
const { Collection, Client, Intents } = require('discord.js');
class Klar extends Client {
    constructor() {
        super({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'] });
        this.bruh = "null";
        this.distube = new Client({ intents: 32767 });
        this.commands = new Collection();
        this.aliases = new Collection();
        this.interactionz = new Collection();
        this.snipes = new Map();
    }
    ;
    setup() {
        require('./cdistube')(this);
        require('./handlers/command')(this);
        require('./handlers/events')(this);
        require("./routes/index")(this);
        require('./monitor')(this);
        require("./handlerer")(this);
        require('./handlers/interactions')(this);
        require('./handlers/distube')(this);
        this.login(process.env.token);
    }
    ;
}
exports.default = Klar;
