// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Speakers Route ================================
 **/
router.get( '/team', function( request, response ) {
    var data = request.app.get( 'appData' );
    var teamMembers = data.team;

    response.render( 'team', {
        pageTitle: 'Team',
        pageID: 'team',
        team: teamMembers
    });
});

module.exports = router;
