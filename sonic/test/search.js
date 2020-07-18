var SonicChannelSearch = require("sonic-channel").Search;

// initialize sonic channel connection
var sonicChannelSearch = new SonicChannelSearch({
  host : "::1",
  port : 1491,
  auth : "parijat"
}).connect({
  connected : function() {
    console.info("Sonic Channel succeeded to connect to host (search).");
  },

  disconnected : function() {
    console.error("Sonic Channel is now disconnected (search).");
  },

  timeout : function() {
    console.error("Sonic Channel connection timed out (search).");
  },

  retrying : function() {
    console.error("Trying to reconnect to Sonic Channel (search)...");
  },

  error : function(error) {
    console.error("Sonic Channel failed to connect to host (search).", error);
  }
});

// nepali test
var searchTerm = "छोरो"
// these don't match parital docs that have only one or two of these words
//var searchTerm = "मैले नजन्माएको छोरो"
//var searchTerm = "नजन्माएको छोरो मैले"
// we cannot get stemmed results right now -- below does not work
//var searchTerm = "छोरा"

// english stemming searches
//var searchTerm = "stems"
//var searchTerm = "stem"
// these should match but don't right now
//var searchTerm = "stemming"
//var searchTerm = "steming"
// should not match
//var searchTerm = "steam"

// test search
// https://github.com/valeriansaliou/node-sonic-channel#search-channel
sonicChannelSearch.query("akshara_nepali_test", "default", searchTerm)
  .then(function(results) {
    console.log("Queried for term: ", searchTerm);
    console.debug(results)
  })
  .catch(function(error) {
    console.error(error)
  });

// test completions
//var suggestTerm = "छो"
//var suggestTerm = "मैले"
// gives only per-word suggestions (is not next word-aware)
var suggestTerm = "मै"
sonicChannelSearch.suggest("akshara_nepali_test", "default", suggestTerm)
  .then(function(results) {
    console.log("Got suggestions for term: ", suggestTerm);
    console.debug(results)
  })
  .catch(function(error) {
    console.error(error)
  });

// close sonic channel connection
/*
sonicChannelSearch.close()
  .then(function() {
    console.info("Succesfully closed connection to Sonic Channel");
  })
  .catch(function(error) {
    console.error(error)
  });
*/
