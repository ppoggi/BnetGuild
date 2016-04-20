Template.mainLayout.helpers({
	'username':function(){
		
		if(!Meteor.user())
			return "Sign In"
		else 
			return Meteor.user().username;
	},

	user: function(){

		return !! Meteor.user();
	},

	authInProgress: function(){

		return Meteor.loggingIn();
	}
});