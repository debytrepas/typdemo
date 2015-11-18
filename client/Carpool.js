Template.events.events({
	"submit #eventform": function(event){
		
		event.preventDefault();
		
		var eventname = $("#eventname").val();
		var date_time = $("#date_time").val();
		var location = $("#eventlocation").val();
		var organizer = $("#organizer").val();
	
		$("#eventname").val("");
		$("#date_time").val("");
		$("#eventlocation").val("");
		$("#organizer").val("");
		
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
	}
});

Template.event.helpers({
	attendance_count: function () {
		return this.attendance.length;
	},
	authorized: function () {
		return this.userId == Meteor.userId();
	}

	
})

Template.event.events({
	"click #attendButton": function () {
      var attendance = this.attendance;
      var index = attendance.indexOf(Meteor.userId());
      if (index < 0) {
      	attendance.push(Meteor.userId());
      }
      Events.update(this._id, {
  		$set: {attendance:attendance}
  	  });
    },

	"click #notattendButton": function () {
	  var attendance = this.attendance;
      var index = attendance.indexOf(Meteor.userId());
      if (index >= 0) {
      	attendance.splice(index, 1);
      }
      Events.update(this._id, {
  		$set: {attendance:attendance}
  	  });
    },
    "click #delete": function () {
    	Meteor.call("deleteEvent", this._id);
    }
});

Template.events.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});