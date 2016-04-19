Template.userProfile.events({
	'click #create-guild-button': function(e){
		e.stopImmediatePropagation();

		

		let guildName = $('#create-guild-input').val();


		$('#create-guild-input').val("")

		Meteor.call('createGuild', guildName);

	}
})