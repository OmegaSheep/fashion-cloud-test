module.exports = {
  // Borrowed From - https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  // Just for fun / more interesting data than a random number.
  randomData: function randomData(text) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
