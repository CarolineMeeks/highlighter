Passages = new Meteor.Collection('passages');

Meteor.methods({
    highlight: function(word_class, passageId, action) {
	var passage = Passages.findOne(passageId);
	
	if (!passage)
	    throw new Meteor.Error(422, 'Post not found');
  
	if (action = 'add') {
	    
	    Passages.update(passage._id, {
		$addToSet: {wordHighlights: word_class}
	    });
	} else if (action = 'remove') {
	    Passages.update(passage._id, {
		$pull:  {wordHighlights: word_class}
	    });
	} else {
	    throw new Meteor.Error(422, 'action not add or remove');
	};    
    }
});
