Template.passageHeatMap.helpers({

});

Template.passageHeatMap.rendered = function() {
    console.log('in HeatMap');
    var passageId = this.data._id;

    Meteor.defer(function() {
//	$('.passage-content').lettering('words');

	var passage = Passages.findOne(passageId);
	var freq = []
	var colorArray = ['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)'];
	var numColors = colorArray.length;
	$('#passage-content').find("span").each( function(index) {
	    word = 'word'+(index);
	    var count = passage[word];
	    if (!count) { count = 0 }
	    freq.push(count)
	    if (count >=1 && count <= numColors) {  //FIXME: Hacking color map
		d3.select('.'+word).transition().delay(500).style('background-color',colorArray[numColors-count]);

	    }		
	    console.log('looping through a span..' + word + $(this).text() + count);
	});
    });
};

