import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user){
	
	user.profile = {};
	user.profile.battleNetId = "";
	user.profile.guilds = [];
	user.profile.guildOwner = "";

	return user;
});
