Template.feedbackPage.events({
	"submit #feedbackform": function(event){
		
		event.preventDefault();
		
		var x = $("#feedback").val()
		
		$("#feedback").val("");

		var profile = Meteor.user().profile;
		
		var feedback = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				feedback: x,
				when: new Date()
			};
					
		Feedbacks.insert(feedback);
	}
});

Template.feedbackPage.helpers({
	feedbacks: function(){
		return Feedbacks.find({},{limit:10, sort:{when:-1}});
	},
	numfeedbacks: function(){
		return Feedbacks.find().count();
	}
});