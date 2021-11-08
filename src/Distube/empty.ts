import { Queue } from "distube";
import { MessageEmbed } from "discord.js";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "empty",
run: async(client, queue) => {

queue.textChannel?.send("No hay nadie en el canal de voz, así que me voy a salir.")
   
 }
}