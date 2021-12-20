import { Client, Collection, Message } from "discord.js";
import { Command, interactionCommand, interactionMenu } from "../Interfaces";
import { runAll } from "../Utils/runner";
import { Player } from "discord-music-player";
import * as dotenv from "dotenv";
import prefixSchema from "../Models/prefix";
let defaultPrefix = process.env.prefix || "k!";

dotenv.config();

class Lyon extends Client {
  constructor() {
    super({
      intents: 6027,
      partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER", "USER"],
    });
  }
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public cooldowns: Collection<any, any> = new Collection();
  public snipes = new Map();
  public prefix = async function(message: Message) {
    let custom: any;
    let data = await prefixSchema
      .findOne({ Guild: message.guild?.id })
      .catch((err: any) => console.log(err));
  
    if (data) {
      custom = data.Prefix;
    } else {
      custom = defaultPrefix;
    }
    return custom;
  }
  public player = new Player(this, {
    deafenOnJoin: true,
    leaveOnEmpty: true,
    leaveOnEnd: true,
    leaveOnStop: true,
    timeout: 3000,
    volume: 100,
    quality: "high",
    ytdlRequestOptions: {
      headers: {
        'Cookie': process.env.youtubeCookie
      }
    }
  });

  public nevermind = async function (client: Client, str: string) {
await (client.channels.cache.get("921234267365867561") as any).send({
      content: str
  })

  return "El mensaje se envió correctamente."

  }
  
  public slashCommands: Collection<string, interactionCommand> =
    new Collection();
  public contextMenus: Collection<string, interactionMenu> = new Collection();
  public setup() {
    this.login(process.env.token);
    runAll(this);
    return this;
  }
}

export default Lyon;
