Meteor.methods({

	createGuild: function(guildName){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('CreateCuild','Must be logged in to create a guild');

		if(user.profile.guildOwner != '')
			throw new Meteor.Error('Cannot create more than 1 guild', 'Too many guilds');


		let guild = {};

		guild.guildName     = guildName;
		guild.master        = user.username;
		guild.officers      = [];
		guild.adventurers   = []; 
		guild.peons         = [];
		
		guild.details       = '';

		guild.messageOfTheDay = "Welcome to "+guildName+"!";


		let gatheringHall  = {};

		gatheringHall.chat = [];

		gatheringHall.master = user.username;

		Guilds.insert(guild, (err, id)=>{
			if(err){
				throw new Meteor.Error('Could not create guild', err)
			}

			gatheringHall.guildId = id;

			GatheringHall.insert(gatheringHall, (err, status)=>{

				if(err)
					throw new Meteor.Error('Gathering Hall insert', err);

				let selector = {_id:Meteor.user()._id};
				let action = {$set: {'profile.guildOwner': id}, $push:{'profile.guilds':{guildName:guildName, guildId:id}}}

				Meteor.users.update(selector, action, (err, status)=>{

					if(status !=0)
						return {message: "Guild Created Succesfully", color: "green"}

				});

			})

		});

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