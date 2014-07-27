
DefaultController = RouteController.extend({
  
  onRun: function() {

  },
  onBeforeAction: function() {
    
    // wait on global subscriptions ready
    this.wait({ready: Subscriptions.ready}); 
    
  },
  onAfterAction: function() {

    // change the style of the navigation header to default, every route
    Interface.setHeaderStyle('default');

  },
  onStop: function() {


  }
});

