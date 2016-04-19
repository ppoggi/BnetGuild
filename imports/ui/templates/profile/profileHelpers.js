Template.userProfile.helpers({

	isGM: function(){

		let user = Meteor.user();		

		if( user && user.profile && user.profile.guildOwner != '')
			return true;
		else 
			return false
	},

	messageOfTheDay: function(){

		let guild = Guilds.find({}).fetch();

		if(!guild[0])
			return;

		return guild[0].messageOfTheDay;
	},

	guildDetails: function(){
		let guild = Guilds.find({}).fetch();

		if(!guild[0])
			return;

		return guild[0].details;
	}
});