/*
	element  속성 draggable(true, false, auto)
 */

/*
	### Drag EVENT
	ondragstart : 드래그 시작될 때 발생하는 이벤트
	ondrag: 요소가 드래그 중일 때, 드래그 중 마우스를 떼지 않았을 때 발생하는 이벤트
	ondragend:  드래그가 끝날 때, 드래그를 하고 마우스를 뗄 때 발생하는 이벤트
	ondragenter: 정확히 드롭을 목표한 공간에 마우스를 떼어 드래그를 끝낼 때 발생하는 이벤트
	ondragleave: 드롭을 목표한 공간에에서 요소를 꺼낼 때 발생하는 이벤트
	ondragover: 드롭을 목표로 한 공간을 드래그한 상태로 요소가 지나갈 때 발생하는 이벤트
	ondrop: 드롭이 될 때 발생하는 이벤트
 */

/*
	### dataTransfer 전송 타입
	드래그 앤 드롭으로 이동을 시킬 때에는 서로 데이터를 주고 받아야한다. 이 때 사용되는 것이
	dataTransfer object이다.

	dataTransfer.setData(type, data);
	dataTransfer.getData(type)
 */

/*
	### Mouse EVENT
	onclick: 마우스가 클릭되었 때 발생하는 이벤트
	onmousedown: 마우스가 눌렀을 때 발생하는 이벤트
	onmouseup: 마우스가 눌린 후 놓일 때 발생하는 이벤트
	onmousemove: 마우스 커서가 이동할 때 발생하는 이벤트
	onmouseover: 마우스가 경계안으로 들어올 때 발생하는 이벤트
	onmouseout: 마우스가 경계선 밖으로 나갔을 때 발생하는 이벤트
 */
var bar = document.getElementsByClassName('slider')[0];
var handle = document.getElementsByClassName('slider-handle')[0];
var barPos = { w: bar.clientWidth };
var clickPos = { pageX: 0, pageY: 0, left: 0, top: 0 };
var pushState = false;
handle.addEventListener('mousedown', function (e) {
	pushState = true;
	clickPos.pageX = e.pageX;
	clickPos.pageY = e.pageY;
	clickPos.left = Number(e.target.style.left.replace(/px/, ''));
	clickPos.top = Number(e.target.style.top.replace(/px/, ''));
});
window.addEventListener('mousemove', function (e) {
	if (pushState) {
		var tw = e.pageX - clickPos.pageX + clickPos.left;
		if (tw < 0) {
			handle.style.left = 0 +'px';
		} else if (tw > barPos.w-5) {
			handle.style.left = barPos.w-5 +'px';
		} else {
			handle.style.left = tw +'px';
		}
	}
});
window.addEventListener('mouseup', function (e) {
	pushState = false;
});