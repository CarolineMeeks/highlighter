Template.passageHeatMap.helpers({

});

Template.passageHeatMap.rendered = function() {
    console.log('in HeatMap');
    var passageId = this.data._id;

    Meteor.defer(function() {
//	$('.passage-content').lettering('words');

	var passage = Passages.findOne(passageId);
	var freq = []
	$('.passage-content').find("span").each( function(index) {
	    word = 'word'+(index+1);
	    var count = passage[word];
	    if (!count) { count = 0 }
	    freq.push(count)
	    if (count >= 1) {
		d3.select('.'+word).transition().delay(500).style('background-color','cyan');
		if (count >= 2) {
		    d3.select('.'+word).transition().delay(1000).style('color','red');
		    if (count >= 3) {
			d3.select('.'+word).transition().delay(1500).style('font-size','150%');
		    }		
		}
	    }
	    console.log('looping through a span..' + word + $(this).text() + count);
	});
    });
};

