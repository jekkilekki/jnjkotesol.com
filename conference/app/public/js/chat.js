// Vanilla JS
var socket = io();
var chatUsername = document.querySelector( '#chat-username' );
var chatMessage = document.querySelector( '#chat-message' );
var nameFormGroup = document.querySelector( '.name-form-group' );

chatUsername.onchange = function() {
  chatUsername.setAttribute( "disabled", true );
  chatUsername.className = 'form-control disabled';
  nameFormGroup.className = 'form-group name-form-group disabled';

  // Possibly allow users to change their Username in chat later
  // var changeButton = document.createElement( 'span' );
  // changeButton.className = 'change-username';
  // changeButton.innerHTML = '<a href="#">Change</a>';
  // chatUsername.appendChild( changeButton );
}

socket.on( 'connect', function() {
    var chatForm = document.forms.chatForm;

    if ( chatForm ) {
        chatForm.addEventListener( 'submit', function(e) {
            e.preventDefault();

            socket.emit( 'postMessage', {
                username: chatUsername.value,
                message: chatMessage.value,
            });

            chatMessage.value = '';
            chatMessage.focus();
        }); // chatForm event

        socket.on( 'updateMessages', function( data ) {
            showMessage( data );
        }); // updateMessages
    } // chatForm
}); // socket

function showMessage( data ) {
    var chatDisplay = document.querySelector( '.chat-display' );
    var newMessageBox = document.createElement( 'div' );
    var now = new Date();
    var time = formatTime( now );

    if ( chatUsername.value == data.username ) {
        newMessageBox.className = 'user-text';
        newMessageBox.innerHTML = '<p class="chat-message-text">' + data.message + '<span class="chat-timestamp">' + time + '</span></p>';
    } else {
        newMessageBox.className = 'chat-text';
        newMessageBox.innerHTML = '<p class="chat-username">' + data.username + '</p><p class="chat-message-text">' + data.message + '<span class="chat-timestamp">' + time + '</span></p>';
    }

    chatDisplay.insertBefore( newMessageBox, chatDisplay.firstChild );
}

function formatTime( time ) {
  // formats a javascript Date object into a 12h AM/PM time string
  var hour = time.getHours();
  var minute = time.getMinutes();
  var amPM = ( hour > 11 ) ? "pm" : "am";

  if ( hour > 12 ) {
    hour -= 12;
  } else if ( hour == 0 ) {
    hour = "12";
  }

  if ( minute < 10 ) {
    minute = "0" + minute;
  }

  return hour + ":" + minute + ' ' + amPM;
}
