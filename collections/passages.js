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

	wordIndex =  userHighlight.wordsHighlighted.indexOf(word_class); //-1 if not in the array, use this to check for doublclicks.

	console.log('acation' + action + word_class + ' index ' + wordIndex);
	var incWordClass = {};

	if (action == 'add' && wordIndex == -1) {
	    incWordClass[word_class] = 1
	    console.log('about to add highlight to userHighlights ' + userHighlight._id);
	    Passages.update(passage._id, {$inc: incWordClass});
	    UserHighlights.update(userHighlight._id, {$addToSet: {wordsHighlighted: word_class}});
	} else if (action == 'remove' && wordIndex >= 0) {
	    incWordClass[word_class] = -1
	    console.log('about to remove');
	    Passages.update(passage._id, {$inc: incWordClass});
	    UserHighlights.update(userHighlight._id, {$pull: {wordsHighlighted: word_class}});
	};    
    }
});
