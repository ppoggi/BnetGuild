import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

Template.chat.events({
	
	'submit form' : function(e){
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
		
	}
});