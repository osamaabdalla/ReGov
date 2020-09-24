// All users-related publications
import { Meteor } from 'meteor/meteor';
Meteor.publish('users.all', function () {
  return Meteor.users.find();
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});
