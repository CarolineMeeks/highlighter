
Template.passagesList.helpers({
  passages: function() {
      return Passages.find({}, {sort: {submitted: -1}});
  }
});

