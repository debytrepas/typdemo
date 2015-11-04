Template.feedback.events({
	"submit #feedbackform": function(event){
		
		event.preventDefault();
		
		var x = $("#comments").val()
		
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

Template.feedback.helpers({
	commentlines: function(){
		return ChatLines.find({},{limit:10, sort:{when:-1}});
	},
	numcomments: function(){
		return CommentLines.find().count();
	},
	ofTen: function(){
		var available = CommentLines.find().count();
		if (available > 10)
			return 10;
		else
			return available;
	}
});