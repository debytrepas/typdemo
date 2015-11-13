Template.eventPage.events({
	"submit #eventpageform": function(event){
		
		event.preventDefault();
		
		var x = $("#eventPage").val()
		
		$("#eventPage").val("");

		var profile = Meteor.user().profile;
		
		var feedback = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				eventPage: x,
				when: new Date()
			};
					
		Feedbacks.insert(eventPage);
	}
});

Template.eventPage.helpers({
	eventPage: function(){
		return eventPage.find({},{limit:10, sort:{when:-1}});
	},
	numeventpages: function(){
		return eventPage.find().count();
	}
});