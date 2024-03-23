import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, demuxProbe } from '@discordjs/voice';
import ytdl from 'ytdl-core';

async function probeAndCreateResource(readableStream) {
	const { stream, type } = await demuxProbe(readableStream);
	return createAudioResource(stream, { inputType: type });
}

export default {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The song you want to play')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const url = interaction.options.getString('url');
		const song_info = await ytdl.getInfo(url);
		await interaction.editReply(`Now Playing: ${song_info.videoDetails.title}`);
		const stream = ytdl(url, { filter: 'audioonly' });
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = joinVoiceChannel({
			channelId: member.voice.channelId,
			guildId: member.voice.guild.id,
			adapterCreator: member.voice.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();
		const resource = await probeAndCreateResource(stream);
		connection.subscribe(player);
		player.play(resource);
	},
};