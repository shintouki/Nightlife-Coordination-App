'use strict';

(function () {
  var 
  var searchResult = $('#search-result');
  var apiUrl = appUrl + '/api/:id';

  $("#id_of_textbox").keyup(function(event){
    if(event.keyCode == 13){
      $("#id_of_button").click();
    }
  });
   
})();
