// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/schedule', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = [], otherSpeakers = [];

    data.speakers.forEach( function( item ) {
        if ( item.shortname == request.params.speakerid ) {
            pageSpeakers.push( item );
        } else {
            otherSpeakers.push( item );
        }
    });

    response.render( 'schedule', {
        pageTitle: 'Schedule',
        pageID: 'schedule',
        speakers: pageSpeakers,
        listSpeakers: otherSpeakers
    }); // views/index.ejs
});

module.exports = router;
