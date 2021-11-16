import Client from "../Client";
import { Message } from "discord.js";

interface Run {
  (
    client: Client,
    message: Message,
    args: string[],
    p?: string,
    guildList?: any
  );
}

export interface Command {
  name: string;
  description: string;
  category: string;
  usage: string;
  dev?: boolean;
  aliases: string[];
  run: Run;
}
