Passages = new Meteor.Collection('passages');

Meteor.methods({
    highlight: function(word_class, passageId) {
	var passage = Passages.findOne(passageId);

	if (!passage)
	    throw new Meteor.Error(422, 'Post not found');

	Passages.update(passage._id, {
	    $addToSet: {wordHighlights: word_class}
	});
    }
});
