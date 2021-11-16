import { MessageEmbed } from 'discord.js';
import { Event } from "../Interfaces";

export const event: Event = {
name: "interactionCreate",
run: async (client, interaction) => {


		if(interaction.isCommand()) {

interaction.deferReply();

			const cmd = client.interactionz.get(interaction.commandName); //This obtains the name of the command from the collection interactionz of client.
			if(!cmd) return;


					const args = Array<string>();

					for (let option of interaction.options.data) {
							if (option.type === "SUB_COMMAND") {
									if (option.name) args.push(option.name);
									option.options?.forEach((x) => {
											if (x.value) args.push(x.value);
									});
							} else if (option.value) args.push(option.value);
					}
					interaction.member = interaction.guild.members.cache.get(interaction.user.id);
					try {
					cmd.run(client, interaction, args);
					} catch (err) {
						console.log(err)


						 

					}
			}
	
}
}