// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Speakers Route ================================
 **/
router.get( '/speakers', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = data.speakers;

    response.render( 'speakers', {
        pageTitle: 'Speakers',
        pageID: 'speakers',
        speakers: pageSpeakers
    });
});

/**
 * Speakers SINGLE Route ================================
 **/
router.get( '/speakers/:speakerid', function( request, response ) {
    var data = request.app.get( 'appData' );
    var pageSpeakers = [];

    data.speakers.forEach( function( item ) {
        if ( item.shortname == request.params.speakerid ) {
            pageSpeakers.push( item );
        }
    });

    response.render( 'speakers', {
        pageTitle: 'Speaker Info',
        pageID: 'speaker-single',
        speakers: pageSpeakers
    });
});

module.exports = router;
