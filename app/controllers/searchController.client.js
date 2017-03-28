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

  // Load search results from searchLocation value in cookies, so search
  // gets saved even if page refreshes.
  $(document).ready(function() {
    var searchLocation = document.cookie.replace(/(?:(?:^|.*;\s*)searchLocation\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(searchLocation);

    // Load search results if location cookie exists
    if (searchLocation !== "") {
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
          var buttonId = id + '-btn';

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
            id: buttonId
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

        $.get('/api/allbars', function (data) {
          // List of list-group-items which holds each bar details
          // var listGroupItems = $('.list-group-item');
          var $buttons = $('.going-btn');
          $('.going-btn').each(function(i, obj) {
            var currButtonId = obj.id;
            if (currButtonId in data) {
              var numAttending = data[currButtonId].numAttending;
              $(this).text(numAttending + ' GOING');
            }
          

          });

        }, 'json');

      }, 'json');
    }
  });


  searchButton.click(function() {

    var searchLocation = searchInput.val();
    $.get('/yelp-search', { searchLocation: searchLocation }, function(data) {

      if (data === "Error") {
        alert("Location entered is not valid. Please try again.");
        return;
      }
      document.cookie = "searchLocation=" + searchLocation;
      
      // Empty search results div before adding new search results
      searchResult.empty();
      
      for (var i = 0; i < data.length; i++) {
        var rating = data[i].rating;
        var name = data[i].name;
        var url = data[i].url;
        var snippet_text = data[i].snippet_text;
        var image_url = data[i].image_url;
        var id = data[i].id;
        var buttonId = id + '-btn';

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
          id: buttonId
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

      $.get('/api/allbars', function (data) {
        // List of list-group-items which holds each bar details
        // var listGroupItems = $('.list-group-item');
        var $buttons = $('.going-btn');
        $('.going-btn').each(function(i, obj) {
          var currButtonId = obj.id;
          if (currButtonId in data) {
            var numAttending = data[currButtonId].numAttending;
            $(this).text(numAttending + ' GOING');
          }
        

        });

      }, 'json');

    }, 'json');

    

  });

  searchResult.on("click", ".going-btn", function() {
    if (!user) {
      alert("Please log in with twitter at the top.");
    }
    else {
      var currButton = $(this);
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

      $.get('/api/:id/bars', function(data) {
        var userBars = data.businessIdList;
        if (userBars.indexOf(buttonId) === -1) {
          $.post('/api/:id/bars', {
              rating: rating,
              name: name,
              url: url,
              snippet_text: snippet_text,
              image_url: image_url,
              buttonId: buttonId
            }, function(data) {
              // console.log("post request");
              // console.log(data);
              var numAttending = data.numAttending;
              currButton.text(numAttending + ' GOING');
          });
        }
        else {
          $.delete('/api/:id/bars', {
            buttonId: buttonId
          }, function(data) {
            console.log(data);
            if (data === "Document removed") {
              currButton.text('0 GOING');
            }
            else {
              var numAttending = data.numAttending;
              currButton.text(numAttending + ' GOING');
            }
            
          })
        }

      });
    }

  });
   
})();
