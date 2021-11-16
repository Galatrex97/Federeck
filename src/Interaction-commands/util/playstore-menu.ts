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
  run: async (client: Klar, interaction: CommandInteraction) => {
    let busqueda = interaction.options.getString("app");

    if (!busqueda) {
      return interaction.followUp("Ha ocurrido un error.");
    }

    play
      .search({
        term: busqueda,
        num: 1,
      })
      .then((aa) => {
        play
          .app({
            appId: aa[0].appId,
            lang: "es",
          })
          .then(async (gg) => {
            const numb = gg.reviews;

            function separator(numb: number) {
              let str = numb.toString().split(".");
              str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              return str.join(".");
            }

            let jaj = moment(gg.updated).locale("es").fromNow();

            const row = new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId("asd")
                .setStyle("PRIMARY")
                .setLabel("Descripción completa"),
              new MessageButton()
                .setURL(gg.url)
                .setStyle("LINK")
                .setLabel("App URL"),
              new MessageButton()
                .setURL(gg.developerWebsite)
                .setStyle("LINK")
                .setLabel("Sitio web de " + gg.title)
            );

            const embed = new MessageEmbed()
              .setColor("WHITE")
              .setTitle("Aplicación")
              .setThumbnail(gg.icon)
              .addField("Nombre", gg.title, true)
              .addField("Puntuación", `${gg.scoreText} ⭐`, true)
              .addField("Resumen", gg.summary, true)
              .addField("Reseñas", `${separator(numb)}`, true)
              .addField("Descargas", gg.installs, true)
              .addField(
                "Precio",
                `${gg.priceText.replace("Free", "Gratis")}`,
                true
              )
              .addField("ID (Nombre del paquete)", gg.appId, true)
              .addField("Actualizado", gg.updated ? jaj : "No hay datos", true)
              .addField("Género", `${gg.genre}`, true)
              .addField(
                "Creado el",
                gg.released
                  ? `${gg.released} (${moment(
                      new Date(
                        gg.released
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
                `${gg.description.split(".")[0].slice(0, 256)}.`
              )
              .addField(
                "Creador",
                "Nombre: " +
                  gg.developer +
                  "\n" +
                  "Gmail: " +
                  gg.developerEmail +
                  "\n" +
                  "Dirección: " +
                  `${gg.developerAddress || "No hay datos"}` +
                  "\n" +
                  "ID: " +
                  gg.developerId
              )
              .addField(
                "Novedades",
                `${
                  gg.recentChanges
                    ? gg.recentChanges
                        .replace(/<br>/g, "\n")
                        .replace(/&quot;/g, `"`)
                    : "No hay datos"
                }`
              )
              .setFooter("Encontré la aplicación")
              .setTimestamp();
            let ñnt: any = await interaction.followUp({
              embeds: [embed],
              components: [row],
            });

            const desc = new MessageEmbed()
              .setColor("WHITE")
              .setTitle(`Descripcion completa de ${gg.title}`)
              .setDescription(`${gg.description}`)
              .setThumbnail(gg.icon);

            const collector = ñnt.createMessageComponentCollector({});

            collector.on("collect", (interactionxd) => {
              interactionxd.deferUpdate();

              const id = interactionxd.customId;
              if (id === "asd") {
                interactionxd.user.send({ embeds: [desc] });
                ñnt.channel.send(
                  `${interaction.user} he enviado la descripción completa de la aplicación ${gg.title} a tu MD`
                );
              }
            });
          })
          .catch((error) => {
            interaction.followUp(
              "Ha ocurrido un error con la búsqueda: " + busqueda
            );

            let errmsg = new MessageEmbed()
              .setTitle("Ha ocurrido un error")
              .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
              .setThumbnail(
                `https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`
              )
              .setFooter("Tipico")
              .setTimestamp()
              .setColor("WHITE");

            console.log(error);
          });
      });
  },
};
