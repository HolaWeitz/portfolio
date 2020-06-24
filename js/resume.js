(function () {
    var offset = 40;
	function prefillEle(data) {
		var root = $('<div class="resume-part readable"><div class="part-title larger"><span>' + data.name + '</span></div></div>');
		return root;
	}

	function fillConent(container, data, fn) {
		fn.apply(this, [container, data]);
	}
    window.Component.Resume = function(container, data) {
    	var page = $('<div class="resume-page"></div>');
    	var coms = {
    	};

    	
    	for(var c in coms) {
    		page.append(coms[c]);
    	}
    	container.append(page);
    	container.height($(window).height() - offset);

    	function sepratePage(container, page, height) {
    		var sum = 0, newpage;
    		page.children('.resume-part').each(function(idx, part) {
    			if (sum + $(part).height() > height) {
    				newpage = $('<div class="resume-page active"></div>');
                    page.append('<div class="nav-button forward-button"></div>');
                    page.append('<div class="nav-button backward-button"></div>');
                    newpage.append('<div class="nav-button forward-button"></div>');
                    newpage.append('<div class="nav-button backward-button"></div>');
    				page.children(':not(.nav-button)').slice(idx - 1, page.children().length).appendTo(newpage);
    				container.append(newpage);
    				sepratePage(container, newpage, height);
    				return false;
    			}
    			sum += $(part).height();
    		});
            container.find('.active').removeClass('active');
    	}
    	
    	sepratePage(container, page, container.height());

    	var page_controller = $('<div class="page-controller"></div>');
    	container.find('.resume-page').each(function() {
    		var round = $('<div class="round"></div>'), t = $(this);
    		page_controller.append(round);
    		round.click(function() {
    			if ($(this).hasClass('selected')) return;
    			container.find('.resume-page.active').animate({width:0, opacity:0}, 500, function() {
    				$(this).css('width','');
                    // $(this).css('width', $(this).width());
    				$(this).removeClass('active');
    			});
    			t.animate({width:800, opacity:1}, 500, function() {
    				$(this).css('width','');
                    // $(this).css('width', $(this).width());
    				$(this).addClass('active');
    				page_controller.find('.selected').removeClass('selected');
	    			t.css('margin-top', Math.round(container.height() / 2 - t.height() / 2 + offset / 2));
	    			round.addClass('selected');
    			});
    			
    		});
    	})

        container.find('.forward-button').click(function() {
            var idx = container.find('.resume-page').index($(this).closest('.resume-page'));
            var len = container.find('.resume-page').length;
            page_controller.find('.round').eq((idx + 1) % len).trigger('click');
        });

        container.find('.backward-button').click(function() {
            var idx = container.find('.resume-page').index($(this).closest('.resume-page'));
            var len = container.find('.resume-page').length;
            page_controller.find('.round').eq((idx - 1 + len) % len).trigger('click');
        });

    	container.append(page_controller);
    	container.addClass('runtime');
    	page_controller.find('.round').eq(0).trigger('click');


    }
} ())