$( '.site-mobile-menu-button' ).click( function() {
  if( $( '.site-menu-bar' ).hasClass( 'active' ) ) {  $( '.site-menu-bar' ).removeClass( 'active'); }
  else { $( '.site-menu-bar' ).addClass( 'active' ); }
});
