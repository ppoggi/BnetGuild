Meteor.methods({

	createGuild: function(guildName){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CreateCuild','Must be logged in to create a guild');

		if(user.profile.guildOwner != '')
			throw new Meteor.Error('Cannot create more than 1 guild', 'Too many guilds');


		let guildCheck = Guilds.findOne({guildName:guildName});

		console.log(guildCheck)

		if(guildCheck)
			return {message: "A gulid already exists with that name", color: "yellow"};

		let guild = {};

		guild.guildName     = guildName;
		guild.master        = user.username;
		guild.officers      = [];
		guild.adventurers   = []; 
		guild.peons         = [];		
		guild.details       = '';
		guild.messageOfTheDay = "Welcome to "+guildName+"!";

		let guildId = Guilds.insert(guild);		
		
		if(!guildId)
			return {message: "Error Creating Guild", color: "red"};

		let selector = {_id:Meteor.user()._id};
		
		let action = {$set: {'profile.guildOwner': guildId}, $push:{'profile.guilds':{guildName:guildName, guildId: guildId}}};

		let status = Meteor.users.update(selector, action);

		if(status == 1){
			return {message: "Guild Created Succesfully", color: "green"};
		}else{
			
			Guilds.remove({_id:guildId});
			return {message: "Error Creating Guild", color: "red"};
		}
			
	},

	editGuildMessage: function(message){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('Must be logged in');

		Guilds.update({_id: user.profile.guildOwner}, {$set: {messageOfTheDay: message}}, function(err){
			if(err)
				throw new Error(err);
		});
	},

	editGuildDetails: function(message){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('Must be logged in');

		Guilds.update({_id: user.profile.guildOwner}, {$set: {details: message}}, function(err){
			if(err)
				throw new Error(err);
		});
	}
});