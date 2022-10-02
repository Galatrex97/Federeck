import { TextChannel } from "discord.js";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
  name: "error",
  run: async (error: Error, queue) => {
    console.log(error);
  },
};
