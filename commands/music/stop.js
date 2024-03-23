import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop music'),
	async execute(interaction) {
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = getVoiceConnection(member.voice.channel.guildId);
		connection.destroy();
		interaction.reply('Stopped the music');

	},
};