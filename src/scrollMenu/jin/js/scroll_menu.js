$(function(){
    var menu = $('#top_menu > ul > li');
    var contents = $('#contents > div');
    
    menu.click(function(event){
        event.preventDefault();

        var tg = $(this);
        var i = tg.index();

        var section = contents.eq(i);
        var tt = section.offset().top;

        $('html, body').stop().animate({scrollTop:tt});
    });

    $(window).scroll(function(){
        var sct = $(window).scrollTop();
        contents.each(function(){
            var tg = $(this);
            var i = tg.index();
            if(tg.offset().top <= sct){
                menu.removeClass('on');
                menu.eq(i).addClass('on');
            }
        });
    });
});

function allowDrop(event){
    event.preventDefault();
}
function drag(event){
    event.dataTransfer.setData('id',event.target.id);
    event.dataTransfer.setData('hash',event.target.hash);
}
function drop(event){
    event.preventDefault();
    var dragId = event.dataTransfer.getData('id'); //드래그되는 요소의 아이디를 구함.
    var dragHash = event.dataTransfer.getData('hash'); //드래그되는 요소의 아이디를 구함.
    var dragNode = document.getElementById(dragId);
    var dragContentNode = document.getElementById(dragHash.substring(1));

    var tNode = event.target;
    var tContentNode;

    if (tNode.tagName === 'A') {
        tContentNode = document.getElementById(tNode.hash.substring(1));
    } else {
        tNode = tNode.getElementsByTagName('a')[0];
        tContentNode = document.getElementById(tNode.hash.substring(1));
    }

    if (dragNode.getAttribute('data-index') > tNode.getAttribute('data-index')) {
        $(getParentNode(tNode)).before(getParentNode(dragNode));
        $(tContentNode).before(dragContentNode);
    } else {
        $(getParentNode(tNode)).after(getParentNode(dragNode));
        $(tContentNode).after(dragContentNode);
    }

    $('#top_menu > ul > li > a').each(function (i, o) {
        o.setAttribute('data-index', i+1);
    });


    //event.target.appendChild(document.getElementById(data)); //appendChild 메서드를 사용해서 이 요소를 새 대상 객체에 추가
}

function getParentNode(node) {
    var parentNode = node.parentNode;
    while (parentNode.nodeType !== 1) {
        parentNode = parentNode.parentNode;
    }
    return parentNode;
}
