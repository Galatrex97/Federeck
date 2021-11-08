
import { TextChannel } from "discord.js";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "error",
run: async (channel: TextChannel, error: Error) => {
    channel.send(`Ha ocurrido un error: **${error}**`)
}
}