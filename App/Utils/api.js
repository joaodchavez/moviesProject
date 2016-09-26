var api = {

  getMovie(movieName){
    var url = `https://www.omdbapi.com/?t=${movieName}&y=&plot=full&r=json`;
    return fetch(url).then((res) => res.json())
  },
  // getIDMB(movieName){
  //   var url = `http://www.imdb.com/title/${movieName.imdbID}`

  //http://www.omdbapi.com/
  // }


  addNote(username, note){
    username = username.toLowerCase().trim();
    var url = `https://native-gh-notetaker.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;