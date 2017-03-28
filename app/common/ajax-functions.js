var appUrl = window.location.origin;

// ajax functions for using get, post, delete, etc.
var ajaxFunctions = {
  ready: function ready (fn) {
    if (typeof fn !== 'function') {
       return;
    }

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  },

  ajaxRequest: function ajaxRequest (method, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }
};