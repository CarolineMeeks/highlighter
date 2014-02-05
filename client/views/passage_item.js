Template.passageItem.helpers({
});

Template.passageItem.rendered = function() {
    Meteor.defer(function() {
	$('.passage-content').lettering('words');

	$("div.passage-content > span" ).mousedown(function() {
	    re = new RegExp("word([0-9]*)")
	    classes = $(this).attr("class");
            word_num = re.exec( $(this).attr("class"))[1];
	    $(this).addClass('highlight');
	    console.log(classes + ' regex got  ' + word_num);
	});
    });
};

