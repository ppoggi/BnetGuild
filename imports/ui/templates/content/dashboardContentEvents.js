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
	},

	'click .compose-message': function(e){
		e.preventDefault();

		if($('#compose-message-row').hasClass('hidden')){

			$('#compose-message-row').removeClass('hidden');

		}else{

			$('#compose-message-row').addClass('hidden');
		}
	},

	'click #display-guild-members': function(e){
		e.preventDefault();
		
		if($('#guild-member-list').hasClass('hidden')){

			$('#guild-member-list').removeClass('hidden');
			$('#display-guild-members').removeClass('fa-toggle-off').addClass('fa-toggle-on');

		}else{

			$('#guild-member-list').addClass('hidden');
			$('#display-guild-members').removeClass('fa-toggle-on').addClass('fa-toggle-off');
		}
	},

	'submit #message-board-form': function(e){
		e.preventDefault();

		let guild = Session.get('activeGuild');		
		let subject = e.target['message-subject'].value;
		let text = e.target.message.value;
		let date =  new Date();		

		let message = {

			guildId   : guild,
			subject   : subject,
			message   : text,
			timestamp : date,
			active    : true
		}
		
		Meteor.call('writeToBoard', message);

		e.target['message-subject'].value = '';
		e.target.message.value = '';
	
		$('#compose-message-row').addClass('hidden');

		
	}

});