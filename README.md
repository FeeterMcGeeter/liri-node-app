# liri-node-app

### Description
**Liri** is the language equivalent of **Siri**.  Instead of speaking a command, we use text to ask for information.  In this app, you will use the command line to ask **Liri** about songs from Spotify, venues for a particular band or artist, or search for information on your favorite movies.  

### Instructions
1. Navigate to the command line
2. Run the following command 
   * node liri.js followed by one of the following...
     - concert-this 'artist/band name here'
     - spotify-this-song 'song name here'
     - movie-this 'movie name here'

You can even run the following command to see the information from the default text file
- node liri.js do-what-it-says

### Technologies Used
* Node-Spotify-API
* OMDB API
* Bands In Town API
* Node JS
* Axios
* Moment
* Javascript

### Videos of each command
* [spotify-this-song](https://drive.google.com/file/d/1BulcnSy_HBN-hJz7pKFUb_-324yNJZfF/view)

* [concert-this](https://drive.google.com/file/d/1U7ujpiGijiU8LQVZc6CzfeGQSjjshGL5/view)

* [movie-this](https://drive.google.com/file/d/1eOaTZK5z4BbvoS_Y1WIcoT5kjRiTbXt3/view)

* [do-what-it-says](https://drive.google.com/file/d/174ZubJqbvwYreJK9dGJuj5I3E9ZXauBm/view)


### Role in App Development
My role in developing this CLI App was...
1. Installing the necessary npm packages used for **Liri**
2. Retrieving the dependencies for package.json
3. Creating the "behind the scenes" files used for functionality
   * .env
   * .gitignore
   * random.txt (this is the default text displayed when nothing is entered)
   * log.txt (the data entered will output to this file to be stored)
   * keys.js (this holds the spotify API key and secret that is exported to liri.js)
4. Creating the liri.js file where all the magic happens!
5. Setting up the APIs in the liri.js file and appending the information to the command line as well as the log.txt file
6. Testing the app for functionality
7. Deploying the app to GitHub pages
