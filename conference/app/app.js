

// Using Express.JS
var express = require( 'express' );
var reload = require( 'reload' );

var app = express();
var dataFile = require( './data/data.json' ); // global dataFile variable - we make it available to routes with app.set() below

// Allow User to specify a Port number
// [Terminal]$ PORT=4000 node app/app.js
app.set( 'port', process.env.PORT || 3000 );
app.set( 'appData', dataFile );
app.set( 'view engine', 'ejs' ); // Set the Views engine
app.set( 'views', 'app/views' );

app.locals.siteTitle = 'Jeonju-North Jeolla KOTESOL Regional Conference';
app.locals.allSpeakers = dataFile.speakers;

app.use( express.static( 'app/public' ) ); // adds the public folder to routes to use images, files, etc easily
app.use( require( './routes/index' ) );
app.use( require( './routes/speakers' ) );
app.use( require( './routes/schedule' ) );
app.use( require( './routes/location' ) );


var server = app.listen( app.get( 'port' ), function() {
    console.log( 'Listening on port ' + app.get( 'port' ) );
});

reload( server, app ); // Reload.JS to auto refresh our page on project changes (required above)
