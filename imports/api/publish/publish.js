Meteor.publish('guilds',function(guildId){

	if(!guildId || guildId == '' )
		return;

	let guild = Guilds.find({_id: guildId});

	return guild;
});


Meteor.publish( 'messageBoard', function(guildId){

	if(!guildId || guildId == '' )
		return;

	let messageBoard = messageBoard.find({guildId: guildId});

	return messageBoard;
});


