myApp.controller( 'WorkshopsController',
                 ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseArray',
                 function($scope, $rootScope, $location, $firebaseAuth, $firebaseArray) {
  $scope.message = "Welcome to the JNJ KOTESOL Workshops App.";

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged( function( authUser ) {
    if( authUser ) {
      var workshopsRef = ref.child('users').child(authUser.uid).child('workshops');
      var workshopsInfo = $firebaseArray(workshopsRef);
//      var wkRef = ref.child('workshops');
//      var wkInfo = $firebaseArray(wkRef);

      $scope.workshops = workshopsInfo;

      workshopsInfo.$loaded().then(function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // make sure workshop data is loaded

      workshopsInfo.$watch( function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // update workshops number when a new meeting is loaded

      $scope.addWorkshop = function() {
//        updateWorkshop( $scope );
        
        // Workshop data
//        var workshopData = {
//          name: $scope.workshopname,
//          date: firebase.database.ServerValue.TIMESTAMP,
//          workshopdate: $scope.workshopdate,
//          speakername: $scope.speakername,
//          speakertitle: $scope.speakertitle,
//          speakerabstract: $scope.speakerabstract,
//          speakerbio: $scope.speakerbio
//        };
//
//        // Key for a new Workshop
//        var newWorkshopKey = ref.child('workshops').push().key;
//
//        // Write the new Workshop's data simultaneously in the workshops list and the user's workshops list.
//        var updates = {};
//        updates['/workshops/' + newWorkshopKey] = workshopData;
////        updates['/users/' + authUser.uid + '/workshops/' + newWorkshopKey] = workshopData;
//        
//        return ref.update(updates);
        
        
//        .then( function() {
//          $scope.workshopname = '';
//          $scope.workshopdate = '';
//          $scope.speakername = '';
//          $scope.speakertitle = '';
//          $scope.speakerabstract = '';
//          $scope.speakerbio = '';
//        }); // promise
        
        workshopsInfo.$add({
          date: firebase.database.ServerValue.TIMESTAMP,
          name: $scope.workshopname,
          image: $scope.workshopimage || null,
          workshopdate: $scope.workshopdate.toString() || null,
          workshoptime: $scope.workshoptime.getTime() || null,
          description: $scope.workshopinfo || null,
          speakername: $scope.speakername || null,
          speakerimage: $scope.speakerimage || null,
          speakertitle: $scope.speakertitle || null,
          speakerabstract: $scope.speakerabstract || null,
          speakerbio: $scope.speakerbio || null,
          speakeremail: $scope.speakeremail || null,
          speakerlink: $scope.speakerlink || null
        }).then( function() { 
          $location.path( '/list' );
        }); // promise
        
        
      } // addWorkshop

      $scope.deleteWorkshop = function( key ) {
        workshopsInfo.$remove( key );
      } // deleteWorkshop

    } // authUser
  }); // onAuthStateChanged

}]); // myApp.controller
