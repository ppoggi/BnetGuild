Meteor.publish('guilds',function(guildId){

	if(!guildId || guildId == '' )
		return;

	let guild = Guilds.find({_id: guildId});

	return guild;
});


Meteor.publish( 'messageBoard', function(guildId){

	if(!guildId || guildId == '' )
		return;	

	let messageBoard = MessageBoard.find({guildId: guildId, active:true});

	return messageBoard;
});


