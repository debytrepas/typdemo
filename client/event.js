Template.event.events({
	"submit #chatform": function(event){
		
		event.preventDefault();
		
		var eventname = $("#eventname").val();
		var eventdate = $("#eventdate").val();
		console.log(eventname);
	
		$("#eventname").val("");
		$("#eventdate").val("");

		var profile = Meteor.user().profile;
		
		var chatline = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				eventname:eventname,
				likes:0,
				when: eventdate
			};
			
		console.dir(chatline);
		
		ChatLines.insert(chatline);
	}
});

Template.event.helpers({
	chatlines: function(){
		return ChatLines.find({},{limit:10, sort:{when:-1}});
	},
	numchats: function(){
		return ChatLines.find().count();
	}
});

Template.eventitem.events({
	"click #like": function () {
      likes = this.likes+1;
      ChatLines.update(this._id, {
        $set: {likes:likes}
      });
    },
	"click #dislike": function () {
      likes = this.likes-1;
      ChatLines.update(this._id, {
        $set: {likes:likes}
      });
    }
});
