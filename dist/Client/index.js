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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const runner_1 = require("../Utils/runner");
const Distube = __importStar(require("distube"));
const dotenv = __importStar(require("dotenv"));
const prefix_1 = __importDefault(require("../Models/prefix"));
let prefix = process.env.prefix;
dotenv.config();
class Lyon extends discord_js_1.Client {
    constructor() {
        super({
            intents: 32767,
            partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
            allowedMentions: {
                parse: [],
            },
        });
    }
    commands = new discord_js_1.Collection();
    aliases = new discord_js_1.Collection();
    snipes = new Map();
    prefix = async function (message) {
        let custom;
        const data = await prefix_1.default.findOne({ Guild: message.guild?.id })
            .catch((err) => console.log(err));
        if (data) {
            custom = data.Prefix;
        }
        else {
            custom = prefix;
        }
        return custom;
    };
    distube = new Distube.default(this, {
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
    interactionz = new discord_js_1.Collection();
    interactiony = new discord_js_1.Collection();
    init() {
        this.login(process.env.token);
        (0, runner_1.runAll)(this);
        return this;
    }
}
exports.default = Lyon;
//# sourceMappingURL=index.js.map