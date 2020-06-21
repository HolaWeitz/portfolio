(function () {
    window.Component = window.Component ? window.Component : {};
    
    window.App = {
        init: function() {
            window.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

            var pages = $('.fluid-page'), home_slider = $('#home .slider'), resume = $('#about .resume-container'),
                profile = $('#profile > .profile-container'), portfolio = $('#portfolio > .portfolio-container'), nav = $('.header .navigater'), bar = $('.scroller');
            pages.each(function() {
                $(this).height(window.innerHeight);
            });
            $('a.logo').attr('href', location.protocol+'//'+location.host+location.pathname);

            Component.Scroll(function () {
                pages.each(function(index, page) {
                    page = $(page);
                    var navtag = $('<div class="nav-button button" target="' + page.attr("id") + '">' + page.attr("label") + '</div>'),
                        bartag = $('<div class="scroll-button button" target="' + page.attr("id") + '"><span class="round"></span><label>' + page.attr("label") + '</label></div>');
                    nav.append(navtag);
                    bar.append(bartag);
                    navtag.click(function() {
                        $("[target].active").removeClass('active');
                        $('[target="' + page.attr("id") + '"]').addClass('active');
                        window.location = location.protocol+'//'+location.host+location.pathname + "#" + page.attr('id');
                    });
                    bartag.click(function() {
                        $("[target].active").removeClass('active');
                        $('[target="' + page.attr("id") + '"]').addClass('active');
                        window.location = location.protocol+'//'+location.host+location.pathname + "#" + page.attr('id');
                    });
                });
            }, function () {
                $('[target]').removeClass('active');
                nav.find('.nav-button').eq(this).addClass('active');
                bar.find('.scroll-button').eq(this).addClass('active');
            })

            Component.Slider(home_slider, Data.home_pictures, function() {
                //Component.Popup.pictureOver($(this).find('img').attr('src'));
            }, function(pic, thumb) {
                pic.append('<div class="info">' + this.info + '</div>');
            });

            var body = $('body'), background = $('.background img');
            if (background.height() >= body.height()) {
                var cheight = $('.content').height() - body.height(), offset = background.height() - body.height(), r = offset / cheight;
                $(window).on('scroll', function(e) { 
                    background.parent().css({top: -$(this).scrollTop() * r});
                });
                background.parent().css({top: -$(window).scrollTop() * r});
            } else {
                background.addClass('vertical');
                background.css('margin-left', (body.width() / 2 - background.width() / 2) + 'px');
            }
            var bwidth = background.width(), ml = parseFloat(background.css('margin-left'));
            background.height(background.height());
            background.width(bwidth * 1.1).css('margin-left', ml - bwidth * 0.05);

            Component.Resume(resume, Data.resume);
            Component.Profile(profile, Data.profile);
            Component.Portfolio(portfolio, Data.portfolio);
            $('[target="' + (window.location.hash ? window.location.hash.replace("#", "") : "home") + '"]').addClass('active');

            var beginner = $('.beginner');
            setTimeout(function () {
                var t = 0;
                if (window.loading_pis != 0) {
                    t = 1000;
                }
                beginner.find('.blink').removeClass('blink').text("Hua Yan");
                setTimeout(function () {
                    beginner.animate({
                        opacity:0,
                        "word-spacing": "+=200",
                        "font-size": "+=2em"
                    }, 1500 + t, function() {
                        beginner.remove();
                        $('.header').removeClass('collapsed');
                        background.animate({
                            width: bwidth,
                            'margin-left': ml
                        }, 4000, function() {
                            background.css({'width':'', 'height':''});
                        });
                    });
                }, t);
            }, 300);
        }
    };
} ())