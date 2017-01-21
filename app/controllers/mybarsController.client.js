'use strict';

(function () {

  var userBars = $('#user-bars');

  $(document).ready(function() {
    
    $.get('/api/:id/bars', function(data) {
      var userBusinessIds = data.businessIdList;

      $.get('/api/allbars', function(data) {
        for (var i = 0; i < userBusinessIds.length; i++) {
          var currBarObj = data[userBusinessIds[i]];

          var businessId = currBarObj.businessId;
          var numAttending = currBarObj.numAttending;
          var image_url = currBarObj.image_url;
          var snippet_text = currBarObj.snippet_text;
          var url = currBarObj.url;
          var name = currBarObj.name;
          var rating = currBarObj.rating;

          
        }

      });

    });

  });

  userBars.on("click", ".going-btn", function() {
    if (!user) {
      // Open login window
    }
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
            var numAttending = data.numAttending;
            currButton.text(numAttending + ' GOING');
        });
      }
      else {
        $.delete('/api/:id/bars', {
          buttonId: buttonId
        }, function(data) {
          var numAttending = data.numAttending;
          currButton.text(numAttending + ' GOING');
        })
      }

    });

  });


})();
