import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

Template.chat.events({
	
	'submit #chat-input' : function(e){
		e.preventDefault();
		
		let username = Meteor.user().username;
		let userId   = Meteor.user()._id;

		let activeGuild = Session.get('activeGuild');
		
		let message = e.target.chatInput.value;

		e.target.chatInput.value = "";

		let date = new Date();

		let obj = {
			
			chatId: activeGuild,
			userId: userId,
			user:username,
			message: message,
			time:date
		}
		
		Meteor.call('submitChatMessage', obj);								
		
	},

	'click #accept-invite':function(e){
		e.preventDefault();

		Meteor.call('acceptGuildInvite', this, function(err, message){
			if(err)
				console.log(err)
			if(message)
				console.log(message)
		});

	},

	'click #decline-invite':function(e){
		e.preventDefault();

		Meteor.call('declineGuildInvite', this);
	},

	'click .guild-list-item':function(e){
		e.preventDefault();
		Session.set('activeGuild', this._id);
	}
});