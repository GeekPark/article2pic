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
        // add ok and then refesh page
        location.reload();
      });
    }

    function initDeleteBtn () {
      // listen img delete
      $('.js-deleteimg').on('click', function () {
        var key = $(this).siblings('.des').text();
        deleteimg(key);
        location.reload();
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
      pluginTool.add('footerimg', img.name ,img.url);
    }

    function deleteimg (key) {
      // delete from storage
      pluginTool.remove('footerimg', key);
    }

    return {
      init: init,
      initDeleteBtn: initDeleteBtn
    };
  })();

  addImgBtn.init();

  // Load all storaged img
  (function() {
    var $template = $('#pic-item-template');

    pluginTool.read('footerimg', function(data) {
      var imgs = $.parseJSON(data.footerimg);
      for (img in imgs) {
        $item = $template.clone();
        $item.css({
          'background': 'url('+ imgs[img] +') center center no-repeat',
          'background-size': 'cover'
        });
        $item.find('.des').text(img);
        $item.removeClass('hide');
        $('#footerimg').prepend($item);
      }

      // when all img loaded , then init delete btn
      addImgBtn.initDeleteBtn();
    });

  })();

  (function() {
    // save style config
    $root = $('#article-style');

    // loda storaged data
    pluginTool.read('style', function(data) {
      if(!$.isEmptyObject(data)) {
        var style = $.parseJSON(data.style);
        for (var i = 0; i < style.length; i++) {
          var item = style[i];
          var $li = $root.find('li[data-selector="'+ item.selector +'"]');
          $li.find('input').val(item.value);
        };
      }
    });

    $root.find('#article-style-save').on('click', function () {
      // save config and reload page
      var data = [];
      $root.find('#style-form input').each(function() {
        var item = {};
        item.selector = $(this).parents('li').eq(0).data('selector');
        item.value    = $(this).val();
        data.push(item);
      });

      // save to chrome storage
      var jsondata = JSON.stringify(data);
      pluginTool.save('style', jsondata);
      location.reload();
    });
  })();
});
