Template.carpool.events({
	"submit #driverform": function(event){
		
		event.preventDefault();
		
		var contactname = $("#contact").val();
		var eventname = $("#eventname").val();
		var date_time = $("#date_time").val();
		var passenger_count = $("#passenger_count").val();
		var quads = $("#quads").val();
		var info = $("#info").val();
		var phone_number = $("#phone_number").val();
		var email = $("#email").val();
	
		$("#contact").val("");
		$("#eventname").val("");
		$("#date_time").val("");
		$("#passenger_count").val("");
		$("#type").val("");
		$("#organizer").val("");
		$("#phone_number").val("");
		$("#email").val("");
		
		var profile = Meteor.user().profile;
		
		var carpool = {
				userId:Meteor.userId(), 
				driver: contactname, 
				date_time: date_time,
				quad:quads,
				eventname:eventname,
				attendance:[],
				passenger_count:passenger_count,
				info:info,
				phone_number: phone_number,
				email:email
			};
		console.dir(carpool);
		Carpool.insert(carpool);
	}
});

Template.carpool.helpers({
	driversList: function(){
		return Carpool.find({},{sort:{date_time:-1}});
	    },

	numdrivers: function(){
		return Carpool.find().count();
	},
	username: function () {
		var profile = Meteor.user().profile;
		return profile.firstName+" "+profile.lastName;
	}
});

Template.driver.helpers({
	attendance_count: function () {
		return this.attendance.length;
	},
	authorized: function () {
		return this.userId == Meteor.userId();
	}
});

Template.driver.events({
	"click #attendButton": function () {
      var attendance = this.attendance;
      var index = attendance.indexOf(Meteor.userId());
      if (index < 0) {
      	attendance.push(Meteor.userId());
      }
      Carpool.update(this._id, {
  		$set: {attendance:attendance}
  	  });
    },

	"click #notattendButton": function () {
	  var attendance = this.attendance;
      var index = attendance.indexOf(Meteor.userId());
      if (index >= 0) {
      	attendance.splice(index, 1);
      }
      Carpool.update(this._id, {
  		$set: {attendance:attendance}
  	  });
    },
    "click #delete": function () {
    	Carpool.remove(this._id);
    }
});

Template.carpool.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});