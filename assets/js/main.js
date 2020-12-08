$(function() {
	  /*var typingBool = false;
	  var typingIdx = 0;
	  var typingTxt = $(".typing").text(); 
	  typingTxt = typingTxt.split(""); 
	  if (typingBool == false) {
		typingBool = true;
		var tyInt = setInterval(typing, 100); 
	  }
	  function typing() {
		if (typingIdx < typingTxt.length) {
		  
		  $(".typing-txt").append(typingTxt[typingIdx]); 
		  typingIdx++;
		} else {
		  clearInterval(tyInt); 
		}
	  }*/
		$('.like-slide').slick({
		  dots: true,
		  infinite: false,
		  speed: 300,
		  autoplaySpeed: 3000,
		  dots: false,
		  arrows: false,
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  autoplay: false,
		  responsive: [
			{
			  breakpoint: 999,
			  settings: {
				autoplay: true,
				infinite: true,
				slidesToShow: 1,
				verticalSwiping: true,
				vertical: true,
			  }
			},
			
		  ]
		});

	$('.help, .tooltip').mouseover(function(){
		$(this).closest('.tit').addClass('over');
		var cs = $(this).closest('.tit')
		setTimeout(function() {
			$(cs).addClass('read');
		}, 100);
	});	
	$('.tooltip, .tit').mouseleave(function(){
		var cs = $(this).closest('.tit')
		setTimeout(function() {
			$(cs).removeClass('read');
		}, 20);
	});	
});
function sizeControlMain(width) {
	width = parseInt(width);
	var bodyHeight = document.documentElement.clientHeight; 
	var bodyWidth = document.documentElement.clientWidth; 
	
	var docW = $('#doc').outerWidth();
	if(docW < 1000){
		$('.search').find('input[type=text]').attr('placeholder','데이터를 검색 해보세요');
	}else{
		$('.search').find('input[type=text]').attr('placeholder','대한민국의 모든 데이터를 한곳에서 검색 해보세요');
	}
}
jQuery(function($){
	sizeControlMain($(this).width());
	$(window).resize(function() {
		if(this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 3);
	});
});	
$(window).on('resizeEnd', function() {
	sizeControlMain($(this).width());
});
$(window).load( function() { 
	sizeControlMain($(this).width());
});
