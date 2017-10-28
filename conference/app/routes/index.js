// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Homepage Route ================================
 **/
router.get( '/', function( request, response ) {
    response.send(`
        <h1>JNJ KOTESOL 2017 Regional Conference</h1>
        <p>Hello World</p>
    `);
});

module.exports = router;
