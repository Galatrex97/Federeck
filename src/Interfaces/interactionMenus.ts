import Client from "../Client";
import { CommandInteraction, ContextMenuInteraction, CommandOptionDataTypeResolvable } from "discord.js";

interface Run {
  (client: Client, interaction: ContextMenuInteraction);
}

export interface interactionMenu {
  name: string;
  type: "USER" | "MESSAGE";
  run: Run;
}
