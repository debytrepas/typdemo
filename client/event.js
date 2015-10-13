Template.event.events({
	"submit #eventform": function(event){
		
		event.preventDefault();
		
		var eventname = $("#eventname").val();
		var eventdate = $("#eventdate").val();
		var eventlocation = $("#eventlocation").val();
		console.log(eventname);
	
		$("#eventname").val("");
		$("#eventdate").val("");
		$("#eventlocation").val("");

		var profile = Meteor.user().profile;
		
		var chatline = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				likes:0,
				when: eventdate,
				eventname:eventname,
				eventlocation:eventlocation

				

			};
			
		console.dir(chatline);
		
		ChatLines.insert(chatline);
	}
});

Template.event.helpers({
	chatlines: function(){
		return ChatLines.find({},{limit:100, sort:{when:-1}});
	    },

	numchats: function(){
		return ChatLines.find().count(); HEAD
	},

	brandeisian: function(){
		//var ee = Meteor.user().services.google.email;
		var ee = Meteor.user().emails[0].address;
		return ee.substring(ee.length-13) == "@brandeis.edu";
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
})

