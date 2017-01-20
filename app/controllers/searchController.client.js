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
      // console.log(data);

      // Empty search results div before adding new search results
      searchResult.empty();
      
      for (var i = 0; i < data.length; i++) {
        var rating = data[i].rating;
        var name = data[i].name;
        var url = data[i].url;
        var snippet_text = data[i].snippet_text;
        var image_url = data[i].image_url;
        var id = data[i].id;

        var $div = $("<div>", { class: "list-group-item" });
        var $img = $("<img />", {
          src: image_url,
          alt: 'Image of ' + name
        });
        var $name = $("<a>", {
          href: url,
          text: name + ' - ' + rating + ' stars'
        });
        var $snippet = $("<p>", {
          text: snippet_text
        });


        $div.append($img);
        $div.append($name);
        $div.append($snippet);

        searchResult.append($div);
      }
    }, 'json');
  });
   
})();
