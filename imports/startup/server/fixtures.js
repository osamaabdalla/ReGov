// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
   FS.TempStore.removeAll();
  // Create a default user
  if(Meteor.users.find().count() == 0){
    let userId = Accounts.createUser({
        username: 'Admins',
        email: 'admin@test.com',
        password: 'admin123',
        profile: {
          firstName: 'Admin',
          lastName: 'App',
          identity: '',
        }
    });
    Roles.addUsersToRoles(userId, 'administrator', Roles.GLOBAL_GROUP);
  }
});
