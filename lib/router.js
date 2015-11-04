Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});

Router.route('/about');
Router.route('/events');
Router.route('/feedback');
Router.route('/party');
Router.route('/events/:_id', {
    template: 'eventPage',
    data: function(){
        var eventId = this.params._id;
        return Events.findOne({ _id: eventId });
    }
});