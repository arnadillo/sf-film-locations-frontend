# veerum-challenge-frontend
React application that displays map locations of movies filmed in San Francisco, according to the data set [DataSF:Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). Markers (with textual labels) are shown upon successful query of a movie title present in the data set.<br><br> Written for the Veerum technical challenge, submitted by Arnold Padillo on August 29, 2019.

**See the repository for the API server of this application for more details: [veerum-challenge-data-server](https://github.com/arnadillo/veerum-challenge-data-server)**

## Getting started
Requires NodeJS `>= v8.14.0` to be installed on your machine.

**This application also depends on the `REACT_APP_GOOGLE_API_KEY` env var being loaded, carrying a google api key.**

```
$> cd veerum-challenge-frontend
$> npm install
$> npm start
```

The application will occupy port number 3000, and a successful startup is represented by the following:

```
Compiled successfully!

You can now view veerum-challenge-frontend in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://<ip-address>:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Shortly after, your browser should open with the application.

## See it in action
[Screencast](https://www.screencast.com/t/EuLJLjhM1G1)


## High-level approach
For this React App, I leveraged the `react-google-maps` library to display an interactive map, centering on San Francisco on app start-up. On user input submission, the `/locations` API at [veerum-challenge-data-server](https://github.com/arnadillo/veerum-challenge-data-server) is queried with the input string, assuming that it is a movie title from the dataset. Input is normalized via `.toLowerCase()` so that finding the data is a case-insensitive operation.

If the API endpoint responds with location data for the input, the state of the app is changed to absorb the model and populate the map with markers that are positioned based on the geographical coordinates obtained by the API response, for the particular movie queried. Else, we have no data to work with and nothing is displayed.


## Known limitations
* The implementation relies heavily on Google Map APIs to geocode. Not all the location strings in the data set are straightforward and understood by the geocoding API, so it is evident that the addresses that are most complete and identifiable (e.g. "301 Rolph Street") will yield more accurate results when compared to ambiguous addresses (e.g. "Driving around Taylor/Pacific/Leavenworth"). To tackle this challenge further (and given more time), I would have explored an approach involving Natural Language Processing to arrive at more complete and accurate addresses to feed the geocoding API.

* The `/locations` query endpoint does not work on partial title matches. It expects exact string matches (although it is case insensitive). In other words, the API endpoint will not be able to find the movie title `'Veno'`, but it _will_ find the movie title `'Venom'` or `vEnOM`.

* Ran out of time and wasn't able to write tests for the front-end.

## Potential Enhancements
* For sake of better user experience, there should be better messaging to the user whenever no results are found.


* Marker labelling is currently just floating text - A more pleasant experience might be a separate frame that expands when a marker is clicked, in the case where the user wants to see more information about the marked location.

* The map viewport and focus should adjust according to the spread of the markers. This will make it convenient for the users such that they only have to do micro-adjustments in their map dragging as opposed to long drags.



## Technologies
ReactJS






