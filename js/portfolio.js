(function () {
    window.Component.Portfolio = function(container, data) {
        var page = $('<div class="portfolio-page"></div>'), div;
        page.append('<div class="nav-button forward-button"></div>');
        page.append('<div class="nav-button backward-button"></div>');

    	for (var key in data) {
            div = $('<div class="portfolio-class"><div class="title"><span>' + data[key].name + '</span></div></div>');
            page.append(div);
            div.data('items', data[key].items);
            if (data[key].img) div.append('<div class="img-container"><img src="' + data[key].img + '" alt="project image"/></div>');
            if (data[key].detail) div.append('<div class="detail-container"><span>' + data[key].detail + '</span></div>');
            if (page.find('.portfolio-class').length >= 4) {
                container.append(page);
                page = $('<div class="portfolio-page"></div>');
                page.append('<div class="nav-button forward-button"></div>');
                page.append('<div class="nav-button backward-button"></div>');
            }

            if (data[key].items.length > 0) {
                div.click(function () {
                    window.Component.Popup.Portfolio($(this).data('items'));
                });
            } else {
                div.addClass('unclickable').attr('title', "Content will come soon.");
            }
        }

        var page_controller = $('<div class="page-controller"></div>');
        container.find('.portfolio-page').each(function() {
            var round = $('<div class="round"></div>'), t = $(this);
            page_controller.append(round);
            round.click(function() {
                if ($(this).hasClass('selected')) return;
                container.find('.portfolio-page.active').animate({opacity:0}, 500, function() {
                    $(this).removeClass('active');
                });
                t.animate({opacity:1}, 500, function() {
                    $(this).addClass('active');
                    page_controller.find('.selected').removeClass('selected');
                    t.css('margin-top', Math.round(container.height() / 2 - t.height() / 2));
                    round.addClass('selected');
                });
                
            });
        })

        container.find('.forward-button').click(function() {
            var idx = container.find('.portfolio-page').index($(this).closest('.portfolio-page'));
            var len = container.find('.portfolio-page').length;
            page_controller.find('.round').eq((idx + 1) % len).trigger('click');
        });

        container.find('.backward-button').click(function() {
            var idx = container.find('.portfolio-page').index($(this).closest('.portfolio-page'));
            var len = container.find('.portfolio-page').length;
            page_controller.find('.round').eq((idx - 1 + len) % len).trigger('click');
        });
        
        container.append(page_controller);
        container.addClass('runtime');

        $('#portfolio').on('resize', function () {
            container.find('.portfolio-page').stop(true, true);
            container.find('.portfolio-page').addClass('active').css('opacity', 0);
            var d = Math.min($('body').height() * 0.3, $('body').width() * 0.4);
            var m = container.width() * 0.02;
            container.find('.portfolio-class').each(function() {
                $(this).width(d).height(d);
                $(this).css("margin", m + 'px');
                $(this).find('.title span').css('margin-top', (d / 2 - $(this).find('.title span').height() / 2)+ 'px');
                $(this).find('.detail-container span').css('margin-top', (d / 2 - $(this).find('.detail-container span').height() / 2)+ 'px');
            });
            container.find('.portfolio-page').each(function () {
                $(this).width(2 * d + 4 * m + 10);
            });
        });

        $('#portfolio').trigger('resize');

        page_controller.find('.round').eq(0).trigger('click');
    }
} ())