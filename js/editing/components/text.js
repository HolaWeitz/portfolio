(function () {
    var Text = window.Editor.components.Text ? window.Editor.components.Text : {};
    window.Editor.components.Text = Text;

    Text.html = '<div class="component"></div>';
    Text.name = "Text";
    Text.class = "Text";
    Text.css = {width: "50%", height: "50%", top:"10%", left:"10%", padding:"10px"};

    Text.editing = function() {
    	var t = $(this), ed;
    	t.on('dblclick', function() {
    		initTinymce(t, ed);
    	});
    	
    }


    function initTinymce(t, ed) {
    	tinymce.init({
			selector: "." + Text.class + "#" + t.attr('id'),
			theme: "modern",
			inline: true,
			width: t.width(),
			height: t.height(),
			plugins: [
			     "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
			     "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
			     "save table contextmenu directionality emoticons template paste textcolor"
			],
			content_css: "./js/tinymce/css/content.css",
			toolbar: "insertfile undo redo | fontselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
			theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
			fontsize_formats: "8pt 9pt 10pt 11pt 12pt 26pt 36pt",
			setup: function(editor) {
			    editor.on('init', function(e) {
			        editor.setContent(t.html());
			        ed = editor;
			    });
			}
	    });
    }
} ())