import { Session } from 'meteor/session';

Template.dashboardContent.helpers({

	guildAbout: function(){

		let currentGuild = Session.get('activeGuild');

		let guild = Guilds.findOne({_id:currentGuild});

		if(!guild)
			return;

		return guild.details;
	}
});