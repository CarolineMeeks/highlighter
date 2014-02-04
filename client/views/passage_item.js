Template.passageItem.helpers({
});

Template.passageItem.rendered = function() {
    Meteor.defer(function() {
	console.log('hi console');
	$('.passage-content').lettering('words');
    });
};

