var appUrl = window.location.origin;

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