import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Yeet them out of the server')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be kicked')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for kicking the user')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		try{
		let reason;
		if (interaction.options.getString('reason') == '') {
			reason = 'No reason specified';

		}
		else {
			reason = interaction.options.getString('reason');
		}
		await interaction.guild.members.kick(user);
		await interaction.reply(`Kicked ${user} for ${reason}`);
	}
	catch (error) {
		await interaction.reply('<@'+user+'>' + ' has a higher role than you (or you entered an input wrong)');
	}
	},
}