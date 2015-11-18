Meteor.methods({
  deleteEvent: function (eventId) {
    Comments.remove({eventId:eventId});
    Events.remove(eventId);
    Carpool.remove(eventId);
  }
});