myApp.controller( 'CheckinsController', 
                 ['$scope', '$rootScope', '$route' ,'$location', '$routeParams', '$firebaseObject', '$firebaseArray',
                 function($scope, $rootScope, $route, $location, $routeParams, $firebaseObject, $firebaseArray) {
  $scope.message = "Check-in to this meeting.";
                   
  var ref, checkinsList, workshop;
                   
  $scope.whichWorkshop = $routeParams.mid;
  $scope.whichUser = $routeParams.uid;
                   
  // Checkins Data
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
                
                   
//  var thisWorkshopRef = ref.child('users').child($routeParams.uid).child('workshops').child($routeParams.mid);
//  var workshopInfo = $firebaseObject(thisWorkshopRef);
//      
////  $scope.thisworkshop = workshopInfo.once('value');
//
//  workshopInfo.$loaded().then(function(data) {
//    console.log( "loaded record: ", workshopInfo.$id, workshopInfo.workshopname );
//        workshop = firebase.database().ref()
//      .child('users').child($scope.whichUser)
//      .child('workshops').child($scope.whichWorkshop).once('value').then( function(snapshot) {
//
//          console.log( snapshot.val() );
//         $scope.thisworkshop = snapshot.val();
//
//    }); // end single
//      }); // make sure workshop data is loaded
                   
                   
//                   workshopsInfo.$loaded().then(function(data) {
//        $rootScope.howManyWorkshops = workshopsInfo.length;
//      }); // make sure workshop data is loaded
                   
  $scope.reloadRoute = function() {
    $route.reload();
  }
                   
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
      // if( authUser ) { // if an Admin
      //  $scope.user.firstname = '';
      //  $scope.user.lastname = '';
      //  $scope.user.email = '';
      // } else { // everyone else
        $location.path('/checkin/' + $scope.whichUser + '/' + $scope.whichWorkshop + '/list');
      // }
    }); // $add
  } // addCheckin
  
  $scope.deleteCheckin = function(id) {
    var refDel = ref.child(id);
    var record = $firebaseObject(refDel);
    record.$remove(id);
  } // deleteCheckin
  
  // Workshop Data
  // Testing: http://127.0.0.1:62757/jnjkotesol.com/workshops-angular/#!/single/V9TzErg8ZySsEOxkTkcxfvjFIOD2/L-G2-awvg37zfBRa1KV
//  var pagePath = $location.path();
//  if( pagePath == '/checkin/' + $routeParams.uid + '/' + $routeParams.mid + '/list' ) {
    workshop = firebase.database().ref()
      .child('users').child($scope.whichUser)
      .child('workshops').child($scope.whichWorkshop).once('value').then( function(snapshot) {

          console.log( snapshot.val() );
         $rootScope.thisworkshop = snapshot.val();

    }); // end single
//  }
  
}]); // myApp.controller