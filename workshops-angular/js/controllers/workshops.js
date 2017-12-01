myApp.controller( 'WorkshopsController',
                 ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseAuth', '$firebaseArray',
                 function($scope, $rootScope, $location, $routeParams, $firebaseAuth, $firebaseArray) {
  $scope.message = "Welcome to the JNJ KOTESOL Workshops App.";

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
                   
  $scope.whichWorkshop = $routeParams.mid;
  $scope.whichUser = $routeParams.uid;
                   
  // Single Workshop page
  // Testing: http://127.0.0.1:62757/jnjkotesol.com/workshops-angular/#!/single/V9TzErg8ZySsEOxkTkcxfvjFIOD2/L-G2-awvg37zfBRa1KV
  var pagePath = $location.path();
  if( pagePath == '/single/' + $routeParams.uid + '/' + $routeParams.mid ) {
    firebase.database().ref()
      .child('users').child($scope.whichUser)
      .child('workshops').child($scope.whichWorkshop).once('value').then( function(snapshot) {

         $scope.thisworkshop = snapshot.val();

    }); // end single
  }

  auth.$onAuthStateChanged( function( authUser ) {
    if( authUser ) {
      var workshopsRef = ref.child('users').child(authUser.uid).child('workshops');
      var workshopsInfo = $firebaseArray(workshopsRef);
      
      $scope.workshops = workshopsInfo;

      workshopsInfo.$loaded().then(function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // make sure workshop data is loaded

      workshopsInfo.$watch( function(data) {
        $rootScope.howManyWorkshops = workshopsInfo.length;
      }); // update workshops number when a new meeting is loaded

      $scope.addWorkshop = function() {  
        // Workshop data
//        var workshopData = {
//          date: firebase.database.ServerValue.TIMESTAMP,
//          workshopname: $scope.workshopname,
//          workshopimage: $scope.workshopimage || null,
//          workshopdate: $scope.workshopdate.toString() || null,
//          workshoptime: $scope.workshoptime.getTime() || null,
//          workshopdescription: $scope.workshopinfo || null,
//          
//          speaker1name: $scope.speaker1name || null,
//          speaker1affiliation: $scope.speaker1affiliation || null,
//          speaker1image: $scope.speaker1image || null,
//          speaker1title: $scope.speaker1title || null,
//          speaker1abstract: $scope.speaker1abstract || null,
//          speaker1bio: $scope.speaker1bio || null,
//          speaker1email: $scope.speaker1email || null,
//          speaker1link: $scope.speaker1link || null,
//          
//          speaker2name: $scope.speaker2name || null,
//          speaker2affiliation: $scope.speaker2affiliation || null,
//          speaker2image: $scope.speaker2image || null,
//          speaker2title: $scope.speaker2title || null,
//          speaker2abstract: $scope.speaker2abstract || null,
//          speaker2bio: $scope.speaker2bio || null,
//          speaker2email: $scope.speaker2email || null,
//          speaker2link: $scope.speaker2link || null
//        };
        
        // Add Workshop data
        workshopsInfo.$add({
          date: firebase.database.ServerValue.TIMESTAMP,
          workshopname: $scope.workshopname,
          workshopimage: $scope.workshopimage || null,
          workshopdate: $scope.workshopdate.toString() || null,
          workshoptime: $scope.workshoptime.getTime() || null,
          workshopdescription: $scope.workshopinfo || null,
          
          speaker1name: $scope.speaker1name || null,
          speaker1affiliation: $scope.speaker1affiliation || null,
          speaker1image: $scope.speaker1image || null,
          speaker1title: $scope.speaker1title || null,
          speaker1abstract: $scope.speaker1abstract || null,
          speaker1bio: $scope.speaker1bio || null,
          speaker1email: $scope.speaker1email || null,
          speaker1link: $scope.speaker1link || null,
          
          speaker2name: $scope.speaker2name || null,
          speaker2affiliation: $scope.speaker2affiliation || null,
          speaker2image: $scope.speaker2image || null,
          speaker2title: $scope.speaker2title || null,
          speaker2abstract: $scope.speaker2abstract || null,
          speaker2bio: $scope.speaker2bio || null,
          speaker2email: $scope.speaker2email || null,
          speaker2link: $scope.speaker2link || null
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
