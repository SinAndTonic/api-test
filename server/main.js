import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Listings } from '../lib/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  getTest: function (callType) {

  			var urlEnd = "";
  			var theParams = "";
			switch(callType) {
				case 'watchList':
						urlEnd = 'MyTradeMe/Watchlist/All.json';
						break;
				case 'latestListings':
						urlEnd = 'Listings/Latest.json';
						theParams = {
							buy: 'BuyNow',
							rows: '500'
					};
						break;
			}

		options = {
			headers : {
				Authorization: 'OAuth oauth_consumer_key=F75C21EEA48E00A600EC65660121DE52, oauth_token=5ADB54E96F44D8B059E766C76BC8975A, oauth_signature_method=PLAINTEXT, oauth_signature=3A5F583AB5C366C7DB27378AF5C68B78&8B9C8D4B7A64C5B00D036CF8EB137D3F'

			},
			params: theParams
			
		};



    var theTest = HTTP.get('https://api.tmsandbox.co.nz/v1/' + urlEnd,options);

    for (var key in theTest.data.List){
		if (!Listings.findOne({ListingId : theTest.data.List[key].ListingId}))
			Listings.insert(theTest.data.List[key]);

    }

    return theTest;
  }

});