import { Event } from "../Interfaces";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isContextMenu()) {
       await interaction.deferReply();
      const contextMenu = client.contextMenus.get(interaction.commandName);
      try {
        if (contextMenu) {
          contextMenu.run(client, interaction);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
};
