Template.mainLayout.helpers({
	'username':function(){
		
		if(!Meteor.user())
			return "Sign In"
		else 
			return Meteor.user().username;
	}
});