myApp.controller( 'CheckinsController', 
                 ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
                 function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray) {
  $scope.message = "Check-in to this meeting.";
                   
  var ref, checkinsList;
                   
  $scope.whichWorkshop = $routeParams.mid;
  $scope.whichUser = $routeParams.uid;

  ref = firebase.database().ref()
        .child('users').child($scope.whichUser)
        .child('workshops').child($scope.whichWorkshop)
        .child('checkins');
                   
  checkinsList = $firebaseArray(ref);
  $scope.checkins = checkinsList;
                   
  // Initialize our checkins sorting
  $scope.order = 'firstname';
  $scope.direction = null; // ascending by default
  $scope.query = '';
  $scope.recordId = '';
                   
  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
    $scope.recordId = checkinsList.$keyAt(whichRecord);
  } // pick a random winner
  
  $scope.showPrize = function(myCheckin) {
    myCheckin.show = !myCheckin.show; // toggle show value
    
    if( myCheckin.userState == 'expanded' ) {
      myCheckin.userState = '';
    } else {
      myCheckin.userState = 'expanded';
    }
  } // show prize field
  
  $scope.awardPrize = function(myCheckin, myPrize) {
    var refPrize = ref.child(myCheckin.$id).child('prizes');
    var checkinsArray = $firebaseArray(refPrize);
    
    checkinsArray.$add({
      name: myPrize,
      date: firebase.database.ServerValue.TIMESTAMP
    });
  } // award a prize
  
  $scope.deletePrize = function(myCheckin, key) {
    var refPrize = ref.child(myCheckin.$id).child('prizes').child(key);
    var record = $firebaseObject(refPrize);
    record.$remove(key);
  } // delete a prize
                   
  $scope.addCheckin = function() {
    $firebaseArray(ref).$add({
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      email: $scope.user.email,
      date: firebase.database.ServerValue.TIMESTAMP
    }).then(function() {
      $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichWorkshop + '/checkins-list')
    }); // $add
  } // addCheckin
  
  $scope.deleteCheckin = function(id) {
    var refDel = ref.child(id);
    var record = $firebaseObject(refDel);
    record.$remove(id);
  } // deleteCheckin
  
}]); // myApp.controller