// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = data.speakers;
    var feedback = data.buzz;

    response.render( 'index', {
        pageTitle: 'Home',
        pageID: 'home',
        speakers: pageSpeakers,
        buzz: feedback
    }); // views/index.ejs
});

module.exports = router;
