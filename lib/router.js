Router.configure({
    layoutTemplate: 'layout',
loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('passages'); }

});

Router.map(function() {
    this.route('passagesList', {path: '/'});
    this.route('onePassage', { 
	path: '/passages/:_id',
	data: function() { return Passages.findOne(this.params._id); }
    });
});
