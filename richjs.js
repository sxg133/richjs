/*
 * Author: Sahil Grover
 * Description: A light-weight, rich text editor plugin.
 */

var richjs = richjs || {};

richjs.options = {
	toolbar: true
	controls: [
		"bold",
		"italic",
		"underline",
		"link"
	]
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
	iframe.className = 'rjs-frame';
	iframe.contentWindow.document.open();
	iframe.contentWindow.document.write(
		'<html>' +
			'<head>' +
			'</head>' +
			'<body class="rjs-frame-body">' +
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
					format('bold');
					break;
				case 'i':
					format('italic');
					break;
				case 'u':
					format('underline');
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