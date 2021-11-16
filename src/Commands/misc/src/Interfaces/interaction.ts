import Client from "../Client";
import { CommandInteraction, ContextMenuInteraction } from "discord.js";

interface Run {
  (client: Client, interaction: CommandInteraction, args?: string[]);
}

export interface interactionCommand {
  name: string;
  description: string;
  args?: string[];
  options?: Array<object>;
  run: Run;
}