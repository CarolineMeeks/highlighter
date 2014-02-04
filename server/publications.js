Meteor.publish('passages', function() {
  return Passages.find();
});
