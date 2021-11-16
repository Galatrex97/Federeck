import mongoose from "mongoose";
const uri: any = process.env.mongoGOD;
import { Event } from "../Interfaces";
import { ClientPresence } from "discord.js";

export const event: Event = {
  name: "ready",
  run: async (client) => {
    //Defines mongoose

    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Conectado a MongoDB")) //Con esto, hacemos un console.log() para saber que si nos conectamos y todo está bien.
      .catch((err: any) => console.log(err));

    const presencias: any = [
      {
        name: "actualizando code...",
        type: "WATCHING",
      },
      {
        name: "Lyon | v0.4",
        type: "PLAYING",
      },
      {
        name: `${client.guilds.cache.size} servidores`,
        type: "COMPETING",
      },
      {
        name: `Faltan ${
          75 - client.guilds.cache.size
        } servers para solicitar mi verificación`,
        type: "LISTENING",
      },
      {
        name: "El c&p es de perezosos y pringaos que no tienen nada más que hacer que sucumbir al escapismo del copypaste, los que hacen c&p NO tienen derechos y debería recaer sobre ellos todo el peso de la ley. Si tu haces c&p tu opinión no solo no cuenta, sino que voy a pensar automáticamente lo contrario de lo que me digas, en definitiva el c&p es basura y practicarlo es de idiotas.",
        type: "WATCHING",
      },
      {
        name: "k!",
        type: "WATCHING",
      },
      {
        name: "When",
        type: "WATCHING",
      },
      {
        name: "while(true) {\n client.destroy() }",
        type: "PLAYING",
      },
      {
        name: `${client.guilds.cache.reduce(
          (a, b) => a + b.memberCount,
          0
        )} usuarios`,
        type: "WATCHING",
      },
    ];
    //presencias

    setInterval(() => {
      function presence() {
        client.user?.setPresence({
          status: "online",
          activities: [
            presencias[Math.floor(Math.random() * presencias.length)],
          ],
        });
      }
      presence();
    }, 105000);
    console.log("Todo piola");
    console.log("Estoy listo");

    //Con esto hacemos una función para la presencia, que es la actividad, o el estado.

    const fecha = new Date("May 31, 2021");
  },
};
