
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "error",
run: async (channel, error) => {
    channel.send(`Ha ocurrido un error: **${error}**`)
}
}