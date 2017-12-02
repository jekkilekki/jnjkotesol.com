myApp.factory( 'Authentication', 
              ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
              function( $rootScope, $location, $firebaseObject, $firebaseAuth) {
  
  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var myObject;
                
  auth.$onAuthStateChanged( function( authUser ) {
    if( authUser ) {
      var userRef = ref.child('users').child(authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = 'V9TzErg8ZySsEOxkTkcxfvjFIOD2'; // Default Admin account
    }
  });
                
  myObject = {
    login: function( user ) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/add');
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // signInWithEmailAndPassword
//      $rootScope.message = "Hi, " + $rootScope.user.email + "! Welcome to the KOTESOL Workshops App!"
    }, // login
    
    logout: function() {
      return auth.$signOut();
    }, // logout
    
    requireAuth: function() {
      return auth.$requireSignIn();
    }, // requireAuth
    
    register: function( user ) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then( function( regUser ) {
        var regRef = ref.child('users')
          .child(regUser.uid).set({
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });
//        $rootScope.message = "Successfully registered " + user.firstname + " on the KOTESOL Workshops App!";
        
        // Immediately login a newly registered user
        myObject.login(user);
        
      }).catch( function( error ) {
        $rootScope.message = error.message;
      }); // createUserWithEmailAndPassword
    } // register
  }; // return
                
  return myObject;
    
}]); // factory