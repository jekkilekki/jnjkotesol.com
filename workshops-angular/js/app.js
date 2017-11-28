var myApp = angular.module( 'kotesolWorkshops', 
                           ['ngRoute', 'firebase'] );

myApp.run([ '$rootScope', '$location', function( $rootScope, $location ) {
  $rootScope.$on('$routeChangeError', function( event, next, previous, error ) {
    if( error == 'AUTH_REQUIRED' ) {
      $rootScope.message = 'Sorry, you must log in to view this page.';
      $location.path( '/login' );
    } // AUTH_REQUIRED
  }); // $routeChangeError
}]); // run

myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider.
    when( '/home', {
      templateUrl: 'views/home.html'
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
  
    when( '/workshops', {
      templateUrl: 'views/workshops.html',
      controller: 'WorkshopsController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
  
    otherwise({
      redirectTo: '/home'
    });
}]);