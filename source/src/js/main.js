$(function() {
  // the module just run in article page!
  if(!/topics/.test(window.location.pathname)) return false;

  // inject btn to page
  (function() {
    var btnurl = chrome.extension.getURL('click_btn.html');
    $.get(btnurl, function(data) {
      $('body').append(data);
    });

    var left = ($(document).width() - $('.container').width())/2;
    $('#plugin-inject-btn').css('left', left);

    // when click btn then clean page

  })();

  var generPage = function() {
    var $root = $('.container'),
        article = {};

    // read article data
    article.title = $root.find('.topic-title').text();
    article.author = $root.find('.author').text();
    article.avatar = $root.find('.author img').attr('src');
    article.date = $root.find('span[itemprop=datePublished]').text();
    article.content = $root.find('#article').html();

    $('body').append('<div id="pluginDOM"><div id="plugin-content"></div></div>');

    var $dom = $('#pluginDOM'),
        $content = $dom.find('#plugin-content');


    $dom.css({
      'position': 'absolute',
      'top': '80px',
      'left': '0',
      'z-index': '5',
      'width': '100%',
      'height': $(document).height(),
      'background': '#e8e8e8',
      'text-align': 'center'
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
    pushToContent('article-data', article.data);
    pushToContent('article-content', article.content, 'dom');

    console.log($dom);

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
      'max-width': '95%',
      'display': 'block',
      'margin': '10px auto'
    });
    applyCSS('figure', {'margin': '0'});

    // delete needless node
    $content.find('.share').remove();
    $content.find('.gp_media_video').remove();

    // content editable
    $content.attr('contentEditable', 'true');

    // adjust style
    applyCSS('.article-content p', {
      'margin': '1.8em auto',
      'line-height': '1.5em'
    });

    applyCSS('h2', {
      'font-size': '1.5em',
      'border-left': '10px solid #7fc042',
      'padding-left': '0.5em'
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

    applyCSS('.article-content', {
      'padding-top': '6px',
      'border-top': '1px solid #ddd',
      'margin-top': '10px'
    });

    applyCSS('.main-pic img', {
      'width': '100%',
      'max-width': '100%',
      'margin-bottom': '0'
    });

    applyCSS('.abstract', {
      'padding': '18px',
      'font-size': '0.9375em',
      'color': 'rgba(38,38,38,0.82)',
      'line-height': '1.6',
      'margin-top': '0',
      'margin-bottom': '20px',
      'border': '#efefef 1px solid',
      'border-radius': '0px 0px 4px 4px',
      'background-color': '#efefef'
    });

    function applyCSS (selector, cssRule) {
      $content.find(selector).css(cssRule);
    }


  };

  generPage();


});
