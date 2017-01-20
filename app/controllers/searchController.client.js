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
    var searchLocation = searchInput.val();
    $.get('/yelp-search', { searchLocation: searchLocation }, function(data) {
      console.log(data);
    }, 'json');
  });
   
})();
