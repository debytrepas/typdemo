Template.party.events({
	"submit #partyform": function(party){
		
		event.preventDefault();
		
		var partyname = $("#partyname").val();
		var partydate = $("#partydate").val();
		var partylocation = $("#partylocation").val();
		console.log(eventname);
	
		$("#partyname").val("");
		$("#partydate").val("");
		$("#partylocation").val("");

		var profile = Meteor.user().profile;
		
		var partyline = 
		  	{
				uid:Meteor.userId(),  
				who:profile["firstName"]+" "+profile["lastName"], 
				eventname:partyname,
				eventdate: partydate,
				eventlocation: partylocation 

			};
			
		console.dir(partyline);
		
		PartyLines.insert(partyline);
	}
});

Template.party.helpers({
	chatlines: function(){
		return PartyLines.find({},{limit:100, sort:{when:-1}});
	    },

	numchats: function(){
		return PartyLines.find().count();
	    },


	brandeisian: function(){
		//var ee = Meteor.user().services.google.email;
		var ee = Meteor.user().emails[0].address;
		return ee.substring(ee.length-13) == "@brandeis.edu";
	     }
})