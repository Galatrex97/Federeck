import { Client, Collection } from "discord.js";
import { Command, interactionCommand, interactionMenu } from "../Interfaces";
import { runAll } from "../Utils/runner";
import { Player } from "discord-music-player";
import { prx } from "../functions";
import * as dotenv from "dotenv";

dotenv.config();

class Lyon extends Client {
  constructor() {
    super({
      intents: 32767,
      partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
      allowedMentions: {
        parse: [],
      },
    });
  }
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public cooldowns: Collection<any, any> = new Collection();
  public snipes = new Map();
  public prefix = prx
  public player = new Player(this, {
    deafenOnJoin: true,
    leaveOnEmpty: true,
    leaveOnEnd: true,
    leaveOnStop: true,
    timeout: 3000,
    volume: 100,
    quality: "high",
  });
  public interactionz: Collection<string, interactionCommand> =
    new Collection();
  public interactiony: Collection<string, interactionMenu> = new Collection();
  public setup() {
    this.login(process.env.token);
    runAll(this);
    return this;
  }
}

export default Lyon;
