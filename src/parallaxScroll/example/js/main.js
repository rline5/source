$(function(){
	var section = $('#contents > .parallax > div');	// mSection01, mSection02, mSection03
	var sectionInfo = [];
	var objectInfo = [];
	var totalSize = section.size();
	
	section.each(function(i){
		var tg = $(this);
		sectionInfo.push(tg.offset().top);
		
		objectInfo.push([]);
		
		// 각 화면의 구성을 이루는 객체의 top 크기를 구한다.
		var child = tg.children();
		child.each(function(j){
			var t = $(this);
			objectInfo[i][j] = t.position().top;
		});
		
		var upBtn = tg.find('> .tit > .arrow > a:eq(0)');
		var downBtn = tg.find('> .tit > .arrow > a:eq(1)');
		
		upBtn.click(function(e){
			e.preventDefault();
			if(i == 0) return;
			move(i-1);
		});
		
		downBtn.click(function(e){
			e.preventDefault();
			if(i == totalSize - 1) return;
			move(i+1);
		});
	});
	 
	function move(sectionIndex){
		var tt = sectionInfo[sectionIndex];
		$('html, body')
		.stop()
		.animate({scrollTop:tt}, {duration:600, ease:'easeOutCubic'});
	}

	// 각 화면에 position을 fixed 처리한다.
	section.css('position', 'fixed');

	// 화면이 스크롤 될 때 이벤트를 바인드한다.
	$(window).scroll(function(){
		var sct = $(window).scrollTop();	// 스크롤의 위치
		
		section.each(function(i){
			var tg = $(this);
			var tt = -1 * sct + sectionInfo[i];	// (스크롤의 위치 * -1) + 각 화면의 top
			if(sct > sectionInfo[i]) tt *= 0.5;

			tg.css('top', tt);
			
			var child = tg.children();
			child.each(function(j){
				var t = $(this);
				var start = sectionInfo[i];
				var end = sectionInfo[i + 1];
				if(!end) end = $(document).height();
				var min = objectInfo[i][j];
				var max = objectInfo[i][j] + j * 200 + 100;
				var objT = (sct - start) * (max - min) / (end - start) + min;
				t.css({top:objT});
			});
		});
	});
});