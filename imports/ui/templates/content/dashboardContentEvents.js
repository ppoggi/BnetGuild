import { Session } from 'meteor/session';

Template.dashboardContent.events({

	'submit #invite-member-form': function(e){
		e.preventDefault();

		let newUser = e.target.username.value;

		if(newUser == '')
			return; 

		e.target.username.value = '';

		let guild = Session.get('activeGuild');

		if(!guild)
			return;


		let message = Meteor.call('guildInvite', guild, newUser, function(err, message){

			if(err)
				console.log(err)
			if(message)
				console.log(message)

		});
		
	}

});