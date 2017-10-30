// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 */
router.get( '/chat', function( request, response ) {
    var data = request.app.get( 'appData' );

    response.render( 'chat', {
        pageTitle: 'Chat',
        pageID: 'chat',
    }); // views/index.ejs
});

module.exports = router;
