import { Meteor } from 'meteor/meteor';

Meteor.methods({

	guildInvite: function(guildId, newUser){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('Must Be logged in');


		let guild = Guilds.findOne({_id:guildId})

		if(guild.master == user.username || _.indexOf(guild.officers, user.username) != -1){


			if( _.indexOf(guild.officers, newUser) != -1 || _.indexOf(guild.adventurers, newUser) !=-1 || _.indexOf(guild.peons, newUser) != -1){
				return {message: newUser +' is already in your guild', color:'yellow'}
			}

			let invited = Meteor.users.findOne({username: newUser});
			
			if(!invited)
				return {message: 'No user was found with this username', color:'yellow'}
			
			let inviteObj = { guildName: guild.guildName, guildId: guildId, noUsers: guild.officers.length + guild.adventurers.length + guild.peons.length +1}

			Meteor.users.update(invited, {$push:{'profile.invites': inviteObj}});

			return {message:'Invite Sent', color: 'green'};

		}else{

			return {message:'You do not have the privilege to invite someone to the guld', color: 'red'}
		}
	},

	acceptGuildInvite: function(invite){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('Must Be logged in');

		if(user.profile.guilds.length > 5)
			return {message: 'You can only be in 5 guilds', color: 'yellow'}


		let status = Meteor.users.update(user, { $pull: {'profile.invites': invite}, $push: {'profile.guilds': {guildName:invite.guildName, guildId:invite.guildId}}});

		if(status != 1)
			return {message: 'Could Not Accept Invite: Internal error', color: 'yellow'}

		Guilds.update({_id:invite.guildId}, {$push: {peons: user.username}});

	},

	declineGuildInvite: function(invite){

		let user = Meteor.user();

		if(!user)
			throw new Meteor.Error('Must Be logged in');

		let status = Meteor.users.update(user, { $pull: {'profile.invites': invite}});
	}
});