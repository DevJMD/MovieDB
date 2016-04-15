#Node MovieDB

An simple precompiled ES2016 Node wrapper to pull data from [The Open Movie Database](http://www.omdbapi.com/) using Promises.

###Install
    > npm install --save node-moviedb

###Usage (ES5/2016)
	// ES6
    import MovieDB from 'node-moviedb';

    // Require
    var MovieDB = require('node-moviedb');

###Parameters
See http://www.omdbapi.com/#parameters for both Search and Get parameters.

###MovieDB.search([Query], [Options], [Callback]);


    MovieDB.search('Prison Break', {...}, (err, response) => {
    	if (err) console.log(err);
    	console.log(response);
    });

This will return the following:

    [
        body: [
           {
               Title: 'Prison Break',
               Year: '2005–2009',
               imdbID: 'tt0455275',
               Type: 'series',
           	   Poster: 'http://ia.media-imdb.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg'
           },
           ...
        ],
        pagination: [
            next: { id: 2 },
            previous: null,
            pages: [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]
        ],
        totalResults: 21
    ]

###MovieDB.get([IMDB ID], [Options], [Callback]);

    MovieDB.get('tt0455275', {...}, (err, response) => {
	    	if (err) console.log(err);
			console.log(response);
    });


This will return the following:

    {
        Title: 'Prison Break',
        Year: '2005–2009',
        Rated: 'TV-14',
        Released: '29 Aug 2005',
        Runtime: '44 min',
        Genre: 'Action, Crime, Drama',
        Director: 'N/A',
        Writer: 'Paul Scheuring',
        Actors: 'Dominic Purcell, Wentworth Miller, Amaury Nolasco, Robert Knepper',
        Plot: 'Structural Engineer Michael Scofield turns himself...',
        Language: 'English, Spanish',
        Country: 'USA',
        Awards: 'Nominated for 2 Golden Globes. Another 4 wins & 24 nominations.',
        Poster: 'http://ia.media-imdb.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg',
        Metascore: 'N/A',
        imdbRating: '8.5',
        imdbVotes: '312,638',
        imdbID: 'tt0455275',
        Type: 'series',
        Response: 'True'
    }

### PR & Contributions
I am open to pull requests/contributions! Fire them away.

###Testing
It's such a small wrapper that I've decided the need for complexity isn't necessary. This may change over time.

###Issues
No known issues!

###License
MIT
