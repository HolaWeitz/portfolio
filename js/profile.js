(function () {
    window.Component.Profile = function(container, data) {
    	var dcontroller = container.find('.details-controller'), dcontainer = container.find('.details-container');
        var page = $('#profile'), head = container.find('.profile-head'), img = container.find('.profile-head > img'),
            details = container.find('.details');

        for (var key in data) {
            var button = $('<div class="controller-button" id="dcbutton_' + key + '" key="' + key + '">' + data[key].label + '</div>');
            var content = $('<div class="detail-content ' + key + '"></div>');

            button.data('content', content);

            data[key].details.forEach(function(c, i) {
                content.append('<div>' + c + '</div>');
            });

            content.find('img').each(function () {
                $(this).on('load', function () { $('#profile').trigger('resize'); });
            });
            dcontainer.append(content);
            dcontroller.append(button);

            button.click(function() {
                if ($(this).hasClass('clicked')) return;
                $(this).parent().find('.clicked').removeClass('clicked');
                $(this).addClass('clicked');

                $(this).data('content').parent().find('.actived').removeClass('actived');
                $(this).data('content').addClass('actived');
            });
        }


        dcontroller.find('.controller-button').eq(0).click();

        var min, maxheight, padding, margin;
        
        $('#profile').on('resize', function () {
            margin = Math.round(container.height() / 2 - details.height() / 2 + 35);
            details.css("margin-top", margin + "px");
            margin = Math.round(container.height() / 2 - head.height() / 2 + 45);
            head.css("margin-top", margin + "px");
        })
    
        $('#profile').trigger('resize');
    }
} ())