"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Collection, Client, Message } = require('discord.js');
class Klar extends Client {
    constructor() {
        super({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'] });
        // String sería el nombre del comando, en la parte que haces el set, y Command debería ser una interfaz o clase, pero mejor interfaz, de las cosas que tengan cada comando, por ejemplo name: 'hola', run: ...
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
