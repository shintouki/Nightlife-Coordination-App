'use strict';

(function () {

  var searchInput = $('#search-input');
  var searchButton = $('#search-button');
  var searchResult = $('#search-result');
  var apiUrl = appUrl + '/api/:id';

  searchInput.keyup(function(event) {
    if(event.keyCode == 13){
      searchButton.click();
    }
  });

  searchButton.click(function() {
    var Yelp = require('yelp');
    
    var yelp = new Yelp({
      consumer_key: 'consumer-key',
      consumer_secret: 'consumer-secret',
      token: 'token',
      token_secret: 'token-secret',
    });

    console.log(yelp);
  });
   
})();
