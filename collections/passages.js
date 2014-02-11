Passages = new Meteor.Collection('passages');

UserHighlights = new Meteor.Collection('userHighlights');

Meteor.methods({
    highlight: function(word_class, passageId, userId, action) {
	console.log('starting highlight ' + word_class + action + ' passageId ' + passageId + ' userId: ' + userId);
	var passage = Passages.findOne(passageId);
	console.log('got passage ' + passage);
	if (!passage) {
	    throw new Meteor.Error(422, 'Post not found');
	}
	var userHighlight = UserHighlights.findOne({userId: userId, passageId: passageId});

	console.log('got userHighlight ', userHighlight);
	if (!userHighlight) {
	    //Assumption here is user is created but this is the first time they have highlighted. I moved this code to the passage_highlight render so it can probably be deleted here.
	    console.log('about to insert into UserHighlights');
	    userHighlight = UserHighlights.insert({userId: userId, passageId: passage._id, wordsHighlighted: []});
	};

	console.log(action + word_class);
	var incWordClass = {};

	if (action == 'add') {
	    incWordClass[word_class] = 1
	    console.log('about to add highlight');
	    Passages.update(passage._id, {$inc: incWordClass});
	    UserHighlights.update(userHighlight._id, {$push: {wordsHighlighted: word_class}});
	} else if (action == 'remove') {
	    incWordClass[word_class] = -1
	    console.log('about to remove');
	    Passages.update(passage._id, {$inc: incWordClass});
	    UserHighlights.update(userHighlight._id, {$pull: {wordsHighlighted: word_class}});
	} else {
	    throw new Meteor.Error(422, 'action not add or remove');
	};    
    }
});
