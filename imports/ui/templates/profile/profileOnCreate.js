Template.userProfile.onCreated(function(){

	this.autorun(()=>{

		let user = Meteor.user();

		if(user && user.profile && user.profile.guildOwner){

			if(user.profile.guildOwner != ""){
				
				Meteor.subscribe('guilds', user.profile.guildOwner);
			}
				
		}
	});

});