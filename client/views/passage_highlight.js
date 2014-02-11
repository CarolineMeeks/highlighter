Template.passageHighlight.helpers({

});

Template.passageHighlight.rendered = function() {
    Meteor.loginVisitor();
    var passageId = this.data._id;
    Meteor.defer(function() {
	$('.passage-content').lettering('words');
	var userHighlight = UserHighlights.findOne({userId: Meteor.userId()}, {passageId: passageId});
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
	    console.log(classes)
            word_class = re.exec(classes)[0];
	    console.log(' regex got  ' + word_class + ' passageId ' + passageId);

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


