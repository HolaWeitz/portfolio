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
    		//contact: $('<div class="textR"><div class="larger black">' + data.contact.name + '</div></div>'),
    		education: prefillEle(data.education),
    		experience: prefillEle(data.experience),
    		honors: prefillEle(data.honors),
            activities: prefillEle(data.activities),
            volunteer: prefillEle(data.volunteer),
    		projects: prefillEle(data.projects),
            publication: prefillEle(data.publication),
    	};

		//coms.contact.append('<div title="phone number"><a href="tel:' + data.contact.phone + '">' + data.contact.phone + '</a></div>');
    	//coms.contact.append('<div title="email"><address><a href="mailto:' + data.contact.email + '">' + data.contact.email + '</a></address></div>');

    	fillConent(coms.education, data.education, function(t, d) {
    		d.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span class="textL" style="width:40%;">' + it.degree + '</span><span class="textL" style="width:50%;">' + it.detail + '</span><span class="textR">' + it.gpa + '</span></div>');
	    	});
    	});
    	fillConent(coms.experience, data.experience, function(t, d) {
    		d.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span style="width:20%;">' + it.year + '</span><span style="width:25%;">' + it.position + '</span><span>' + it.company + '</span></div>');
				if (it.detail && it.detail.length) t.append('<div class="table-div"><span style="width:20%;"></span><span style=""></span><span>' + it.detail + '</span></div>');
	    	});
    	});
    	fillConent(coms.honors, data.honors, function(t, d) {
    		t.append('<div class="black item-name">' + d.award.name + '</div>');
    		d.award.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span style="width:5%;">' + it.year + '</span><span style="width:65%;">' + it.name + '</span><span style="width:30%;">' + it.position + '</span></div>');
	    	});
	    	t.append('<div class="black item-name">' + d.scholarship.name + '</div>');
    		d.scholarship.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span style="width:5%;">' + it.year + '</span><span style="width:65%;">' + it.name + '</span><span style="width:30%;">' + it.position + '</span></div>');
	    	});
    	});
    	fillConent(coms.publication, data.publication, function(t, d) {
    		d.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span>' + it.name + '</span><span>' + it.author + '</span><span>' + it.details + '</span></div>');
	    	});
    	});
    	fillConent(coms.projects, data.projects, function(t, d) {
    		d.subs.forEach(function (e, i) {
                t.append('<div class="table-div larger project-name"><span>' + e.name + '</span></div>');
                e.items.forEach(function (it, idx) {
                    t.append('<div class="table-div black item-name"><span>' + it.name + '</span></div>');
                    it.items.forEach(function(itm, i) {
                        t.append('<div class="table-div"><span style="width:25%">' + itm.date + '</span><span style="width:55%;">' + itm.name + '</span><span>' + itm.local + '</span></div>');
                    });
                });
            });
    	});
    	fillConent(coms.activities, data.activities, function(t, d) {
    		d.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span style="width:25%;">' + it.date + '</span><span>' + it.name + '</span></div>');
	    	});
    	});
    	fillConent(coms.volunteer, data.volunteer, function(t, d) {
    		d.items.forEach(function (it, idx) {
				t.append('<div class="table-div"><span style="width:25%;">' + it.date + '</span><span>' + it.name + '</span></div>');
	    	});
    	});
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

        if (window.isTouch) { 
            Hammer(container[0]).on("swiperight", function () {
                container.find('.backward-button').trigger('click');
            });

            Hammer(container[0]).on("swipeleft", function () {
                container.find('.forward-button').trigger('click');
            });
        }

    	container.append(page_controller);
    	container.addClass('runtime');
    	page_controller.find('.round').eq(0).trigger('click');


    }
} ())