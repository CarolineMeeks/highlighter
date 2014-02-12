Template.passageHighlight.helpers({

});

Template.passageHighlight.rendered = function() {
    var passageId = this.data._id;
    Session.set('passageId', passageId);
    if (Session.get('highlighter') == 'erase') { 
	$('#passage-content').addClass('erase');
    }
    console.log('Just rendered passageId '+ passageId);

    Meteor.defer(function() {
	$('#passage-content').lettering('words');

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
    'click #highlighters': function(e) {

	if ($(e.target).attr('id') == 'erase') {
	    Session.set('highlighter', 'erase');
	    $('#passage-content').addClass('erase');
	    
	} else if ($(e.target).attr('id') == 'yellow') {
	    Session.set('highlighter', 'yellow');  //add other highlighter colors later
	    $('#passage-content').removeClass('erase');
	};
	console.log('clicked highlighters ' + Session.get('highlighter'));
    },
    'mousedown div#passage-content': function(e) {
	e.preventDefault();
	Session.set('dragging', true);
	console.log('drag starts');
	mark(e);
    },
    'mousemove div#passage-content': function(e){
	if (Session.get('dragging') == true) {mark(e)};
    },
    'mouseup div#passage-content': function(e){
	if (Session.get('dragging') == true) {
	};
	Session.set('dragging', false)  ;
	console.log('drag stops');
    }
});

function mark(e) {
    console.log('mark called');
    var action = 'add'
    if (Session.get('highlighter') == 'erase') { 
	action = 'remove';
    };
    re = new RegExp("word[0-9]*");
    passageId = Session.get('passageId');
    var classes =  $(e.target).attr("class");
    if ($(e.target).is('div')) { 
	//FIXMEsometimes the click doesn't seem to get a span
    } else {
	word_class = re.exec(classes)[0];
	console.log(' word_class is  ' + word_class + ' passageId ' + passageId);

	Meteor.call('highlight', word_class, passageId, Meteor.userId(), action);
	
    };
};


