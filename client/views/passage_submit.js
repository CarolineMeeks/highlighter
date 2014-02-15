Template.passageSubmit.events({
  'submit form': function(e) {
      e.preventDefault();
      var userId = Meteor.userId();
      var passage = {
	  prompt: $(e.target).find('[name=prompt]').val(),
	  title: $(e.target).find('[name=title]').val(),
	  passage: $(e.target).find('[name=passage]').val(),
	  userId: userId
      }
    
      Meteor.call('submit', passage, function(error, id) {
	  if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('passagesList', {_id: error.details})
      } else {
        Router.go('passagesList', {_id: id});
      }
    });
  }
});
