import { Meteor } from 'meteor/meteor';

import './images.js';

Meteor.methods({

  insertImage: function(files){
    try {
      Images.insert(files[0], function (err, fileObj) {});
      } catch (e) {
         throw e;
      }
  },

});
