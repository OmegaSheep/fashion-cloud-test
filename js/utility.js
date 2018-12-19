module.exports = {
  // Borrowed From - https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  // Just for fun / more interesting data than a random number.
  randomData: function randomData() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  // PLEASE DEFINE ME
  mongoURI: function mongoURI() {
    return "";
  },
  itemLimit: function itemLimit() {
    return 10;
  },
  // In milliseconds
  TTL: function TTL() {
    return 300000;
  }
}
