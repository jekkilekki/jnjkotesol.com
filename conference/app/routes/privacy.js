// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Speakers Route ================================
 **/
router.get( '/privacy', function( request, response ) {
    var data = request.app.get( 'appData' );

    response.render( 'privacy', {
        pageTitle: 'Privacy Policy',
        pageID: 'privacy'
    });
});

module.exports = router;
