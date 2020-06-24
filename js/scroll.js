(function () {
	var ismoving = false;
    window.Component.Scroll = function(init, actfun) {
    	var currentPage = 0;
    	var pages = $('.fluid-page'), max = pages.length - 1;
        var isiPad = navigator.userAgent.match(/iPad|android|iPhone|iPod/i) != null;


    	$(window).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
    		event.preventDefault();
            if ($('body').hasClass('overscreen-covered')) return false;
    		if (ismoving) return;
    		var dir = event.originalEvent.detail ? event.originalEvent.detail : event.originalEvent.wheelDelta;
    		onEventScroll(pages, dir, max, actfun);
			return false; // prevent default
    	});

        if (isiPad) {
            // var scrollTop = 0, st, isscrolling = false, idx;
            // $(window).on('scroll', function(e) { 
            //     e.preventDefault();
            //     if (isscrolling == false) {
            //         isscrolling = true;
            //         st = $(this).scrollTop();

            //         $('body').stop();

            //         idx = $('.navigater .nav-button').index($('.navigater .nav-button.active'));

            //         if (st < scrollTop) {
            //             if (idx > 0) $('.navigater .nav-button').eq(idx - 1).trigger('click');
            //         } else {
            //             if (idx < $('.navigater .nav-button').length - 1) $('.navigater .nav-button').eq(idx + 1).trigger('click');
            //         }

            //         scrollTop = st;
            //         setTimeout(function () {
            //             isscrolling = false;
            //         }, 1000);
            //     }
            //     return false;
            // });
        }

    	$(document).keydown(function(event) {
    		if (ismoving) return;
    		var dir;
    		if (event.which == 38) dir = 1;
    		else if (event.which == 40) dir = -1;
    		else return;
    		event.preventDefault();
    		onEventScroll(pages, dir, max, actfun);
    	})
    	initScroller(pages, init);
    }

    function initScroller(pages, init) {
    	init();
    	pages.each(function(index, page) {
    		$(page).prepend('<a name="' + $(page).attr('id') + '" />');
    	});
    }
    function gotoPage(pages, idx) {
    	$('body').stop();
    	ismoving = true;
        $('.picture.played > video').trigger('click');
    	$('body').animate({ scrollTop: pages.eq(idx).offset().top + 'px' }, 500, function() {
            $('body').addClass('moving');
            setTimeout(function () {
                $('body').removeClass('moving');
            }, 1000);
    		window.location = location.protocol+'//'+location.host+location.pathname + "#" + pages.eq(idx).attr('id');
    		ismoving = false;
    	});
    }
    function onEventScroll(pages, dir, max, actfun) {
    	currentPage = pages.index($('.fluid-page' + window.location.hash));
		if (dir > 0) {
			if (currentPage != 0) {
				gotoPage(pages, currentPage-1);
				currentPage--;
			}
		} else {
			if (currentPage < max) {
				gotoPage(pages, currentPage+1);
				currentPage++;
			}
		}
		actfun.apply(currentPage);
    }
} ())