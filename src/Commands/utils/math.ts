import { calculator } from "../../resources";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "math",
  aliases: ["Útil"],
  usage: "math <expresión>",
  cooldown: 3,
  category: "Útil",
  description:
    "Una calculadora para resolver operaciones matematicas de forma sencilla.",

  run: async (client, message, args) => {

    try {
    calculator(message as any, {
      embedColor: "#ffffff",
      credit: false
    });
  } catch (err) {
    console.log(err)
  }
  },
};