Template.events.events({
	"submit #eventform": function(event){
		
		event.preventDefault();
		
		var eventname = $("#eventname").val();
		var date_time = $("#date_time").val();
		var location = $("#eventlocation").val();
		var organizer = $("#organizer").val();
		var type = $("#type").val();
		var info = $("#info").val();
	
		$("#eventname").val("");
		$("#date_time").val("");
		$("#eventlocation").val("");
		$("#organizer").val("");
		$("#info").val("");
		$("#type").val("");

		var profile = Meteor.user().profile;
		
		var event = {
				userId:Meteor.userId(),  
				organizer:organizer, 
				attendance:[],
				date_time: date_time,
				type:type,
				eventname:eventname,
				location:location,
				info:info
			};
		console.dir(event);	
		Events.insert(event);
	}
});

Template.events.helpers({
	eventsList: function(){
		return Events.find({},{sort:{date_time:-1}});
	    },

	numevents: function(){
		return Events.find().count();
	},

	brandeisian: function(){
		//var ee = Meteor.user().services.google.email;
		var ee = Meteor.user().emails[0].address;
		return ee.substring(ee.length-13) == "@brandeis.edu";
	}
});

Template.event.events({
})

