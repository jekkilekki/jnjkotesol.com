// Using Express.JS
var express = require( 'express' );
var router = express.Router();

/**
 * Speakers Route ================================
 **/
router.get( '/speakers', function( request, response ) {
    var info = '';
    var dataFile = request.app.get( 'appData' ); // local dataFile variable

    dataFile.speakers.forEach( function( item ) {
        // Use ES6 backticks `` to send multi-line strings
        info += `
        <li>
            <h2>${item.name}</h2>
            <p>${item.abstract}</p>
        </li>
        `;
    });
    response.send(`
        <h1>JNJ KOTESOL 2017 Regional Conference</h1>
        ${info}
    `);
});

/**
 * Speakers SINGLE Route ================================
 **/
router.get( '/speakers/:speakerid', function( request, response ) {
    var dataFile = request.app.get( 'appData' );  // local dataFile variable
    var speaker = dataFile.speakers[ request.params.speakerid ];

    response.send(`
        <h1>${speaker.title}</h1>
        <h2>with ${speaker.name}</h2>
        <p>${speaker.abstract}</p>
    `);
});

module.exports = router;
