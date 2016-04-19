Template.userProfile.helpers({

	isGM: function(){

		let user = Meteor.user();

		if(user.profile && user.profile.guildOwner != '')
			return true;
		else 
			return false
	},

	messageOfTheDay: function(){


		console.log(this)
		let guild = Guilds.find({}).fetch();

		if(!guild[0])
			return;

		console.log(guild[0].messageOfTheDay);

		return guild[0].messageOfTheDay;
	}
});