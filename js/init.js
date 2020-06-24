(function () {
    window.Component = window.Component ? window.Component : {};
    
    window.App = {
        init: function() {
            var pages = $('.fluid-page'), home_slider = $('#home .slider'), resume = $('#about .resume-container'),
                profile = $('#profile > .profile-container'), portfolio = $('#portfolio > .portfolio-container'), nav = $('.header .navigater'), bar = $('.scroller');
            pages.each(function() {
                $(this).height(window.innerHeight);
            });
            $('a.logo').attr('href', location.protocol+'//'+location.host+location.pathname);

            Component.Scroll(function () {
                var pageCenter = Math.floor(pages.length / 2);
                pages.each(function(index, page) {
                    if (index === pageCenter) {
                        nav.append('<a class="logo" href="" ><img src="./icons/hua.png"></a>');
                    }
                    page = $(page);
                    var navtag = $('<div class="nav-button button" target="' + page.attr("id") + '">' + page.attr("literal") + '</div>'),
                        bartag = $('<div class="scroll-button button" target="' + page.attr("id") + '"><span class="round"></span><label>' + page.attr("literal") + '</label></div>');
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
            if (background.height() < body.height()) {
                background.removeClass('vertical');
            } else if (background.height() < body.height()) {
                background.addClass('vertical');
            }

            $(window).on('resize', function () {
                if (background.width() < body.width()) {
                    background.removeClass('vertical');
                } else if (background.height() < body.height()) {
                    background.addClass('vertical');
                }
            });

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
                    }, 500 + t, function() {
                        beginner.remove();
                        $('.header').removeClass('collapsed');
                    });
                }, t);
            }, 300);
        }
    };
} ())