Meteor.publish('passages', function() {
  return Passages.find();
});

Meteor.publish('userHighlights', function() {
  return UserHighlights.find();
});
