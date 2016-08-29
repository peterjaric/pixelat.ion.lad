var width = 10;
var height = 10;
var x, y;
var tweetLink, copyLink;

var isOn = function(pixel) {
	return pixel.classList.contains('on');
}

var hideCopyText = function() {
	var copyTextElem = document.getElementById('copy-text');	
	if (copyTimeout != 0) {
		clearTimeout(copyTimeout);
		copyTimeout = 0;
	}
	copyTextElem.classList.add('hidden');	
};

var clickPixel = function(e) {
	this.classList.toggle('on');

	// Hide copy text immediately, it is irrelevant now
	hideCopyText();
};

var setup = function() {
  var pixel;
  var editor = document.getElementById('editor');

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      pixel = document.createElement('div');
      pixel.className = 'pixel off';
      pixel.id = 'pixel-' + x + '-' + y;
      pixel.onclick = clickPixel;
      editor.appendChild(pixel);
			if (x === 0) {
				pixel.classList.add('first');
			}
    }
  }
}

var getShareText = function() {
  var id, pixel, x, y;
  var output = '';
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      id = 'pixel-' + x + '-' + y;
      pixel = document.getElementById(id);
      output += (isOn(pixel) ? '\u2b1b': '\u2b1c');
    }
    output += '\n';
  }
	output += '\nhttp://pixelat.ion.land';
	return output;
}

var tweet = function(e) {
	e.preventDefault();
  var text = getShareText();
	location.href = 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(text); 
};


var copyTimeout = 0;

var copy = function(e) {
	try {
		e.preventDefault();

		if (copyTimeout != 0) {
			clearTimeout(copyTimeout);
			copyTimeout = 0;
		}
		
		var text = getShareText();
		var copyTextElem = document.getElementById('copy-text');	
		var output = document.getElementById('output');
		output.value = text;
		copyTextElem.classList.remove('hidden');	

		output.focus();
		output.setSelectionRange(0, output.value.length);

		copyTimeout = setTimeout(function() {
			copyTimeout = 0;
			hideCopyText();
		}, 30000);
	} catch(e) {
		alert(e);
	}
}

setup();
tweetLink = document.getElementsByClassName('tweet')[0];
tweetLink.onclick = tweet;
copyLink = document.getElementsByClassName('copy')[0];
copyLink.onclick = copy;
