$(function() {
  if(!$('body').hasClass('plugin-option')) return false;

  var addImgBtn = (function() {
    var $root = $('#add-img');

    function init () {
      $root.on('click', function () {
        var status = $root.hasClass('hover');
        if(status) {
          show();
        }
      });

      $root.find('#add-img-btn').on('click', function(event) {
        event.stopPropagation();
        add();
        hide();
      });

    }

    function show () {
      $root.removeClass('hover');
      $root.find('img').removeClass('show');
      $root.find('.form').addClass('show');
    }

    function hide () {
      $root.addClass('hover');
      $root.find('img').addClass('show');
      $root.find('.form').removeClass('show');
    }

    function add () {
      var img = {};
      img.name = $('#img-name').val();
      img.url = $('#img-url').val();

      // save to storage

    }

    return {
      init: init,
      show: show,
      hide: hide
    };
  })();

  addImgBtn.init();

});
