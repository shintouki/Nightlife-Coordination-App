var appUrl = window.location.origin;

// Create a custom delete function that looks like a regular jquery function
$.delete = function(url, data, success, dataType) {
 
  if ( $.isFunction(data) ){
    type = type || callback;
    callback = data;
    data = {}
  }
 
  return $.ajax({
    type: 'DELETE',
    url: url,
    data: data,
    success: success,
    dataType: dataType
  });
}