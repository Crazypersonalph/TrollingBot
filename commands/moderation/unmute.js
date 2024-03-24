import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmute a member')
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be unmuted')
				.setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');

		const member = interaction.guild.members.cache.get(user.id);
		await member.timeout(null, 'Unmuted');
		await interaction.reply(`Unmuted ${user}`);
	},
}