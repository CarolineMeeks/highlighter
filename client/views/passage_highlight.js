Template.passageHighlight.helpers({

});

Template.passageHighlight.rendered = function() {
    var passageId = this.data._id;
    console.log('Just rendered passageId '+ passageId);

    Meteor.defer(function() {
	$('.passage-content').lettering('words');

	var userId = Meteor.userId();
	if (!userId) {
	    //loginVisitor is now in the layout so hopefully it will exist by now.
	    console.log('WARNING: userId is null ' + userId);
	    //failure mode is the first highlight fails so I'm not going to kill it but if this shows up I should fix it.
	}

    var userHighlight = UserHighlights.findOne({userId: userId, passageId: passageId});
    console.log('got userHighlight ', userHighlight);  
    if (!userHighlight) {
	//Assumption here is user is created but this is the first time they have highlighted.
	console.log('about to insert into UserHighlights');
	UserHighlights.insert({userId: userId, passageId: passageId, wordsHighlighted: []});
	userHighlight = UserHighlights.findOne({userId: userId, passageId: passageId});
	console.log('new userHighlight ', userHighlight);  
    };

	wordsToHighlight = userHighlight.wordsHighlighted;
	wordsToHighlight.forEach(function(wordClass) {
	    $('.' + wordClass).addClass('highlight');
	});
    });
};


Template.passageHighlight.events({
    'click div.passage-content': function(e) {
	re = new RegExp("word[0-9]*")
	passageId = this._id;
	var classes =  $(e.target).attr("class");
	if (classes != 'passage-content') { //FIXMEsometimes the click doesn't seem to get a span
            word_class = re.exec(classes)[0];
	    console.log(' word_class is  ' + word_class + ' passageId ' + passageId);

	    if ($(e.target).hasClass('highlight')) {
		$(e.target).removeClass('highlight');
		Meteor.call('highlight', word_class, passageId, Meteor.userId(), 'remove');
	    } else {
		$(e.target).addClass('highlight');
		Meteor.call('highlight', word_class, passageId, Meteor.userId(), 'add');
	    };
	};
    }
});


