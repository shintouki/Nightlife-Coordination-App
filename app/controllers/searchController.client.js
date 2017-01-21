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
          class: 'barName',
        });

        $name
          .append($('<span></span>')
            .addClass('name')
            .text(name)
          )
          .append(' - ')
          .append($('<span></span>')
            .addClass('rating')
            .text(rating)
          )
          .append(' stars');

        var $snippet = $("<p>", {
          text: snippet_text,
          class: 'snippet-text text-italic'
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
    
    // Extract bar data from html
    var grandparent = $(this).parent().parent();
    var leftDiv = grandparent.find('.leftDiv');
    var rightDiv = grandparent.find('.rightDiv');

    var rating = rightDiv.find('a').find('.rating').text();
    var name = rightDiv.find('a').find('.name').text();
    var url = rightDiv.find('a').attr('href');
    var snippet_text = rightDiv.find('.snippet-text').text();
    var image_url = leftDiv.find('img').attr('src');

    // console.log(rating);
    // console.log(name);
    // console.log(url);
    // console.log(snippet_text);
    // console.log(image_url);
    $.get('/api/:id/bars', function(data) {
      var userBars = data;
      if (userBars.indexOf(buttonId) === -1) {
        $.post('/api/:id/bars', {
            rating: rating,
            name: name,
            url: url,
            snippet_text: snippet_text,
            image_url: image_url,
            buttonId: buttonId
          }, function(data) {
            console.log("post request");
            console.log(data);
        
        });
      }
      else {
        $.delete('/api/:id/bars', {
          buttonId: buttonId
        }, function(data) {
          console.log("delete req");
          console.log(data);
        })
      }

    });

    
    

  });
   
})();
