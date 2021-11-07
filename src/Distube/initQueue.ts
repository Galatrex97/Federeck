import { Queue } from "distube";
import Klar from "../Client";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "initQueue",
run: async (client, queue) => {
  queue.autoplay = false; //Defines que no se reproduzcan canciones luego
}
}