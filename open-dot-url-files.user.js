// ==UserScript==
// @name         .URL file opener for Google Chrome
// @namespace    http://torstenbecker.eu/
// @match        file://*.URL
// @match        file://*.url
// @author       Torsten Becker
// @description  Enables Chrome to handle .URL files (internet shortcuts, usually created on Windows) and navigates to their referenced location.
// ==/UserScript==

// Installation notes:
// 1. Use your operating system to associate Chrome with .URL files.
// 2. After installing in Chrome, go to Window => Extensions
//    (or to chrome://extensions/) and check "Allow access to file URLs".

(function () {
  var invalid = 'Invalid .URL file: ';
  var content = document.body.innerHTML;
  
  var urlLoc = content.indexOf('URL=');
  if(urlLoc == -1)
  {
    alert(invalid + 'Does not contain a URL= line.');
    return;
  }
  
  var nlLoc = content.indexOf("\n", urlLoc);
  if(nlLoc < urlLoc + 8)
  {
    alert(invalid + 'Could not determine end of URL.');
    return;
  }
  
  document.location = content.slice(urlLoc + 4, nlLoc);
})();
