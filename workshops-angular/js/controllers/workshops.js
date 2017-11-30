myApp.controller( 'WorkshopsController',
                 ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',
                 function($scope, $rootScope, $firebaseAuth, $firebaseArray) {
  $scope.message = "Welcome to the JNJ KOTESOL Workshops App.";

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged( function( authUser ) {
    if( authUser ) {
      var workshopsRef = ref.child('users').child(authUser.uid).child('workshops');
      // var workshopsRef = ref.child('workshops');
      var workshopsInfo = $firebaseArray(workshopsRef);

      $scope.workshops = workshopsInfo;

      workshopsInfo.$loaded().then(function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // make sure workshop data is loaded

      workshopsInfo.$watch( function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // update workshops number when a new meeting is loaded

      $scope.addWorkshop = function() {
        workshopsInfo.$add({
          name: $scope.workshopname,
          workshopdate: $scope.workshopdate,
          date: firebase.database.ServerValue.TIMESTAMP
        }).then( function() {
          $scope.workshopname = '';
          $scope.workshopdate = '';
        }); // promise
      } // addWorkshop

      $scope.deleteWorkshop = function( key ) {
        workshopsInfo.$remove( key );
      } // deleteWorkshop

    } // authUser
  }); // onAuthStateChanged

}]); // myApp.controller
