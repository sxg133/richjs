/*
 * Author: Sahil Grover
 * Description: A light-weight, rich text editor plugin.
 */

var richjs = richjs || {};

richjs.options = {
	controls: [
		"bold",
		"italic",
		"underline",
		"link"
	]
};

richjs.richtext = function(textinput) {

	var iframe = iframe = document.createElement('iframe');

	var setupFrame = function(iframe) {
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
	}

	var updateTextInput = function() {
		textinput.value = iframe.contentWindow.document.body.innerHTML;
	}

	var format = function(command, option) {
		iframe.contentWindow.document.execCommand(command, false, option);
	}

	textinput.parentNode.insertBefore(iframe, textinput);
	setupFrame(iframe);
	textinput.style.display = 'none';
	iframe.contentWindow.document.onblur = updateTextInput;
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

	this.focus = function() {
		iframe.focus();
	}
}