Template.carpool.events({
	"submit #driverform": function(event){
		
		event.preventDefault();
		
		var contactname = $("#contact").val();
		var eventname = $("#eventname").val();
		var date_time = $("#date_time").val();
		var passenger_count = $("#passenger_count").val();
		var type = $("#type").val();
		var info = $("#organizer").val();
		
	
		$("#contact").val("");
		$("#eventname").val("");
		$("#date_time").val("");
		$("#passenger_count").val("");
		$("#type").val("");
		$("#organizer").val("");
		
		var profile = Meteor.user().profile;
		
		var carpool = {
				userId:Meteor.userId(), 
				driver: contactname, 
				date_time: date_time,
				quad:type,
				eventname:eventname,
				attendence:[],
				passenger_count:passenger_count,
				info:info
			};
			console.log("in submit event");
			console.dir(carpool);
		//console.dir(carpool);	
		Carpool.insert(carpool);
	}
});

Template.carpool.helpers({
	driversList: function(){
		return Carpool.find({},{sort:{date_time:-1}});
	    },

	numdrivers: function(){
		return Carpool.find().count();
	}
});

Template.carpool.helpers({
	attendance_count: function () {
		return this.attendance.length;
	},
	authorized: function () {
		return this.userId == Meteor.userId();
	}

	
})

Template.carpool.events({
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