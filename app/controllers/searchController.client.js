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

      // Empty search results div before adding new search results
      searchResult.empty();
      
      for (var i = 0; i < data.length; i++) {
        var rating = data[i].rating;
        var name = data[i].name;
        var url = data[i].url;
        var snippet_text = data[i].snippet_text;
        var image_url = data[i].image_url;
        var id = data[i].id;

        var $div = $("<div>", {
          class: "list-group-item"
        });

        var $row = $("<div>", {
          class: "row"
        });

        var $leftDiv = $("<div>", {
          class: "leftDiv"
        });

        var $rightDiv = $("<div>", {
          class: "rightDiv"
        }); 

        var $img = $("<img />", {
          src: image_url,
          alt: 'Image of ' + name
        });

        var $name = $("<a>", {
          href: url,
          text: name + ' - ' + rating + ' stars',
          class: 'barName'
        });

        var $snippet = $("<p>", {
          text: snippet_text,
          class: 'text-italic'
        });

        var $button = $("<button>", {
          text: '0 GOING',
          class: 'going-btn btn btn-primary',
          id: id + '-btn'
        });

        $leftDiv.append($img);
        $rightDiv.append($name);
        $rightDiv.append($button);
        $rightDiv.append($snippet);
        $row.append($leftDiv);
        $row.append($rightDiv);
        $div.append($row);

        searchResult.append($div);
      }
    }, 'json');
  });

  searchResult.on("click", ".going-btn", function() {
    if (!user) {
      // Open login window
    }
    var buttonId = $(this).attr('id');
    // console.log(buttonId);
    $.post('/api/:id/bars', { buttonId: buttonId } function(data) {

    });
    

  });
   
})();
