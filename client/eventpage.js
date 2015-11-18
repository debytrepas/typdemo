Template.eventPage.events({
  "submit #commentform": function(event){
    
    event.preventDefault();
    
    var body = $("#comment-body").val();
    
    $("#comment-body").val("");

    var profile = Meteor.user().profile;
    
    var comment = {
        uid:Meteor.userId(),  
        who:profile["firstName"]+" "+profile["lastName"], 
        body:body,
        eventId:this._id,
        when: new Date()
      };    
    Comments.insert(comment);
  }
});

Template.eventPage.helpers({
  comments: function(){
    return Comments.find({eventId:this._id},{sort:{when:-1}});
  },
  numcomments: function(){
    return Comments.find({eventId:this._id},{}).count();
  }
});

Template.currentEvent.helpers({
	attendance_count: function () {
		return this.attendance.length;
	},
	numcomments: function() {
		return Comments.find({eventId:this._id},{}).count();
	}
});

Template.comment.helpers({
  authorized: function(){
    return this.uid==Meteor.userId();
  }
});

Template.currentEvent.events({
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
    }
});
Template.comment.events({
    "click #delete": function () {
      Comments.remove(this._id);
    }
});