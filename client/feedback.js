Template.feedback.events({
	"submit #feedbackform": function(event){
		
		event.preventDefault();
		
		var comments = $("#comments").val();
	
		$("#comments").val("");

		var profile = Meteor.user().profile;
		
		var commentline = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				comments: comments,
				when: new Date()
			};
			
		console.dir(commentline);
		
		CommentLines.insert(commentline);
	}
});

Template.event.helpers({
	commentlines: function(){
		return CommentLines.find({},{limit:10, sort:{when:-1}});
	},
	numcomments: function(){
		return CommentLines.find().count();
	}
});