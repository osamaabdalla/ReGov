import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl('reset-password/${token}');
};

Accounts.emailTemplates.siteName = 'ReGov';
Accounts.emailTemplates.from = 'ReGov <accounts@example.com>';
Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'Reset your password on ReGov';
  },
  text(user, url) {
    return `Hello!, Click the link below to reset your password on ReGov. ${url} If you didn't request this email, please ignore it.Thanks, ReGov team`;
  }
};
