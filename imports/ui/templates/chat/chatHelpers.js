import { Meteor } from 'meteor/meteor';

import { Session } from 'meteor/session';

Template.chat.helpers({

	guilds: function(){

		let guilds = Guilds.find({}).fetch();

		if(!guilds[0])
			return;

		if(!Session.get('activeGuild'))
			Session.set('activeGuild', guilds[0]._id)
		
		return guilds;
	},

	activeGuild: function(){

		return Session.get('activeGuild');
	},

	messages: function(activeGuild){
		
		return Chat.find({chatId:activeGuild});
	},

	invite: function(){

		let user = Meteor.user();


		if(user && user.profile && user.profile.invites && user.profile.invites[0])
			return [Meteor.user().profile.invites[0]];

		else 
			return [];
	},

	isActive: function(guild){

		if(guild._id != Session.get('activeGuild'))
			return false;
		else
			return true;
	},

	messageOfTheDay: function(){

		let currentGuild = Session.get('activeGuild');

		let guild = Guilds.findOne({_id:currentGuild});

		if(!guild)
			return;

		return guild.messageOfTheDay;
	}
});