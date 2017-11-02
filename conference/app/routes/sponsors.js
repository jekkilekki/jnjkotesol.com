// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/sponsors', function( request, response ) {
    var data = request.app.get( 'appData' );
    // var pageSpeakers = data.speakers;

    response.render( 'sponsors', {
        pageTitle: 'Sponsors',
        pageID: 'sponsors',
        // speakers: pageSpeakers
    }); // views/index.ejs
});

module.exports = router;
