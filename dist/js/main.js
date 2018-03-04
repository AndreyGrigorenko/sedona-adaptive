'use strict';

;(function () {
	var menu = document.querySelector('.main-menu');
	var links = document.querySelectorAll('.main-menu a');			
	var menuClose = document.querySelector('.main-menu__close');
	var menuOpen = document.querySelector('.main-header__burger');

	menu.classList.add('hide');
	menuOpen.addEventListener('click', function(e) {
		e.preventDefault();
		menu.classList.remove('hide');		
		menu.classList.add('show');		
	});

	menuClose.addEventListener('click', function(e) {
		e.preventDefault();
		menu.classList.remove('show');
		menu.classList.add('hide');		
	});
})();