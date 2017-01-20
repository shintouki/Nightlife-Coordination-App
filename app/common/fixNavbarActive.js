$(document).ready(function () {
  // Fix active nav bar tab highlighting
  var pathname = window.location.pathname;
  // Find current active nav bar tab by searching for a href equal to current path.
  var currAnchor = $('a[href="' + pathname + '"]');
  // Set the li element above the anchor to have class active to highlight it
  $(currAnchor).parent().addClass("active");
});