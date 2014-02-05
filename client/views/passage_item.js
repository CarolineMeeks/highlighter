Template.passageItem.helpers({

});

Template.passageItem.rendered = function() {
    Meteor.defer(function() {
	$('.passage-content').lettering('words');
	var passageId = $('.one-passage').attr('id');
	data = Passages.findOne(passageId);
	wordHighlights = data.wordHighlights;
	wordHighlights.forEach(function(wordClass) {
	    $('.' + wordClass).addClass('highlight');
	});
	console.log(wordHighlights);
    });
};


Template.passageItem.events({
    'click div.passage-content': function(e) {
	re = new RegExp("word[0-9]*")
	passageId = this._id;
        word_class = re.exec( $(e.target).attr("class"))[0];
	console.log(' regex got  ' + word_class + ' passageId ' + passageId);

	if ($(e.target).hasClass('highlight')) {
	    $(e.target).removeClass('highlight');
	    Meteor.call('highlight', word_class, passageId, 'remove');
	} else {
	    $(e.target).addClass('highlight');
	    Meteor.call('highlight', word_class, passageId, 'add');
	};
    }
});


