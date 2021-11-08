"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionMenu = void 0;
const discord_js_1 = require("discord.js");
const google_play_scraper_1 = __importDefault(require("google-play-scraper"));
const moment_1 = __importDefault(require("moment"));
exports.InteractionMenu = {
    name: "Buscar en playstore",
    type: "MESSAGE",
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
        const msg = await interaction.channel?.messages.fetch(interaction.targetId);
        let busqueda;
        if (msg) {
            busqueda = msg.content;
        }
        else {
            return false;
        }
        if (!busqueda) {
            return interaction.followUp("Ocurrió un error con esa búsqueda");
        }
        google_play_scraper_1.default.search({
            term: busqueda,
            num: 1
        }).then(aa => {
            google_play_scraper_1.default.app({
                appId: aa[0].appId,
                lang: "es"
            }).then(async (gg) => {
                const numb = gg.reviews;
                function separator(numb) {
                    let str = numb.toString().split(".");
                    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    return str.join(".");
                }
                let jaj = (0, moment_1.default)(gg.updated).locale("es").fromNow();
                const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId("asd")
                    .setStyle("PRIMARY")
                    .setLabel("Descripción completa"), new discord_js_1.MessageButton()
                    .setURL(gg.url)
                    .setStyle("LINK")
                    .setLabel("App URL"), new discord_js_1.MessageButton()
                    .setURL(gg.developerWebsite)
                    .setStyle("LINK")
                    .setLabel("Sitio web de " + gg.title));
                const embed = new discord_js_1.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Aplicación")
                    .setThumbnail(gg.icon)
                    .addField("Nombre", gg.title, true)
                    .addField("Puntuación", `${gg.scoreText} ⭐`, true)
                    .addField("Resumen", gg.summary, true)
                    .addField("Reseñas", `${separator(numb)}`, true)
                    .addField("Descargas", gg.installs, true)
                    .addField("Precio", `${gg.priceText.replace("Free", "Gratis")}`, true)
                    .addField("ID (Nombre del paquete)", gg.appId, true)
                    .addField("Actualizado", gg.updated ? jaj : "No hay datos", true)
                    .addField("Género", `${gg.genre}`, true)
                    .addField("Creado el", gg.released ? `${gg.released} (${(0, moment_1.default)(new Date(gg.released.replace("abr", "apr").replace("ago", "aug").replace("ene", "jan").replace("dic", "dec"))).locale("es").fromNow()})` : "No hay datos", true)
                    .addField("Descripción (recortada)", `${gg.description.split(".")[0].slice(0, 256)}.`)
                    .addField("Creador", "Nombre: " + gg.developer + "\n" + "Gmail: " + gg.developerEmail + "\n" + "Dirección: " + `${gg.developerAddress || "No hay datos"}` + "\n" + "ID: " + gg.developerId)
                    .addField("Novedades", `${gg.recentChanges ? gg.recentChanges.replace(/<br>/g, "\n").replace(/&quot;/g, `"`) : "No hay datos"}`)
                    .setFooter("Encontré la aplicación")
                    .setTimestamp();
                let ñnt = await interaction.followUp({ embeds: [embed], components: [row] });
                const desc = new discord_js_1.MessageEmbed()
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
                        ñnt.channel.send(`${interaction.user} he enviado la descripción completa de la aplicación ${gg.title} a tu MD`);
                    }
                });
            }).catch(error => {
                interaction.followUp("Ha ocurrido un error con la búsqueda: " + busqueda);
                console.log(error);
            });
        });
    },
};
//# sourceMappingURL=playstore.js.map