// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/schedule', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = data.speakers;

    response.render( 'schedule', {
        pageTitle: 'Schedule',
        pageID: 'schedule',
        speakers: pageSpeakers
    }); // views/index.ejs
});

module.exports = router;
