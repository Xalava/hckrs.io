Startup = {};

// this code loads first because of
// the alphabetic filename load order




Meteor.startup(function() {

  // language
  // XXX use English with Europe formatting
  // in the future we probably use navigator.language || navigator.userLanguage; 
  moment.lang('en-gb'); 

  // setup page transitions
  initPageTransitions();

  // extract city from domain
  checkCurrentCity();

  // subscribe to global subscriptions
  Subscriptions.init();

  // observer login state
  Login.init();
  
});






// extract city from domain
var checkCurrentCity = function() {
  var subdomain = Url.city()
  var city = CITYMAP[subdomain];
  
  if (subdomain === 'www') 
    return exec(function() { Router.go('frontpage'); });
  else if (!city) 
    return;
  
  // set current city in session
  Session.set('currentCity', city.key);
    
  // relaxing the same origin policy so that javascript
  // can communicate between different city domains
  // this is required to do OAuth request.
  // In the oauth package this same line must be included too. 
  if (document.domain && document.domain.indexOf(Url.root()) !== -1)
    document.domain = Url.root(); 
}


// automatically activate page transitions after templates are loaded
var initPageTransitions = function() {
  
  // disable animation when back-button from browser is pressed
  var disableTransition = false;
  window.addEventListener('popstate', function() {
    disableTransition = true;
    Meteor.setTimeout(function() { 
      disableTransition = false; 
    }, 500);
  });

  // animate route-transition after template is rendered
  _.each(Template, function(template, templateName) {
    var prevRenderFunc = template.rendered;
    template.rendered = function() {
      var self = this;
      if (prevRenderFunc) prevRenderFunc.call(this);  
      Meteor.setTimeout(function() {
        self.$(".route-transition").addClass('activated');
        if (!disableTransition) 
          self.$(".route-transition").addClass('animated');
      }, 0);
    }
  });
}