import { Meteor } from 'meteor/meteor';

Template.userProfile.events({
	'click #create-guild-button': function(e){
		e.stopImmediatePropagation();

		

		let guildName = $('#create-guild-input').val();


		$('#create-guild-input').val("")

		Meteor.call('createGuild', guildName, function(err, message){

			if(err)
				console.log(err)

			if(message)
				console.log(message)

		});

	},

	'submit #edit-gmotd': function(e){
		e.preventDefault();

		let message = e.target.message.value;

		e.target.message.value = '';

		Meteor.call('editGuildMessage', message);
	},

	'submit #edit-guild-details':function(e){

		e.preventDefault();

		let message = e.target.message.value

		e.target.message.value = '';

		Meteor.call('editGuildDetails', message);


	}
})