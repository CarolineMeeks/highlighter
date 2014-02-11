Meteor.publish('passages', function() {
  return Passages.find();
});

Meteor.publish('userHighlights', function(passageId) {
    userId = this.userId
    if (!userId) {
	console.log('no userId yet in publish')
//	this.stop();
//	Meteor.loginVisitor();
    }
  return UserHighlights.find();
});
