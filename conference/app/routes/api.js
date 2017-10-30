// Using Express.JS
var express = require( 'express' );
var router = express.Router();
var bodyParser = require( 'body-parser' ); // middleware to take care of formatting submitted feedback data
var fs = require( 'fs' ); // standard Node module for the File System - to save data to a file
var feedbackData = require( '../data/feedback.json' );

/**
 * API Route ================================
 */
router.get( '/api', function( request, response ) {
    response.json( feedbackData );
});

router.use( bodyParser.json() );
router.use( bodyParser.urlencoded( { extended: false } ) ); // takes care of reading URL encoded data - when form submits

router.post( '/api', function( request, response ) {
    feedbackData.unshift( request.body );
    fs.writeFile( 'app/data/feedback.json', JSON.stringify( feedbackData ), 'utf8', function(err) {
        if ( err ) {
            console.log( err ); // Show the write error
        }
    });
    response.json( feedbackData );
});

router.delete( '/api/:id', function( request, response ) {
    feedbackData.splice( request.params.id, 1 );
    fs.writeFile( 'app/data/feedback.json', JSON.stringify( feedbackData ), 'utf8', function(err) {
        console.log( err ); // Show the write error
    });
    response.json( feedbackData );
});

module.exports = router;
