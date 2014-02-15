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
    },
    'submit': function(passageAttributes) {

	if (!passageAttributes.title)
	    throw new Meteor.Error(422, 'Please fill in a title');
	if (!passageAttributes.passage)
	    throw new Meteor.Error(422, 'Please fill in a passage');
	if (!passageAttributes.prompt)
	    throw new Meteor.Error(422, 'Please fill in a prompt');

	function nl2br (str, is_xhtml) {   
	    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
	    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
	}

	c = nl2br(passageAttributes.passage, false);
	console.log(" c " + c);
	function injector(t, splitter, klass, after) {
	    var a = t.split(splitter);
	    var result = ""
	    if (a.length) {
		for (var i=0; i<a.length;i++) {
		    item = a[i];
		    if (item.length) {
			result = result + '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
		    }
		}
	    }
	    return result
	}

	content = injector(c,' ', 'word','');
	console.log(content);

	//Put the spans etc in here.
	var passage = _.extend(_.pick(passageAttributes, 'prompt', 'title', 'userId'), {
	    content: content,
	    submitted: new Date().getTime()
	});

	var passageId = Passages.insert(passage);

	return passageId;
    }
});
