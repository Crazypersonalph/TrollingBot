import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume music'),
	async execute(interaction) {
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = getVoiceConnection(member.voice.channel.guildId);
		connection.state.subscription.player.unpause();
		interaction.reply('Resumed the music');

	},
};