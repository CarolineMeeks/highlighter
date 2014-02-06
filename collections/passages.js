Passages = new Meteor.Collection('passages');

Meteor.methods({
    highlight: function(word_class, passageId, action) {
	var passage = Passages.findOne(passageId);
	
	if (!passage) {
	    throw new Meteor.Error(422, 'Post not found');
	} else {

	    console.log(action + word_class);
	    if (action == 'add') {
		console.log('about to addToSet');
		Passages.update(passage._id, {
		    $addToSet: {wordHighlights: word_class}
		});
	    } else if (action == 'remove') {
		console.log('about to remove');
		Passages.update(passage._id, {
		    $pullAll:  {wordHighlights: [word_class]}
		});
	    } else {
		throw new Meteor.Error(422, 'action not add or remove');
	    };    
	};
    }
});
