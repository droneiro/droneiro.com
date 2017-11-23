import 'application.css.sass'

const FastClick = require('fastclick');

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

window.onscroll = window.onload = function() {
  var previous;
  if (window.pageYOffset > window.innerHeight / 2) {
    document.body.classList.add('header-is-compact');
  } else {
    document.body.classList.remove('header-is-compact');
  }
  return previous = window.pageYOffset;
};
