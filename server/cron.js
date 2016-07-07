import { Meteor } from 'meteor/meteor';

SyncedCron.add({
  name: 'Fetch new listings',
  schedule: function(parser) {
	// parser is a later.parse object
	return parser.text('every 5 minutes');
  },
  job: function() {
		Meteor.call('getTest', 'latestListings', function(error,result){
	if (error)
		console.log(error);

	});
  }
});

SyncedCron.start();