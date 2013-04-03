/*
 * Author: Sahil Grover
 * Description: A light-weight, rich text editor plugin.
 */

var richjs = richjs || {};

richjs.Control = {
	BOLD: "bold",
	ITALIC: "italic",
	UNDERLINE: "underline",
	LINK: "link"
}

richjs.options = {
	toolbar: true,
	controls: [
		richjs.Control.BOLD,
		richjs.Control.ITALIC,
		richjs.Control.UNDERLINE,
		richjs.Control.LINK
	],
	classNames: {
		toolbar: 'rjs-toolbar',
		iframe: 'rjs-frame',
		iframeBody: 'rjs-frame-body',
		boldButton: 'rjs-button-bold'
	}
};

richjs.richtext = function(textinput) {

	var updateTextInput = function() {
		textinput.value = iframe.contentWindow.document.body.innerHTML;
	}

	var format = function(command, option) {
		iframe.contentWindow.document.execCommand(command, false, option);
	}

	// create and setup iframe
	var iframe = iframe = document.createElement('iframe');
	textinput.parentNode.insertBefore(iframe, textinput);
	iframe.className = richjs.options.classNames.iframe;
	iframe.contentWindow.document.open();
	iframe.contentWindow.document.write(
		'<html>' +
			'<head>' +
			'</head>' +
			'<body class="' + richjs.options.classNames.iframeBody + '">' +
			'</body>' +
		'</html>'
	);
	iframe.contentWindow.document.close();
	iframe.contentWindow.document.designMode = "On";

	// hide the textarea and update when the iframe loses focus
	textinput.style.display = 'none';
	iframe.contentWindow.document.onblur = updateTextInput;

	// handle formatting w/ shortcut keys
	iframe.contentWindow.document.onkeypress = function(e) {
		var key = String.fromCharCode(e.charCode);
		if (e.ctrlKey) {
			e.preventDefault();
			switch (key) {
				case 'b':
					format(richjs.Control.BOLD);
					break;
				case 'i':
					format(richjs.Control.ITALIC);
					break;
				case 'u':
					format(richjs.Control.UNDERLINE);
					break;
				default:
					break;
			}
		}
	}

	var createFormatButton = function(command, className, value) {
		var button = document.createElement('input');
		button.type = 'button';
		button.className = className;
		button.value = value;
		button.onclick = function() {
			iframe.contentWindow.document.execCommand(command);
			iframe.focus();
		}
		return button;
	}

	// setup toolbar
	if (richjs.options.toolbar) {
		var toolbar = document.createElement('div');
		toolbar.className = richjs.options.classNames.toolbar;
		iframe.parentNode.insertBefore(toolbar, iframe);
		for (var i=0, ii=richjs.options.controls.length; i<ii; i++) {
			var c = richjs.options.controls[i];
			switch(c) {
				case richjs.Control.BOLD:
					var button = createFormatButton(richjs.Control.BOLD, richjs.options.classNames.boldButton, 'B');
					button.style.fontWeight = 'bold';
					toolbar.appendChild(button);
					break;
				case richjs.Control.ITALIC:
					var button = createFormatButton(richjs.Control.ITALIC, richjs.options.classNames.italicButton, 'I');
					button.style.fontStyle = 'italic';
					toolbar.appendChild(button);
					break;
				case richjs.Control.UNDERLINE:
					var button = createFormatButton(richjs.Control.UNDERLINE, richjs.options.classNames.underlineButton, 'U');
					button.style.textDecoration = 'underline';
					toolbar.appendChild(button);
					break;
				case richjs.Control.LINK:
					break;
				default:
					break;
			}
		}
	}

	// set focus on rich text area
	this.focus = function() {
		iframe.focus();
	}
}