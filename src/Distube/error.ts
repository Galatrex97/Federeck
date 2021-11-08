
import { TextChannel } from "discord.js";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "error",
run: async (error: Error) => {
    console.log(error)
}
}