(function () {
	window.Component.Alter = {};

    var Alter = window.Component.Alter;

    var _ids = [], _id = 0;

    Alter.Message = function (str, timeout, container, classnames) {
    	if (!container) $('.alter-div').removeClass('actived');

    	_id++;

        var _container = container ? container : $('body');
    	var message = $('<div class="actived alter-div' + (classnames ? " " + classnames : "") + '" id="alter_div_' + _id + '">' + str +'</div>');
    	message.data('id', _id);

    	_ids.push(_id);

        if (container) {
            message.css('position','absolute');
        }
    	_container.append(message);

    	message.css({top: _container.height() / 2});
    	if (timeout && timeout > 0) {
    		setTimeout(function () {
    			Alter.Remove(message.data('id'));
    		}, timeout);
    	}

    	return _id;
    }

    Alter.Remove = function (id) {
    	$('#alter_div_' + id).remove();
    	delete _ids[_ids.indexOf(id)];

    	$('#alter_div_' + _ids[_ids.length - 1]).addClass('actived');
    }
} ())