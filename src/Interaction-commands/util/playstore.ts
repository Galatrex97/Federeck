import {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from "discord.js";
import play from "google-play-scraper";
import moment from "moment";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
import { separator } from "../../functions";
export const Interaction: interactionCommand = {
  name: "playstore",
  description: "Busca una aplicación en la playstore",
  options: [
    {
      name: "app",
      type: "STRING",
      description: "Aplicación a buscar",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    let input = interaction.options.getString("app");

    if (!input) {
      return interaction.followUp("Ha ocurrido un error.");
    }

    play
      .search({
        term: input,
        num: 1,
      })
      .then((search) => {
        play
          .app({
            appId: search[0].appId,
            lang: "es",
          })
          .then(async (app) => {
            const numb = app.reviews;

            let relDate = moment(app.updated).locale("es").fromNow();

            const row = new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId("reqAppDesc")
                .setStyle("PRIMARY")
                .setLabel("Descripción completa"),
              new MessageButton()
                .setURL(app.url)
                .setStyle("LINK")
                .setLabel("Instalar"),
              new MessageButton()
                .setURL(app.developerWebsite)
                .setStyle("LINK")
                .setLabel("Sitio web de " + app.title)
            );

            const embed = new MessageEmbed()
              .setColor("WHITE")
              .setTitle("Aplicación")
              .setThumbnail(app.icon)
              .addField("Nombre", app.title, true)
              .addField("Puntuación", `${app.scoreText} ⭐`, true)
              .addField("Resumen", app.summary, true)
              .addField("Reseñas", `${separator(numb)}`, true)
              .addField("Descargas", app.installs, true)
              .addField(
                "Precio",
                `${app.priceText.replace("Free", "Gratis")}`,
                true
              )
              .addField("ID (Nombre del paquete)", app.appId, true)
              .addField("Actualizado", app.updated ? relDate : "No hay datos", true)
              .addField("Género", `${app.genre}`, true)
              .addField(
                "Creado el",
                app.released
                  ? `${app.released} (${moment(
                      new Date(
                        app.released
                          .replace("abr", "apr")
                          .replace("ago", "aug")
                          .replace("ene", "jan")
                          .replace("dic", "dec")
                      )
                    )
                      .locale("es")
                      .fromNow()})`
                  : "No hay datos",
                true
              )
              .addField(
                "Descripción (recortada)",
                `${app.description.split(".")[0].slice(0, 256)}.`
              )
              .addField(
                "Creador",
                "Nombre: " +
                  app.developer +
                  "\n" +
                  "Gmail: " +
                  app.developerEmail +
                  "\n" +
                  "Dirección: " +
                  `${app.developerAddress || "No hay datos"}` +
                  "\n" +
                  "ID: " +
                  app.developerId
              )
              .addField(
                "Novedades",
                `${
                  app.recentChanges
                    ? app.recentChanges
                        .replace(/<br>/g, "\n")
                        .replace(/&quot;/g, `"`)
                    : "No hay datos"
                }`
              )
              .setFooter("Encontré esto")
              .setTimestamp();
            let mainMsg: any = await interaction.followUp({
              embeds: [embed],
              components: [row],
            });

            const appDesc = new MessageEmbed()
              .setColor("WHITE")
              .setTitle(`Descripcion completa de ${app.title}`)
              .setDescription(`${app.description}`)
              .setThumbnail(app.icon);

            const collector = mainMsg.createMessageComponentCollector({});

            collector.on("collect", (mainInteraction) => {
              mainInteraction.deferUpdate();

              const id = mainInteraction.customId;
              if (id === "reqAppDesc") {
                mainInteraction.user.send({ embeds: [appDesc] });
                mainMsg.channel.send(
                  `${interaction.user} he enviado la descripción completa de la aplicación **${app.title}** a tu **MD**`
                );
              }
            });
          })
          .catch((error) => {
            interaction.followUp(
              "Ha ocurrido un error con la búsqueda: " + input
            );
            console.log(error);
          });
      });
  },
};
