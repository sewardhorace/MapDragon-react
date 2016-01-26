relativeMousePos = function(e){
  var mousePosDoc = {
    x: e.pageX,
    y: e.pageY
  };
	var target = e.target;
  var targleft = targtop = 0;
	if (target.offsetParent) {
		do {
			targleft += target.offsetLeft;
			targtop += target.offsetTop;
		} while (target = target.offsetParent);
	}
	return {
		x : mousePosDoc.x - targleft,
		y : mousePosDoc.y - targtop
	};
};

module.exports = {
  relativeMousePos: relativeMousePos
};
