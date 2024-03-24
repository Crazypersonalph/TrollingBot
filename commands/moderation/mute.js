import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord.js';
import ms from 'ms';

export default {
    data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a member')
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be muted (timed out)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for muting')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('time')
				.setDescription('How long they will be muted for (eg, 1d, 1m, 1s, 1ms)')
				.setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		try {
		let reason;
		const time = interaction.options.getString('time');

		const member = interaction.guild.members.cache.get(user.id);
		const timeinMs = ms(time);
		if (!timeinMs) return await interaction.followUp('Please specify a valid time');
		if (interaction.options.getString('reason') == '') {
			reason = 'No reason specified';

		}
		else {
			reason = interaction.options.getString('reason');
		}
		await member.timeout(timeinMs, reason);
		await interaction.reply(`Muted (timed-out) ${user} for reason ${reason} and for ${time} long`);
		}
		catch (error) {
			console.log(error)
			await interaction.reply('<@'+user+'>' + ' has a higher role than you (or you entered an input wrong)');
		}
	},
}