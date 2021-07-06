const Discord = require("discord.js");//defines discord.js
const client = new Discord.Client();
const db = require("quick.db"); //(VERY IMPORTANT) defines quick.db

client.login("Yourbottoken"); //your lovely token here


client.on('message', message => {
if (message.author.bot) return; //prevent bots from executing commands
const prefix = "!"; //The prefix which Your bot will listen to..

if (message.content.indexOf(prefix) !== 0) return;

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command == "ping"){
message.channel.send("Pong!")
}

if(command == "jointest"){ //to test the join event 
let hdh = db.get(`welcomechannel_${message.guild.id}`); // fetching welcome channel of the server
if(hdh === null){ 
message.channel.send('sorry, you didn\'t set the welcome channel!') //if there is no channel
}

client.emit('guildMemberAdd', message.member); //bot will send message in the welcome channel
}
});

client.on('guildMemberAdd', member => {
	const lon = db.get(`welcomechannel_${member.guild.id}`);{}

	if(lon === null) {
  return;
	}

	const huhh = new MessageEmbed()
  .setAuthor(`${member.user.username}`)
	.setColor('RANDOM')
	.setTitle('New Member Joined!')
	.setDescription(`Welcome to \`${member.guild.name}\` \n **Thank You for joining **\n we are now at \`${member.guild.memberCount}\` members`)
	
	member.guild.channels.cache.get(lon).send(`<@${member.user.id}>`, huhh);
});
