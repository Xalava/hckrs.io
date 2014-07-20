
// ALLOW and DENY rules specifies which database queries are allowed
// and which not. This will be validated on the server

// shorthands

TRUE = function() { return true; }
FALSE = function() { return false; }
ALL = { insert: TRUE, update: TRUE, remove: TRUE };
NONE = { insert: FALSE, update: FALSE, remove: FALSE };


// helper functions

// check if user is allowed to access the site
// otherwise all database modifier functions will be blocked
allowedAccess = function(userId) {
  var user = Users.findOne(userId);
  return user && user.isAccessDenied != true;
}