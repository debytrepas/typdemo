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
	}
});

Template.event.helpers({
	attendance_count: function () {
		return this.attendance.length;
	},
	authorized: function () {
		return this.userId == Meteor.userId();
	},
	numcomments: function() {
		return Comments.find({eventId:this._id},{}).count();
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
