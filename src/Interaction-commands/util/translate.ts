import translate from "@iamtraction/google-translate";
import { MessageEmbed } from "discord.js";
import { Client, CommandInteraction } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
import { is_url } from "../../functions";
export const Interaction: interactionCommand = {
  name: "translate",
  description: "Traduce un texto a el idioma destino.",
  options: [
    {
      name: "from",
      description: "El idioma actual del texto. (Su idioma de origen)",
      type: "STRING",
      choices: [
        { 
          name: "Auto-detect/Detectar idioma",
          value: "auto"
        }, 
        {
          name: "Arabic/Árabe",
          value: "ar",
        },
        {
          name: "Catalan",
          value: "ca",
        },
        {
          name: "Chinese Traditional/Chino Tradicional",
          value: "zh-cn",
        },
        {
          name: "Chinese Simplified/Chino Simplificado",
          value: "zh-tw",
        },
        {
          name: "Croatian/Croata",
          value: "hr",
        },
        {
          name: "English/Inglés",
          value: "en",
        },
        {
          name: "French/Francés",
          value: "fr",
        },
        {
          name: "German/Alemán",
          value: "de",
        },
        {
          name: "Dutch/Holandés",
          value: "nl",
        },
        {
          name: "Italian/Italiano",
          value: "it",
        },
        {
          name: "Japanese/Japonés",
          value: "ja",
        },
        {
          name: "Korean/Coreano",
          value: "ko",
        },
        {
          name: "Polish/Polaco",
          value: "pl",
        },
        {
          name: "Portuguese/Portugués",
          value: "pt",
        },
        {
          name: "Russian/Ruso",
          value: "ru",
        },
        {
          name: "Serbian/Serbio",
          value: "sr",
        },
        {
          name: "Spanish/Español",
          value: "es",
        },
        {
          name: "Turkish/Turco",
          value: "tr",
        },
        {
          name: "Vietnamese/Vietnamita",
          value: "vi",
        },
      ],
      required: true
    },
    {
      name: "to",
      description:
        "El idioma destino (El idioma al que se traducirá el texto).",
      type: "STRING",
      choices: [
        {
          name: "Arabic/Árabe",
          value: "ar",
        },
        {
          name: "Catalan",
          value: "ca",
        },
        {
          name: "Chinese Traditional/Chino Tradicional",
          value: "zh-cn",
        },
        {
          name: "Chinese Simplified/Chino Simplificado",
          value: "zh-tw",
        },
        {
          name: "Croatian/Croata",
          value: "hr",
        },
        {
          name: "English/Inglés",
          value: "en",
        },
        {
          name: "French/Francés",
          value: "fr",
        },
        {
          name: "German/Alemán",
          value: "de",
        },
        {
          name: "Dutch/Holandés",
          value: "nl",
        },
        {
          name: "Italian/Italiano",
          value: "it",
        },
        {
          name: "Japanese/Japonés",
          value: "ja",
        },
        {
          name: "Korean/Coreano",
          value: "ko",
        },
        {
          name: "Polish/Polaco",
          value: "pl",
        },
        {
          name: "Portuguese/Portugués",
          value: "pt",
        },
        {
          name: "Russian/Ruso",
          value: "ru",
        },
        {
          name: "Serbian/Serbio",
          value: "sr",
        },
        {
          name: "Spanish/Español",
          value: "es",
        },
        {
          name: "Turkish/Turco",
          value: "tr",
        },
        {
          name: "Vietnamese/Vietnamita",
          value: "vi",
        },
      ],
      required: true,
    },
    {
      name: "texto",
      description: "Texto a traducir",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: CommandInteraction) => {
    let text = interaction.options.getString("texto") as string;
    let lang = interaction.options.getString("to") as string;
    let originLang = interaction.options.getString("from") as string;

  let bool = is_url(text)
  if(bool) {
    return interaction.reply({ content: "No puedes traducir links.", ephemeral: true })
  }

    translate(text, { from: originLang || "auto", to: lang }).then((res) => {
      //Hacemos la función de la API que es la traducirá el texto al idioma que se especifico
      let embed = new MessageEmbed() //Me gusta usar embeds xd
        .setTitle("Traductor")
        .addField("Texto original:", text.split(".")[0].slice(0, 1023))
        .addField("Traducción:", res.text)
        .setFooter("Traducción gracias a Google Translate")
        .setColor("WHITE"); //Un console log por si las dudas

      interaction.reply({ embeds: [embed] }); //Se envia el embed
    });
  },
};
