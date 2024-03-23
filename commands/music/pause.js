import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause music'),
	async execute(interaction) {
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = getVoiceConnection(member.voice.channel.guildId);
		connection.state.subscription.player.pause();
		interaction.reply('Paused the music');

	},
};