import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Return somebody to the light')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

		.addStringOption(option =>
			option.setName('id')
				.setDescription('The id of the person to unban')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getString('id');
		await interaction.guild.members.unban(user);
		await interaction.reply(`Unbanned ${user}`);
	},
}