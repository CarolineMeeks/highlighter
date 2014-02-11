Template.passageHeatMap.helpers({

});

Template.passageHeatMap.rendered = function() {
    console.log('in HeatMap');
    var passageId = this.data._id;
   
    Meteor.defer(function() {
	$('.passage-content').lettering('words');
	var passage = Passages.findOne(passageId);
	_(passage).each( function(value, key, passage) {
	    console.log(key + value);
	    if (value >= 1) {
		$('.' + key).addClass('highlight');
	    };
	});
    });
};

