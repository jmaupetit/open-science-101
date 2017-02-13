require('reveal.js/lib/js/head.min.js');

// DOM
require('./index.html');

// Styles
require('reveal.js/css/reveal.css');
require('reveal.js/lib/css/zenburn.css');
require('./scss/tailordev.scss');

// Reveal
var Reveal = require('reveal.js');

// Attach var to global window scope for reveal plugins
window.Reveal = Reveal;

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  width: '100%',
  height: '100%',
  margin: 0,

  transition: 'fade',
  dependencies: [
    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
    { src: 'js/vendor/reveal.js/classList.js', condition: function() { return !document.body.classList; } },

    // Interpret Markdown in <section> elements
    { src: 'js/vendor/reveal.js/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'js/vendor/reveal.js/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },

    // Syntax highlight for <code> elements
    { src: 'js/vendor/reveal.js/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
  ],
});
