import mongoose from "mongoose";
const uri: any = process.env.mongoGOD;
import { Event } from "../Interfaces";
import { ClientPresence, Presence } from "discord.js";

export const event: Event = {
  name: "ready",
  run: async (client) => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Conectado a MongoDB")) 
      .catch((err: any) => console.log(err));

    const presencesArray: any = [
      {
        name: "Lyon | v0.5-beta",
        type: "PLAYING",
      },
      {
        name: `${client.guilds.cache.size} servidores`,
        type: "COMPETING",
      },
      {
        name: "k!",
        type: "WATCHING",
      },
      {
        name: `${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        )} usuarios`,
        type: "WATCHING",
      },
    ];

    setInterval(() => {
        client.user?.setPresence({
          status: "online",
          activities: [
            presencesArray[Math.floor(Math.random() * presencesArray.length)],
          ],
        });
    }, 105000);
    console.log("Todo piola");
    console.log("Estoy listo");
  },
};
