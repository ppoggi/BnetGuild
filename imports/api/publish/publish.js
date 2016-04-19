Meteor.publish('guilds',function(guildId){

	let guild = Guilds.find({_id: guildId});

	return guild;
});


