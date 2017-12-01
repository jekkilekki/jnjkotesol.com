var myApp = angular.module( 'kotesolWorkshops',
                           ['ngRoute', 'firebase', 'nlFramework'] );

myApp.run([ '$rootScope', '$location', '$nlFramework',
           function( $rootScope, $location, $nlFramework ) {

  $rootScope.fw = $nlFramework;
$rootScope.drawer = $nlFramework.drawer;
$rootScope.refresh = $nlFramework.refresh;
$rootScope.burger = $nlFramework.burger;
$rootScope.config = $nlFramework.config;
$rootScope.toast = $nlFramework.toast;
$rootScope.menu = $nlFramework.menu;

  $rootScope.$on('$routeChangeError', function( event, next, previous, error ) {
    if( error == 'AUTH_REQUIRED' ) {
      $rootScope.message = 'Sorry, you must log in to view this page.';
      $location.path( '/login' );
    } // AUTH_REQUIRED
  }); // $routeChangeError

             /* ---------------------------
     * nlFramework:
     * set options and initialize
     */
    var nlOptions = {
      // global settings
      speed: 0.2,
      animation: 'ease',
      // use action button
      fab: true,
      // use toast messages
      toast: true,
      // burger specific
      burger: {
        endY: 6,
        startScale: 1, // X scale of bottom and top line of burger menu at starting point (OFF state)
        endScale: 0.7 // X scale of bottom and top line of burger menu at end point (ON state)
      },
      // content specific
      content:{
        modify: true, // modify content width and heidht?
        topBarHeight: 56 //topbar height to use when modify is set to true
      },
      // drawer specific
      drawer: {
        maxWidth: 300,
        openCb: function(){
          console.log('nlDrawer: openned')
        },
        closeCb: function(){
          console.log('nlDrawer closed')
        }
      },
      // refresh specific
      refresh: {
        defaultColor: '#aa3344', // default(inactive) color
        activeColor: '#558844', // active color
        callback: function(){
          // here is just timeout to wait 5sec before ending sync animation
          setTimeout( function(){
            console.log( 'nlRefresh custom callback' );
            // after doing some stuff end syncing animation
            $nlRefresh.syncEnd();
          }, 5000 );
        }
      },
      fab: true,
      secMenu: true
    };
    // initialize the framework
//    $nlFramework.init( nlOptions );
}]); // run

myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider.
    when( '/', {
      templateUrl: 'views/home.html',
      controller: 'WorkshopsController'
    }).

    when( '/home', {
      templateUrl: 'views/home.html',
      controller: 'WorkshopsController'
    }).

    when( '/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).

    when( '/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).

    when( '/checkins/:uid/:mid', {
      templateUrl: 'views/checkins.html',
      controller: 'CheckinsController'
    }).

    when( '/checkins/:uid/:mid/checkins-list', {
      templateUrl: 'views/checkins-list.html',
      controller: 'CheckinsController'
    }).

    when( '/list', {
      templateUrl: 'views/list.html',
      controller: 'WorkshopsController',
      // resolve: {
      //   currentAuth: function(Authentication) {
      //     return Authentication.requireAuth();
      //   }
      // }
    }).

    when( '/add', {
      templateUrl: 'views/add.html',
      controller: 'WorkshopsController'
    }).

    when( '/single/:uid/:mid', {
      templateUrl: 'views/single.html',
      controller: 'WorkshopsController'
    }).

    otherwise({
      redirectTo: '/list'
    });
}]);
