(function () {
    window.Component.Slider = function(container, elements, pictureEvent, extraFn) {
    	var slidercontainer = $('<div class="silder-container"></div>');
    	var slidernav = $('<div class="silder-navigator"></div>');
        var current;

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    	container.append(slidernav);
    	container.append(slidercontainer);
        window.loading_pis = elements.length - 1;
    	elements.forEach(function(ele, index) {
            if (ele.youtube) {
                var pid = 'p_' + index;
                var pic = $('<div class="picture"><div id="' + pid + '"></div></div>');
                var intId = setInterval(function () {
                    if (window.YT && YT.Player) {
                        var player = new YT.Player(pid, {
                            height:'100%',
                            width: '100%',
                            videoId: ele.youtube,
                            events: {
                                'onReady': function () {
                                    pic.children().eq(0).on('pause', function () {
                                        player.stopVideo();
                                    });
                                }
                            }
                        });
                        clearInterval(intId);
                    }
                }, 100);
            } else {
                var pic = $('<div class="picture">' + (ele.html ? ele.html : ('<img src="' + ele.thumb + '" alt="thumb image"/>')) + '</div>');
            }
    		var thumb = $('<div class="thumb"><img src="' + ele.thumb + '" /></div>');
    		if (extraFn) extraFn.apply(ele, [pic, thumb]);
    		if (pictureEvent) pic.addClass('clickable').click(pictureEvent);
    		slidercontainer.append(pic);
    		slidernav.append(thumb);
            if (ele.css) pic.css(ele.css);
            if (ele.img_class_name) pic.find('img').addClass(ele.img_class_name);
    		pic.find('img').on('load', function() {
                if (pic.hasClass('loaded')) {
                    window.Component.Alter.Remove(pic.data('alter_id'));
                    window.loading_pis--;
                    return;
                }
                if ($(this).hasClass('hor_expand')) {
                
                } else {
                    if (pic.width() >= $(this).width()) {
                        $(this).addClass('vec_expand');
                        $(this).css('margin-top', Math.round((pic.height() - $(this).height()) / 2) + 'px');
                    } else {
                        $(this).css('margin-left', Math.round((pic.width() - $(this).width()) / 2) + 'px');
                    }
                }
                pic.data('alter_id', window.Component.Alter.Message("Loading Image", -1, pic, "blured blink"));
    			$(this).attr('src', ele.url);
                pic.addClass('loaded');
    		});
            if (pic.find('video').length > 0) {
                var overlay = $('<div class="overlay"></div>');
                pic.append(overlay);
                overlay.click(function () {
                    pic.find('video').trigger('click');
                });
                pic.find('video').on('pause', function () {
                    this.pause();
                });
            }
            pic.find('video').click(function () {
                if (pic.hasClass('played')) {
                    this.pause();
                    pic.removeClass('played');
                } else {
                    this.play();
                    pic.addClass('played');
                }
            });
    		thumb.click(function() {
                current.trigger('pause');
				pic.addClass('active');
				slidercontainer.animate(
					{ scrollLeft: slidercontainer.scrollLeft() + pictures.eq(index).offset().left + 'px' }, 
					function () {
						slidercontainer.find('.active').removeClass('active');
					});
                slidernav.find('.clicked').removeClass('clicked');
                $(this).addClass('clicked');
                current = pic.children();
    		});
    	});
        
        current = slidercontainer.find('.picture').eq(0).children();
    	var pictures = container.find('.picture');

        slidernav.find('.thumb').eq(0).trigger('click');
    }
} ())