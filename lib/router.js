Router.configure({
    layoutTemplate: 'layout',
loadingTemplate: 'loading',
//  waitOn: function() { return 
  waitOn: function() { 
      return [
	  Meteor.subscribe('userHighlights'),
	  Meteor.subscribe('passages')
      ]
  }
});

console.log('new router file');

Router.map(function() {
    this.route('passagesList', {path: '/'});
    this.route('onePassage', { 
	path: '/passages/:_id',
	template: 'passageHighlight',
	data: function() { return Passages.findOne(this.params._id); }
    });
    this.route('viewPassage', { 
	path: '/passage-view/:_id',
	template: 'passageView',
	data: function() { 
	    return Passages.findOne(this.params._id);
	}
    });
    this.route('about', {
	template: 'about'
    });
    this.route('passageSubmit', {
	path: 'submit'
    });
});

Router.before(function() { clearErrors() });
