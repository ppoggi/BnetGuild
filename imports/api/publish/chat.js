import { Random } from 'meteor/random';

//holds session information
var subs = {};

Meteor.publish('chat', function(chatId, username){
	//get session information and dump it in subs{}
	var subscription = this;

	if(!subs.chatId)
		subs.chatId = {};	
	
	Guilds.update({_id:chatId}, {$push:{online: username}});


	subs.chatId[subscription._session.id] = subscription;

	//remove information form session 
	subscription.onStop(function(){
		
		delete subs.chatId[subscription._session.id];
	});
});


Meteor.methods({

	'submitChatMessage': function(obj){
		
		let chatId = obj.chatId;
		let userId = obj.userId;		
		let id = Random.id();
		
		for(let subscriptionId in subs.chatId){

			let subscription = subs.chatId[subscriptionId];
		
			subscription.added("chat", id, obj);
		}		
	}

});