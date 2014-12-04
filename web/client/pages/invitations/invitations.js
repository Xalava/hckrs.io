// Route Controller

InvitationsController = DefaultController.extend({
  template: 'invitations',
  waitOn: function () {
    return [ 
      Meteor.subscribe('invitations') 
    ];
  }
});

Template.invitations_partial.helpers({
  'unusedTotal': function() { 
    return UserProp('invitations'); 
  },
  'invitedTotal': function() { 
    return Invitations.find({broadcastUser: Meteor.userId()}).count(); 
  },
  'invitedUserViews': function() { 
    var getUserView = function(u) { 
      return userView(u.receivingUser); 
    };
    return Invitations.find({broadcastUser: Meteor.userId()}, {fields: {receivingUser: 1}, sort: {createdAt: 1}}).map(getUserView);
  },
  'availableSlots': function() { 
    return _.range(UserProp('invitations')); 
  },
  'link': function() { 
    var inviteUrl = userInviteUrl(UserProps(['invitationPhrase']));
    return inviteUrl;
  },
  'linkUrl': function() { 
    var inviteUrl = userInviteUrl(UserProps(['invitationPhrase']));
    return encodeURIComponent(inviteUrl); 
  }
});