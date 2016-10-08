import { Session } from 'meteor/session';

import { Meteor } from 'meteor/meteor';

Template.chat.onCreated(function(){

	Session.set('activeGuild', null);

	this.autorun( ()=>{    			    	    	    
		
		let user = Meteor.user();

		if(user && user.profile && user.profile.guilds){

			let guilds = user.profile.guilds;

			for(let i = 0; i < guilds.length; i++){

				Meteor.subscribe('guilds', guilds[i].guildId);

				Meteor.subscribe('chat', guilds[i].guildId, user.username);			
			}	
		}

	});  	

});