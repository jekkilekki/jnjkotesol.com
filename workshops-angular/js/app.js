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
    when( '/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when( '/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when( '/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);