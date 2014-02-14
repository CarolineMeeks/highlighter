Template.passageHighlight.helpers({

});

Template.passageHighlight.rendered = function() {
    var passageId = this.data._id;
    Session.set('passageId', passageId);
    if (Session.get('highlighter') == 'erase') { 
	$('#passage-content').addClass('erase');
    }
    Meteor.defer(function() {
//	$('#passage-content').attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
	$('#passage-content').lettering('words');

	var userId = Meteor.userId();
	if (!userId) {
	    //loginVisitor is now in the layout so hopefully it will exist by now.
	    console.log('WARNING: userId is null ' + userId);
	    //failure mode is the first highlight fails so I'm not going to kill it but if this shows up I should fix it.
	}

    var userHighlight = UserHighlights.findOne({userId: userId, passageId: passageId});

    if (!userHighlight) {
	//Assumption here is user is created but this is the first time they have highlighted.

	UserHighlights.insert({userId: userId, passageId: passageId, wordsHighlighted: []});
	userHighlight = UserHighlights.findOne({userId: userId, passageId: passageId});
    };
	
	wordsToHighlight = userHighlight.wordsHighlighted;
	wordsToHighlight.forEach(function(wordClass) {
	    $('.' + wordClass).addClass('highlight');
	    console.log('highlight ' + wordClass);
	});
    });
};


Template.passageHighlight.events({
    'tap, click #highlighters': function(e) {

	if ($(e.target).attr('id') == 'erase') {
	    Session.set('highlighter', 'erase');
	    $('#passage-content').addClass('erase');
	    
	} else if ($(e.target).attr('id') == 'yellow') {
	    Session.set('highlighter', 'yellow');  //add other highlighter colors later
	    $('#passage-content').removeClass('erase');
	};
	console.log('clicked highlighters ' + Session.get('highlighter'));
    },
    'touchstart, vmousedown, mousedown div#passage-content': function(e) {
	Session.set('dragging', true);
	console.log('drag starts, mouse down' + e.type);
	mark(e);
	e.preventDefault();
    },
    'touchmove, vmousemove, mousemove div#passage-content': function(e){
	console.log('mousemove ' + e.type);
	if (Session.get('dragging') == true) {mark(e)};
	e.preventDefault();
    },
    'touchend, vmouseup, mouseup div#passage-content': function(e){
	console.log('mouseup! ' + e.type)
	if (Session.get('dragging') == true) {
	};
	Session.set('dragging', false)  ;
	console.log('drag stops');
	e.preventDefault();
    }
});

function mark(e) {
    var action = 'add'
    if (Session.get('highlighter') == 'erase') { 
	action = 'remove';
    };
    re = new RegExp("word[0-9]*");
    passageId = Session.get('passageId');
    var classes =  $(e.target).attr("class");
    word_classes = re.exec(classes);
    console.log('mark called word classes ' + classes);
    if (word_classes) {   //Sometimes you are on a space not a word so you get no word classes
	word_class = word_classes[0];

	Meteor.call('highlight', word_class, passageId, Meteor.userId(), action);
	
    };
};
