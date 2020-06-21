(function () {
    window.Component.Popup = {};

    var Popup = window.Component.Popup;

    function blockScroll(e) {
        e.preventDefault();
        return false;
    }
    $(document).keyup(function(event) {
    	if (event.keyCode == 27) {
    		Popup.removeOver();
    	}
    })

    Popup.overScreen = function() {
    	var over;
    	if ($('.overscreen').length > 0) over = $('.overscreen > :not(.close-button)').remove();
    	else {
            over = $('<div class="overscreen"><div class="close-button"></div>').appendTo($('body'));
            $('body').addClass('overscreen-covered');
            over.find('.close-button').click(function () {
                Popup.removeOver();
            });
            $(window).on('scroll', blockScroll);
        }
    	return over;
    }

    Popup.removeOver = function() {
        $('body').removeClass('overscreen-covered');
    	$('.overscreen').remove();
        $(window).off('scroll', blockScroll);
    }

    Popup.pictureOver = function(picture) {
    	var container = Popup.overScreen();
    	container.append('<img src="' + picture.src + '">');

        if (picture.marks) {
            picture.marks.forEach(function(m, i) {
                var ma = $('<div class="mark"><div class="title">' + m.title + '</div><div class="detail">' + m.detail + '</div></div>');
                ma.css(m.css);
                container.append(ma);
            });
        }
    }

    Popup.Portfolio = function (pictures) {
        function createImg(picture) {
            var img = $('<div class="img-container loading"><img class="" src="' + picture.src + '"></div>');
            if (picture.marks) {
                picture.marks.forEach(function(m, i) {
                    var ma = $('<div class="mark"><div class="title">' + m.title + '</div><div class="detail">' + m.detail + '</div></div>');
                    ma.css(m.css);
                    img.append(ma);
                });
            }
            return img;
        }
        
        function seek(delta, callback) {
            current = (previous + delta + pictures.length) % pictures.length;
            cimg = createImg(pictures[current]);

            var m_id = window.Component.Alter.Message("Loading Image");

            pimg.after(cimg);

            cimg.find('img').on('load', function () {
                window.Component.Alter.Remove(m_id);
                if (delta > 0) {
                    cimg.css('left', pimg.position().left + pimg.width());
                    cimg.animate({left: slider.width() / 2 - cimg.width() / 2, opacity:1}, 1000, function () {
                        cimg.removeClass('loading');
                        pimg.remove();
                        pimg = cimg;
                        previous = current;
                        if (callback) callback.apply(this);
                    });
                } else {
                    cimg.css('right', slider.width() - pimg.position().left);
                    cimg.animate({right: slider.width() / 2 - cimg.width() / 2, opacity:1}, 1000, function () {
                        cimg.removeClass('loading');
                        pimg.remove();
                        pimg = cimg;
                        previous = current;
                        if (callback) callback.apply(this);
                    });
                }
            });
        }

        var container = Popup.overScreen();
        var slider = $('<div class="portfolio-slider overscreen-child"></div>');
        var current = 0, previous = 0;
        var cimg, pimg;

        container.append('<div class="nav-button forward-button"></div><div class="nav-button backward-button"></div>');
        container.append(slider);

        cimg = createImg(pictures[0]);
        slider.append(cimg);
        pimg = cimg;
        cimg.find('img').on('load', function () {
            cimg.removeClass('loading');
        });

        container.find('.forward-button').click(function () {
            if (container.hasClass('seeking')) return;
            container.addClass('seeking');
            seek(1, function () {
                container.removeClass('seeking');
            });
        });

        container.find('.backward-button').click(function () {
            if (container.hasClass('seeking')) return;
            container.addClass('seeking');
            seek(-1, function () {
                container.removeClass('seeking');
            });
        });

        Hammer(container[0]).on("swiperight", function () {
            container.find('.backward-button').trigger('click');
        });

        Hammer(container[0]).on("swipeleft", function () {
            container.find('.forward-button').trigger('click');
        });
    }
} ())