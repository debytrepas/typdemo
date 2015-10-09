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
				eventname:eventname,
				eventdate: eventdate,
				eventlocation: eventlocation 

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
		return ChatLines.find().count();
	    },

	brandeisian: function(){
		//var ee = Meteor.user().services.google.email;
		var ee = Meteor.user().emails[0].address;
		return ee.substring(ee.length-13) == "@brandeis.edu";
	     }
})