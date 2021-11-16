import Client from "../Client";
import { CommandInteraction, ContextMenuInteraction } from "discord.js";

interface Run {
  (client: Client, interaction: ContextMenuInteraction);
}

export interface interactionMenu {
  name: string;
  type: string;
  run: Run;
}
