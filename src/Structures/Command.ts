import Lyon from "../Client";
import { Message, Permissions, PermissionString } from "discord.js";
import { CommandOptions } from "../Interfaces";

class BaseCommand {
  name: string;
  aliases: Array<string>;
  description: string;
  usage: string;
  cooldown: number;
  category: string;
  devOnly: boolean;
  botPerms?: Array<PermissionString>;
  userPerms?: Array<PermissionString>;
  guildOnly: boolean;

  constructor(options: CommandOptions) {
    this.name = options.name || "";
    this.aliases = options.aliases || [];
    this.description =
      options.description ||
      "No ha sido asignada descripción alguna a este comando.";
    this.usage =
      options.usage ||
      "No han sido asignadas instrucciones de uso para este comando.";
    this.cooldown = options.cooldown || 0;
    this.category = options.category || "";
    this.devOnly = options.devOnly || false;
    this.botPerms = options.botPerms || [];
    this.userPerms = options.userPerms || [];
    this.guildOnly = options.guildOnly || false;
  }
  run: any = async (client: Lyon, message: Message, args, p?: string) => {
    try {
      this.run(client, message, args, p);
    } catch (e) {
      console.log(e);
    }
  };
}

export default BaseCommand;
