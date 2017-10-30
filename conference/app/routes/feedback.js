// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/feedback', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = data.speakers;

    response.render( 'feedback', {
        pageTitle: 'Feedback',
        pageID: 'feedback',
    }); // views/index.ejs
});

module.exports = router;
