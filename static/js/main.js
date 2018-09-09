;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() || !isiPhone() ) {
			$('.js-fullheight-home').css('height', $(window).height() - $('.main-nav').height());
			$(window).resize(function(){
				$('.js-fullheight-home').css('height', $(window).height()  - $('.main-nav').height());
			})
		}
	};

	// Loading page
	var loaderPage = function() {
		$(".xai-loader").fadeOut("slow");
	};

	var fh5coTabs = function() {
		// $('.xai-tabs-container').
		$('.xai-tabs li a').click(function(event){
			event.preventDefault();
			var $this = $(this),
				tab = $this.data('tab');
				$('.xai-tabs li').removeClass('active');
				$this.closest('li').addClass('active');
				$this.closest('.xai-tabs-container').find('.xai-tab-content').removeClass('active');
				$this.closest('.xai-tabs-container').find('.xai-tab-content[data-tab-content="'+tab+'"]').addClass('active');
		});
	}

	var gridAutoHeight = function() {
		if (!isiPhone() || !isiPad()) {
			$('.xai-grid-item').css('height', $('.xai-2col-inner').outerHeight()/2);
		}
		$(window).resize(function(){
			if (!isiPhone() && !isiPad()) {
				$('.xai-grid-item').css('height', $('.xai-2col-inner').outerHeight()/2);
			}
		});
	}

	var sliderSayings = function() {
		$('#xai-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
	  	});
	}

	var offcanvasMenu = function() {
		$('body').prepend('<div id="xai-offcanvas" />');
		$('body').prepend('<a href="#" class="js-xai-nav-toggle xai-nav-toggle"><i></i></a>');

		$('.main-nav .xai-menu-1 a, .main-nav .xai-menu-2 a').each(function(){

			var $this = $(this);

			$('#xai-offcanvas').append($this.clone());

		});
		// $('#xai-offcanvas').append
	};

	var mainMenuSticky = function() {
		
		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.main-nav');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('xai-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('xai-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};
	
	// Parallax
	var parallax = function() {

		// $(window).stellar();
		$(window).stellar({ horizontalScrolling: false });

		// if (!isiPhone() || isiPad() ) {
 		// 	$(window).stellar({ horizontalScrolling: false });
 		// }

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-xai-nav-toggle', function(event){

			var $this = $(this);

			if( $('body').hasClass('offcanvas-visible') ) {
				$('body').removeClass('offcanvas-visible xai-overflow');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-visible xai-overflow');
				$this.addClass('active');
			}

			event.preventDefault();

		});

	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var scrollPos = $(this).scrollTop();

			
		   if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-xai-nav-toggle').removeClass('active');
		   }

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-xai-nav-toggle').removeClass('active');
		   }
		});
		
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#xai-offcanvas, .js-xai-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {

    			$('body').removeClass('offcanvas-visible');
    			$('.js-xai-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;		
		});
		$('.main-nav a:not([class="external"]), #xai-offcanvas a:not([class="external"]), a.xai-content-nav:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500, 'easeInOutExpo');	
			    	
			   }

		    event.preventDefault();

		    // return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {
		
		$('.main-nav a[data-nav-section], #xai-offcanvas a[data-nav-section]').removeClass('active');
		$('.main-nav, #xai-offcanvas').find('a[data-nav-section="'+section+'"]').addClass('active');
		
	};

	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	


	// Document on load.
	$(function(){

		fullHeight();
		loaderPage();
		fh5coTabs();
		gridAutoHeight();

		// sliderMain();
		// sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		mobileMenuOutsideClick();
		clickMenu();
		navigationSection();
		goToTop();

	});


}());