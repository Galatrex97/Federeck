import math from "math-expression-evaluator"; // Este NPM es con el que se podrá hacer los calculos
import Discord, { Client, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import simplydjs from "simply-djs";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "math",
  aliases: ["Útil"],
  usage: "math <expresión>",
  cooldown: 3,
  category: "Útil",
  description:
    "Una calculadora para resolver operaciones matematicas de forma sencilla.",

  run: async (client, message, args) => {
    simplydjs.calculator(message as any, {
      embedColor: "#ffffff",
      credit: false
    });
  },
};

// Finaliza el código
// Cualquier duda, lean la doc de la NPM
