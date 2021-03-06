// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/location', function( request, response ) {
    var data = request.app.get( 'appData' );
    // var pageSpeakers = data.speakers;

    response.render( 'location', {
        pageTitle: 'Location',
        pageID: 'location',
        // speakers: pageSpeakers
    }); // views/index.ejs
});

module.exports = router;
