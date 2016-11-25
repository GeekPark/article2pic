$(function() {
  // the module just run in article page!
  if(!/topics/.test(window.location.pathname)) return false;

  var generPage = function() {
    var $root = $('.main-wrap'),
        article = {};

    // read article data
    article.title = $root.find('.topic-title').text();
    article.author = $root.find('.author span').text();
    article.date = $root.find('.release-date').text();
    article.content = $root.find('#article-body').html();

    $('body').append('<div id="pluginDOM"><div id="plugin-content"></div></div>');

    var $dom = $('#pluginDOM'),
        $content = $dom.find('#plugin-content');

    $('body').css('background-color', '#E8E8E8');

    $dom.css({
      'position': 'absolute',
      'top': '80px',
      'left': '0',
      'z-index': '500',
      'width': '100%',
      'height': $(document).height(),
      'background': '#e8e8e8',
      'text-align': 'center',
      '-webkit-font-smoothing': 'antialiased'
    });

    $content.css({
      'width': '720px',
      'background': '#fff',
      'text-align': 'left',
      'margin': 'auto',
      'padding': '20px'
    });
    pushToContent('article-title', article.title);
    pushToContent('article-date', article.date);
    pushToContent('article-author', article.author);
    pushToContent('article-content', article.content, 'dom');

    // remove img lazy load
    $content.find('img').each(function () {
      $(this)
        .removeClass('js-lazy blur loaded')
        .attr('src', $(this).data('src') + '?imageView2/2/w/750')
        .removeData('action src original vw');
    });

    // append footerimg dom
    $content.append('<img id="article-footerimg" class="hide"></div>');

    function pushToContent (classname, data, type) {
      type = type || 'text';
      $content.append('<div class="'+classname+'"></div>')
      if(type === 'text') {
        $content.find('.'+classname).text(data);
      } else {
        $content.find('.'+classname).html(data);
      }
    };

    // adjust <img> size
    applyCSS('img',{
      'width': '100%',
      'margin': '5px auto',
      'height': 'auto',
      'display': 'block'
    });
    applyCSS('figure', {'margin': '0'});

    // delete needless node
    $content.find('embed, video, .gp_media_video').remove();

    // convert picture tag to normal img tag
    $content.find('picture').each(function () {
      var $this = $(this);
      var $img = $this.find('img').eq(0).clone();
      $img.attr('src', $img.attr('srcset'));
      $this.after($img);
      $this.remove();
    });

    // remove all empty p tag
    $content.find('p').filter(function () {
      return this.innerHTML
        .replace("&nbsp;"," ")
        .trim()
        == ""
    }).remove();

    // put data from <figure> tag
    // wechat will auto add <p> to <figure>
    (function() {
      var $figure = $content.find('figure').eq(0);
      var $bannerimg = $figure.find('img').clone();

      $figure.after($bannerimg);
      $figure.remove();
    })();


    // content editable
    $content.attr('contentEditable', 'true');

    // adjust style
    applyCSS('.article-content p', {
      'margin': '1.4em 0'
    });


    applyCSS('h2', {
      'font-size': '1.6em',
      'border-left': '10px solid #7fc042',
      'padding-left': '0.5em',
      'margin': '0.6em auto',
      'font-weight': '400',
      'line-height': '1.5em',
      'color': '#000'
    });

    applyCSS('.article-title', {
      'font-size': '1.5em',
      'margin-bottom': '2px'
    });

    applyCSS('.article-date,.article-author', {
      'display': 'inline-block',
      'margin-right': '20px',
      'color': '#888'
    });

    applyCSS('a', {
      'color': '#1ABC9C'
    });

    applyCSS('.article-content', {
      'padding-top': '6px',
      'border-top': '1px solid #ddd',
      'margin-top': '10px'
    });

    applyCSS('blockquote', {
      'color': '#666666',
      'font-size': '1em',
      'padding-left': '1em',
      'border-left': '4px solid #dddddd',
      'line-height': '1.5em'
    });

    applyCSS('blockquote.abstract', {
      'padding': '18px',
      'font-size': '0.9375em',
      'color': 'rgba(38,38,38,0.82)',
      'line-height': '1.6',
      'margin': '0',
      'border': '#efefef 1px solid',
      'border-radius': '0px 0px 4px 4px',
      'background-color': '#efefef'
    });

    // Load remote style . Security ?
    // Remote style should be a JSON
    // format:
    // [
    //   {"selector":".article-title","value":"font-size: 12em;"},
    //   {"selector":".article-date","value":"balabala"},
    //   {"selector":".article-author","value":"nihaowa"}
    // ]
    // like bwlow data
    // Load user style
    pluginTool.read('style', function(data) {
      if($.isEmptyObject(data)) return;
      var userStyle = $.parseJSON(data.style);
      applyStyle(userStyle);
    });

    function applyStyle (styleArr) {
      for (var i = 0; i < styleArr.length; i++) {
        var item = styleArr[i],
            $target = $content.find(item.selector),
            oldstyle = $target.attr('style'),
            newstyle = item.value;
        // if(oldstyle) newstyle = oldstyle + newstyle;
        $target.attr('style', mergeStyle(oldstyle, newstyle));
      };
    }

    function mergeStyle (oldstyle, newstyle) {
      var oldArr = String(oldstyle).trim().split(/\s*[:;]\s*/),
          newArr = String(newstyle).trim().split(/\s*[:;]\s*/),
          styleObj = {}, key, i, result = '';
      for (i = 0; i < oldArr.length; i += 2) {
        styleObj[oldArr[i]] = oldArr[i + 1];
      }
      for (i = 0; i < newArr.length; i += 2) {
        styleObj[newArr[i]] = newArr[i + 1];
      }
      delete styleObj[''];
      delete styleObj[undefined];
      for (key in styleObj) {
        result += key + ': ' + styleObj[key] + '; ';
      }
      return result;
    }

    $.getJSON('http://77g0kp.com1.z0.glb.clouddn.com/article-style.json?' + Math.random(), function(d) {
      applyStyle(d);
    });

    // change footer img
    (function() {
      var $panel = $('#plugin-option-panel'),
          $nowPanel = $panel.find('#footerimg-panel'),
          $template = $nowPanel.find('#footerimg-option-template');

      // Get all footerimg and fill to option
      pluginTool.read('footerimg', function(data) {
        var imgdata;
        if(!$.isEmptyObject(data.footerimg)) {
          imgdata = $.parseJSON(data.footerimg);
        } else {
          imgdata = {};
        }
        for (img in imgdata) {
          var name = img,
              url  = imgdata[img],
              $item = $template.clone();

          $item.removeClass('hide');
          $item.css({
            'background-image': 'url('+ url +')'
          });
          $item.data('imgurl', url);
          $item.find('.name').text(name);
          $item.removeAttr('id');
          $item.removeClass('hide');
          $nowPanel.append($item);
        }

        // img hover blur effect
        $nowPanel.find('.footerimg-item').hover(function(event) {
          $(this).siblings('.footerimg-item').addClass('blur');
        }, function() {
          $(this).siblings().removeClass('blur');
        });

        // footerimg btn click listener .
        $nowPanel.find('.footerimg-item').on('click', function () {
          var imgurl = $(this).data('imgurl'),
              $footerimg = $content.find('#article-footerimg');

          $footerimg
            .attr('src', imgurl)
            .removeClass('hide')
            .css({
              'width': '100%',
              'max-width': '100%'
            });

          // slide to bottom
          $('html,body').animate({
            scrollTop: parseInt($footerimg.offset().top - 250) + 'px'
          }, 800);
        });

      });
    })(); // change footer img end

    // append codeblock items
    (function() {
      pluginTool.read('codeblock', function(d) {
        if (d.codeblock === undefined) return;
        var block = JSON.parse(d.codeblock);
        for (var item in block) {
          if (item === 'top') {
            $content.prepend(block[item]);
          }

          if (item === 'bottom') {
            $content.append(block[item]);
          }

          if (item === 'dianping') {
            if (block[item] === '') return;

            formatDianPing(_template(block[item]));
          }
        }
      });
    })();

    function formatDianPing(tmpl) {
      $content.find('p')
        .filter(function() {
          return /点评：/.test(this.innerHTML);
        })
        .each(function() {
          const text = $(this).text();
          const resultHTML = tmpl({ text: text });
          $(this).replaceWith(resultHTML);
        });
    }

    var optionPanel = (function() {
      var $panelDOM = $('#plugin-option-panel');
      function show () {
        $panelDOM.addClass('show');
        $panelDOM.css('top', 80 + $('#plugin-inject-btn').height() + 'px');
      }

      function hide () {
        $panelDOM.removeClass('show');
      }
      return {
        show: show,
        hide: hide
      };
    })();

    optionPanel.show();

    function applyCSS (selector, cssRule) {
      $content.find(selector).css(cssRule);
    }
  }; // generPage() end

  // inject btn to page
  (function() {
    var btnurl = chrome.extension.getURL('click_btn.html');
    $.get(btnurl, function(data) {
      $('body').append(data);

      // generPage when click post btn
      $('#plugin-post-to-wechat,#plugin-post-to-weibo').on('click', function () {
        var type = $(this).data('type');
        generPage();
        // hide btn and get type
        $('#plugin-post-to-wechat,#plugin-post-to-weibo').addClass('hide');
        $('#plugin-manage-footerimg').removeClass('hide')
                                    .on('click', function () {
                                      window.open(chrome.extension.getURL("options.html"));
                                    });

        if(type == 'weibo') {
          $('#plugin-generpic').removeClass('hide');
          var $pluginContent = $('#plugin-content');

          // weibo style
          $pluginContent.css({
            'width': '570px',
            'padding': '15px',
            'font-size': '25px'
          }).find('p').css({
            'line-height': '40px'
          }).find('h2').css({
            'font-size': '1.3em',
          }).hide();

          // 微博长图将所有的h2替换，因为h2转图片会使标题字错乱
          // hack : fix h2 title text insanity error
          $pluginContent.find('h2').each(function() {
            var $this = $(this);
            var style = $this.attr('style');
            var $newTitle = $(document.createElement('div'));
            $newTitle.text($this.text());
            $newTitle.attr('style', style);
            $newTitle.css('padding-left', '30px');
            $this.after($newTitle);
            $this.remove();
          });


          // set crossOrigin be avoid canvas toDataURL security exception
          $pluginContent.find('img').prop('crossOrigin', 'Anonymous');
        } // if weibo end

        $('#plugin-generpic').on('click', function () {
          // translate dom to pic and download
          var element = document.getElementById('plugin-content');
          html2canvas(element, {
            allowTaint: true,
            onrendered: function(canvas) {
              // var img = canvas.toDataURL("image/jpeg");
              $('#plugin-content').remove();
              // console.log(canvas.toDataURL());
              $('#pluginDOM').append(canvas);
              alert('图片已生成，请右键保存');
              // console.log(img);
              // $('#pluginDom')
              // download(img, document.title + ".jpg", "image/jpeg");
            }
          });

          // chrome.tabs.captureVisibleTab(function(data) {
          //   console.log(data);
          // });
        });
      });
    });

    var left = ($(document).width() - $('.container').width())/2;
    $('#plugin-inject-btn').css('left', left);

    // when click btn then clean page

  })();
});

// inject button html
$(function() {
  if(!/activities\//.test(window.location.pathname)) return false;
  if(/wechat$/.test(window.location.pathname)) return false;

  var btnurl = chrome.extension.getURL('click_btn.html');

  $.get(btnurl, function(data) {
    $('body').append(data);

    $('#plugin-inject-btn a').addClass('hide');

    $('#plugin-event').removeClass('hide')
      .on('click', function() {
        location.href += '/wechat';
      });
  });
});
