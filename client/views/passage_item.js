Template.passageItem.helpers({
});

Template.passageItem.rendered = function() {
    Meteor.defer(function() {
	$('.passage-content').lettering('words');
    });
};


Template.passageItem.events({
    'click div.passage-content': function(e) {
//	    re = new RegExp("word([0-9]*)")
	    re = new RegExp("word[0-9]*")
            word_class = re.exec( $(e.target).attr("class"))[0];
	    $(e.target).addClass('highlight');
	    passageId = this._id;
	    console.log(' regex got  ' + word_class + ' passageId ' + passageId);
	    Meteor.call('highlight', word_class, passageId);
    }
});


