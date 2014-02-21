Template.passageHeatMap.helpers({

});

Template.passageHeatMap.rendered = function() {
    console.log('in HeatMap');
    var passageId = this.data._id;

    Meteor.defer(function() {
//	$('.passage-content').lettering('words');

	var passage = Passages.findOne(passageId);
	var freq = []
	var colorArray = ['cyan','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)'];
	var numColors = colorArray.length;
	$('#passage-content').find("span").each( function(index) {
	    word = 'word'+(index);
	    var count = passage[word];
	    if (!count) { count = 0 }
	    freq.push(count)
	});
	maxFreq = _.max(freq);
	console.log('max freq', freq, maxFreq);
	$('#passage-content').find("span").each( function(index) {
	    word = 'word'+(index);
	    var count = passage[word];
	    if (count >=1) {  
		var level = (((maxFreq - count)/maxFreq) * numColors).toFixed();
		console.log('setting',word, level);
		d3.select('.'+word).transition().delay(500).style('background-color',colorArray[level]);
//		Tipped.create('.'+word, count);
	    }
	});
	console.log(colorArray.length, maxFreq);
	var binMax = maxFreq;
	var binMin = binMax;
	var level = 0;
	var text = ""
	for (var c = maxFreq; c > 0; c-- ) {
	    binMin = c;
	    console.log('c',c);
	    cLevel =  (((maxFreq - c)/maxFreq) * numColors).toFixed();
	    	    console.log('cLevel',cLevel);
	    if (level !== cLevel) {
		if (c < binMax - 1) {
		    binMin = c + 1;
		}
		if (binMin == binMax) {
		    text = binMax + ' Highlights';
		} else {
		    text = binMax + ' to ' + binMin + ' Highlights';
		}
		    console.log(colorArray[level]);
		 $('#legend').append($('<div class="legend">').css('background-color', colorArray[cLevel]).append(text));
		binMax = c-1;
		level = cLevel;

	    };
	    
	    console.log('after if');
	};
	$('#legend').append($('<div class="legend">').append('No Highlights'));
    });
};

