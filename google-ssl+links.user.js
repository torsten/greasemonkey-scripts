// ==UserScript==
// @name         Google SSL + Related Search Links
// @namespace    http://torstenbecker.eu/
// @match        https://encrypted.google.com/search*
// @author       Torsten Becker, Erik Vergobbi Vold
// @description  Adds the missing links to Google Images, etc when using Google SSL.
// ==/UserScript==

// Based on http://stackoverflow.com/questions/2246901/
//   include-jquery-inside-greasemonkey-script-under-google-chrome
// Chrome + userscripts:
//   http://www.chromium.org/developers/design-documents/user-scripts

// a function that loads jQuery and calls a callback function when jQuery has
// finished loading
function runAfterJQueryLoad(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function patchGbar() {
  var urlSafeQuery = escape($('input[name="q"]').val());
  
  // CSS classes, ids and inline javascript based on http://google.com markup,
  // added https:// to links where it works reliably:
  
  var gbar = document.createElement("div");
  gbar.id = 'gbar';
  gbar.innerHTML = '<nobr><b class="gb1">Web</b>' + 
  ' <a href="http://www.google.com/images?q=' + urlSafeQuery +
  '" onclick="gbar.qs(this)" class="gb1">Images</a> '+
  ' <a href="http://maps.google.com/maps?q=' + urlSafeQuery +
  '" onclick="gbar.qs(this)" class="gb1">Maps</a> ' +
  ' <a href="https://news.google.com/news?q=' + urlSafeQuery +
  '" onclick="gbar.qs(this)" class="gb1">News</a> ' +
  ' <a href="http://scholar.google.com/scholar?q=' + urlSafeQuery +
  '" onclick="gbar.qs(this)" class="gb1">Scholar</a> ' +
  '</nobr>';
  
  $('#gog').prepend(gbar);
}

runAfterJQueryLoad(patchGbar);
