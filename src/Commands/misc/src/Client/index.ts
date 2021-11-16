import { Client, Collection, Message } from "discord.js"; 
import { Command, interactionCommand, interactionMenu } from "../Interfaces"; 
import { runAll } from "../Utils/runner";
import { Player } from "discord-music-player";
import {  DisTube } from "distube";
import * as dotenv from "dotenv"; 
import prefixSchema from "../Models/prefix"
let prefix = process.env.prefix;
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
  public snipes = new Map();
  public prefix = async function(message: Message) {
    let custom: any;
    const data = await prefixSchema.findOne({ Guild: message.guild?.id })
      .catch((err: any) => console.log(err))
  
    if (data) {
      custom = data.Prefix;
    } else {
      custom = prefix;
    }
    return custom;
  }
/*   public distube = new DisTube(this,{
    emitNewSongOnly: true,
    searchSongs: 1,
    leaveOnStop: true,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    youtubeCookie: process.env.youtubeCookie,
    customFilters: {
        "8d": "apulsator=hz=0.075"
    }
}) */

public player = new Player(this, {
  deafenOnJoin: true,
  leaveOnEmpty: true,
  leaveOnEnd: true,
  leaveOnStop: true,
  timeout: 3000,
  volume: 100,
  quality: "high"
});
public interactionz: Collection<string, interactionCommand> = new Collection();
public interactiony: Collection<string, interactionMenu> = new Collection();
  public init() {
    this.login(process.env.token);
    runAll(this); 
    return this; 
  }
} 

export default Lyon; 
