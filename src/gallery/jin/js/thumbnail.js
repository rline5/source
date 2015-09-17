$(document).ready(function () {
	'use strict';


	var

		THUMB_WIDTH = 128,

		$thumbnail = $('#thumbnail'),
		$thumbContainer = $thumbnail.find('> .container'),
		$thumbBox = $thumbContainer.find('> ul'),
		$thumbList = $thumbBox.find('> .thumb'),

		thumbContainerWidth = $thumbContainer.width(),
		thumbBoxWidth = $thumbList.size() * THUMB_WIDTH - 8;

	$thumbBox.css('width', thumbBoxWidth);



	var clickPos = { pageX: 0, pageY: 0, left: 0, top: 0 };
	var reg = /px/;
	var pushState = false;

	$thumbBox[0].addEventListener('mousedown', function (e) {
		var self = this;

		pushState = true;
		clickPos.pageX = e.pageX;
		clickPos.pageY = e.pageY;
		clickPos.left = Number(self.style.left.replace(reg, ''));
		clickPos.top = Number(self.style.top.replace(reg, ''));
	});
	window.addEventListener('mousemove', function (e) {
		if (pushState) {
			var tw = e.pageX - clickPos.pageX + clickPos.left;

			if (tw > 0) {
				$thumbBox.css('left', 0);
			} else if (thumbBoxWidth - (Math.abs(tw) + thumbContainerWidth) <= 0) {
				$thumbBox.css('left', -(thumbBoxWidth - thumbContainerWidth));
			} else {
				$thumbBox.css('left', tw);
			}
		}
	});
	window.addEventListener('mouseup', function (e) {
		pushState = false;
	});
});