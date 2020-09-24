import { Meteor } from 'meteor/meteor';
import '../../api/media/images.js';

if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });
}