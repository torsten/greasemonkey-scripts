// ==UserScript==
// @name         Google SSL + Related Search Links
// @namespace    http://torstenbecker.eu/
// @match        https://encrypted.google.com/*
// @author       Torsten Becker, Erik Vergobbi Vold
// @description  Adds the missing links to Google Images, etc. when using Google SSL Search.
// ==/UserScript==

// Based on http://stackoverflow.com/questions/2246901/
//   include-jquery-inside-greasemonkey-script-under-google-chrome
// Chrome + userscripts:
//   http://www.chromium.org/developers/design-documents/user-scripts

// a function that loads jQuery and calls a callback function when jQuery has
// finished loading
function runAfterJQueryLoad(callback) {
  var script = document.createElement("script");
  script.setAttribute("src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function patchGbar() {
  var urlSafeQuery = escape($('input[name="q"]').val());
  
  // Markup based on http://google.com, added https:// to links
  // only where it works reliably:
  
  var links = [
    {title:'Images', link: 'http://www.google.com/images?q=' + urlSafeQuery },
    {title:'Maps', link: 'http://maps.google.com/maps?q=' + urlSafeQuery },
    {title:'News', link: 'https://news.google.com/news?q=' + urlSafeQuery },
    {title:'Scholar',link:'http://scholar.google.com/scholar?q=' +urlSafeQuery},
    {title:'Bing', link:'http://www.bing.com/search?setmkt=en-WW&q=' +
        urlSafeQuery }
  ];
  
  var bar = '<div id="gbz"><ol class="gbtc"> \
      <li class="gbt"> \
        <a class="gbzt gbz0l gbp1" id="gb_1" \
          onclick="gbar.qsj(this)" \
          href="http://www.google.com/webhp?hl=en&amp;tab=ww" target="_blank" \
          name="gb_1"><span class="gbts">Web</span></a>\
      </li>';
  
  for (var i = 0; i < links.length; i++) {
    bar += '<li class="gbt"><a class="gbzt" id="gb_' + (2 + i) +'" \
              onclick="gbar.qsj(this)" href="' + links[i].link +
              '" name="gb_'+ (2 + i) + '"><span class="gbts">' +
              links[i].title + '</span></a> \
            </li>';
  }
  
  bar += '</ol></div>';
  
  $('div#gbw').prepend(bar);
}

runAfterJQueryLoad(patchGbar);
