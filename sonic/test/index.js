var SonicChannelIngest = require("sonic-channel").Ingest;

// initialize sonic channel connection
var sonicChannelIngest = new SonicChannelIngest({
  host : "::1",
  port : 1491,
  auth : "parijat"
}).connect({
  connected : function() {
    console.info("Sonic Channel succeeded to connect to host (ingest).");
  },

  disconnected : function() {
    console.error("Sonic Channel is now disconnected (ingest).");
  },

  timeout : function() {
    console.error("Sonic Channel connection timed out (ingest).");
  },

  retrying : function() {
    console.error("Trying to reconnect to Sonic Channel (ingest)...");
  },

  error : function(error) {
    console.error("Sonic Channel failed to connect to host (ingest).", error);
  }
});

var docText = "मैले नजन्माएको छोरो";
//var docText = "मेरो छोरो";

// for english stemming searches
//var docText = "This is a test for stems"

// test index
// https://github.com/valeriansaliou/node-sonic-channel#ingest-channel
sonicChannelIngest.push("akshara_nepali_test", "default", "doc:1", docText)
  .then(function() {
    console.log("Indexed test document: ", docText);
  })
  .catch(function(error) {
    console.error(error)
  });

// close sonic channel connection
/*
sonicChannelIngest.close()
  .then(function() {
    console.info("Succesfully closed connection to Sonic Channel");
  })
  .catch(function(error) {
    console.error(error)
  });
*/
