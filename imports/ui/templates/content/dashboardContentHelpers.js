import { Session } from 'meteor/session';

Template.dashboardContent.helpers({

	guildAbout: function(){

		let currentGuild = Session.get('activeGuild');

		let guild = Guilds.findOne({_id:currentGuild});

		if(!guild)
			return;

		return guild.details;
	},

	message: function(){

		let currentGuild = Session.get('activeGuild');

		let messages = MessageBoard.find({guildId:currentGuild, active:true});

		return messages;
	}

});