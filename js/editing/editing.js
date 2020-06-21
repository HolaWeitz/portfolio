(function () {
    window.Editor = window.Editor ? window.Editor : {};
    window.Editor.components = window.Editor.components ? window.Editor.components : {};
    var Editor = window.Editor;

    Editor.removeList = [".mce-container", ".editingMode", ".slider > *", ".scroller > *", ".navigater > *"];
    Editor.Editing = function () {
        var button = $('<div class="floatButton editingMode">Save</div>');
        $('body').append(button);

        button.click(Editor.Save);
        for (var name in Editor.components) {
            var c = Editor.components[name], components = $('.component.' + c.class);
            components.each(function(index, com) {
                c.editing.apply(com);
            });
        }
    }

    Editor.Save = function () {
        var clone = $('body').clone();

        Editor.removeList.forEach(function(r, idx) {
            clone.find(r).remove();
        });

        clone.find('[contenteditable="true"]').removeAttr('contenteditable');
        jQuery.ajax({
            type: "POST",
            url: "setting.php",
            data: { 'html': clone.html() },
            dataType: 'text',
            error: function (XMLHttpRequest, error, errorThrown) {
                alert(error);
                alert(errorThrown);
            },
            success: function (response) {
                var message = $('<div class="dialog message">' + response + '</div>');
                message.css({ right: '45%', top: '40%' });
                $('body').append(message);
                setTimeout(function () {
                    message.remove();
                }, 1000);
            }
        });
    }

    $(window).load(function () {
        Editor.Editing();
    });

} ())