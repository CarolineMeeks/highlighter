if (Passages.find().count() === 0) {

      var passage = {
	  prompt: "This is initial testing content",
	  title: "The Song of Wandering Aengus BY WILLIAM BUTLER YEATS",
	  passage: "I went out to the hazel wood, \n Because a fire was in my head, \n And cut and peeled a hazel wand, \n And hooked a berry to a thread; \n And when white moths were on the wing, \n And moth-like stars were flickering out, \n I dropped the berry in a stream \n And caught a little silver trout.",
	  userId: ""
      };

    Meteor.call('submit', passage);

      var passage = {
	  prompt: "This is initial testing content",
	title: 'Yeats on Magic',
	  passage: "I believe in the practice and philosophy of what we have agreed to call magic, in what I must call the evocation of spirits, though I do not know what they are, in the power of creating magical illusions, in the visions of truth in the depths of the mind when the eyes are closed; and I believe in three doctrines, which have, as I think, been handed down from early times, and been the foundations of nearly all magical practices."
    };
    Meteor.call('submit', passage);


};
