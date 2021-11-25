import { Event } from "../Interfaces";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isContextMenu()) {
       interaction.deferReply();
      const command = client.interactiony.get(interaction.commandName);
      try {
        if (command) {
          command.run(client, interaction);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
