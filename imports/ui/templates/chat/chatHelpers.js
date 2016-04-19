import { Session } from 'meteor/session'

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
	}
});
