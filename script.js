var states = ['\u{1f3fb}', '\u{1f3fc}', '\u{1f3fd}', '\u{1f3fe}', '\u{1f3ff}']

var width = 10;
var height = 10;
var x, y;
var tweetLink, copyLink;

var getPixelValue = function(state) {
	return states[state];
}

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
	//this.classList.toggle('on');

	this.pixelState = (this.pixelState + 1) % states.length;
	this.innerHTML = getPixelValue(this.pixelState);

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
			pixel.onmousedown = function(e){ e.preventDefault(); };
			pixel.pixelState = 0;
			pixel.innerHTML = getPixelValue(pixel.pixelState);
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
      output += pixel.innerHTML;
    }
    output += '\n';
  }
	output += '\nhttp://pixelat.ion.land';
	return output;
}

var tweet = function(e) {
	e.preventDefault();
	alert('Going to Twitter...\nThe box will say -94 characters, but it will be possible to send the tweet anyway!');
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
