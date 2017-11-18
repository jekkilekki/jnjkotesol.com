myApp.controller( 'WorkshopsController', 
                 ['$scope', '$firebaseAuth', '$firebaseArray',
                 function($scope, $firebaseAuth, $firebaseArray) {
  $scope.message = "Welcome to the JNJ KOTESOL Workshops App.";
                   
  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
                   
  auth.$onAuthStateChanged( function( authUser ) {
    if( authUser ) {
      var workshopsRef = ref.child('users').child(authUser.uid).child('workshops');
      var workshopsInfo = $firebaseArray(workshopsRef);
      
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
      
    } // authUser
  }); // onAuthStateChanged
                   
}]); // myApp.controller