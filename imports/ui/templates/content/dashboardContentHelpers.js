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
	},

	guildMembers: function(){

		let currentGuild = Session.get('activeGuild');

		let guildMembers = [];

		let guild = Guilds.findOne({_id:currentGuild});

		if(!guild)
			return;

		let master = { rank: "GM", name: guild.master}

		guildMembers.push(master);

		master = null;

		for(officer in guild.officers)
			guildMembers.push({rank: "Officer", name: officer});

		for(adventurers in guild.adventurers)
			guildMembers.push({rank: "Adventurers", name: adventurer});

		for(recruits in guild.peons)
			guild.Members.push({rank: "Recruit", name: recruits})
		
		return guildMembers;

	}

});