import { Queue } from "distube"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "finish",
run: async(client, queue) => {
queue.textChannel?.send("No hay más canciones para reproducir, abandonaré el canal.")

}
}