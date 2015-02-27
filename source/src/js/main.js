$(function() {

  // inject dom to page
  (function() {
    var btnurl = chrome.extension.getURL('click_btn.html');
    $.get(btnurl, function(data) {
      $('body').append(data);
    });

    var left = ($(document).width() - $('.container').width())/2;
    $('#plugin-inject-btn').css('left', left);

  })();


});
