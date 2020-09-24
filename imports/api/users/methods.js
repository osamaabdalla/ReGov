import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    insertUser: function(values){
      try {
       let userId = Accounts.createUser({
           username: values.username,
           email : values.email,
           password: values.password,
           profile: {
             firstName: values.firstName,
             lastName: values.lastName,
             identity: values.identity,
          }
       });
       Roles.addUsersToRoles(userId, 'administrator', Roles.GLOBAL_GROUP);
       return {
          "userId": userId
        };
      } catch (e) {
          throw e;
      }
    },
    updateUser: function(id, values){
      try {
        let userId = Meteor.users.update({ _id: id},{ $set: {
              username: values.username,
              email : values.email,
              password: values.password,
              profile: {
                firstName: values.firstName,
                lastName: values.lastName,
                identity: values.identity,
            }
         }});
         Roles.setUserRoles(id, 'administrator', Roles.GLOBAL_GROUP);
         if(values.newPassword){
           Accounts.setPassword(id, values.newPassword, { logout: false })
         }
         return {
            "userId": values
         };
      } catch (e) {
          throw e;
      }
    },
    getUser: function(id){
       try {
        let user = Meteor.users.findOne({_id: id});
        return user;
      } catch (e) {
        throw e;
      }
    },
    deleteUser: function(id){
      try {
       Meteor.users.remove({_id: id});
       return {
          success: true
       };
     } catch (e) {
       throw e;
     }
   },
   currentUserInfo:function() {
      try {
       return Meteor.user();
     } catch (e) {
       throw e;
     }
   },
});
