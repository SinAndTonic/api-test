import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './main.html';
import { Listings } from '../lib/collections.js';


Template.apiTest.helpers({

})

Template.apiTest.events({
	'click .doTest'(event) {

    var callType = event.target.id;
    Meteor.call('getTest', callType, function(error,result){
      if (!error){
        console.log(result.data.List);
        Session.set('currentList',result.data.List);
      }
      else
        console.log(error);
    });
		
	}
})

Template.currentWatchList.helpers({
  currentList : function  (){
    
    return Listings.find();
  }
});