import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banish somebody to the underworld')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be banned')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for banning the user')
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
		await interaction.guild.members.ban(user);
		await interaction.reply(`Banned ${user} for ${reason}`);
	}
	catch (error) {
		await interaction.reply('<@'+user+'>' + ' has a higher role than you (or you entered an input wrong)');
	}
	},
}