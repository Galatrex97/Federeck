import { MessageEmbed } from "discord.js";
import { Event } from "../Interfaces";
import { clickBtn } from "../Utils";
import parentSchema from "../Models/parent";
export const event: Event = {
  name: "interactionCreate",
  run: async(client, interaction) => {

const parentParams = {
  guildId: interaction.guild?.id
}

let parentData = await parentSchema.findOne(parentParams) || await parentSchema.create(parentParams);

    clickBtn(interaction, {
      categoryID: parentData.parentId,
      credit: false,
      cooldownMsg: "Ya tienes un ticket abierto, cierralo primero para abrir otro.",
      timeout: false,
      embedColor: "#ffffff",
    });

    if (interaction.isCommand()) {
      interaction.deferReply();

      const cmd = client.interactionz.get(interaction.commandName); //This obtains the name of the command from the collection interactionz of client.
      if (!cmd) return;

      const args = Array<string>();

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      );
      try {
        cmd.run(client, interaction, args);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
