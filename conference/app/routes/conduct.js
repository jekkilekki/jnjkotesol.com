// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Speakers Route ================================
 **/
router.get( '/code-of-conduct', function( request, response ) {
    var data = request.app.get( 'appData' );

    response.render( 'conduct', {
        pageTitle: 'Code of Conduct',
        pageID: 'code-of-conduct'
    });
});

module.exports = router;
