var divWidth;
$(function($){
	if($(".content-slider-ovclick").length<1) $("<div class='content-slider-ovclick'/>").appendTo($("#container-wrap")).hide();	
	// input & select
	$('.chk-select').find('select').change(function() {
		  var current = $('.select-input').val();
		  if (current != 'null') {
			  $(this).css({'color':'#1f1f1f'})
			  $(this).parent().addClass('active');
		  } else {
			   $(this).css({'color':'#acacac'})	
			   $(this).parent().removeClass('active');
		  }
	}); 
	$('.chk-input').find('input,textarea').css({'color':'#acacac'});
	$('.chk-input').find('input,textarea').on('change keydown keypress keyup',function() {
	  var current = $(this).parent().find('input').val();
	  if (current != 'null') {
		  $(this).css({'color':'#1f1f1f'});
		  $(this).parent().addClass('active');
		  //$(this).parent().find('.delete').show();
	  } else {
		  $(this).css({'color':'#acacac'});
		  $(this).parent().removeClass('active');
		  //$(this).parent().find('.delete').hide();
	  }
	}); 
	$('.chk-input.active').find('input,textarea').css({'color':'#1f1f1f'});
	$('.chk-input.active').find('input,textarea').change(function() {
	  var current = $(this).val();
	  if (current != 'null') {
		  $(this).css({'color':'#1f1f1f'});
		  $(this).parent().find('.delete').show();
	  } else {
		  $(this).css({'color':'#1f1f1f'});
		  $(this).parent().find('.delete').show();
	  }
	}); 
	$('.passValue').on('change keydown keypress keyup',function() {
		  var current = $('.passValue').val();
		  if (current != 'null') {
			  $(this).attr('type', 'password'); 
		  } else {
			 $(this).attr('type', 'text'); 
		  }
	}); 
	
	// bt-filter
	$('.bt-filter').click(function(){
		if($('#snb-wrap').hasClass('mn-open')){
			ovHide();
			$(this).removeClass('active');
		}else{
			ovShow();
			$(this).addClass('active');
		}
	});

	$('.bt-close').click(function(){
		$('#snb-wrap').removeClass('mn-open');
		$('.bt-filter').removeClass('active');
		ovHide();
	});
	

	// top-btn & scroll
	if($(".top-btn").length<1) $("<a href='#n' class='top-btn'><span class='blind'>top</span></a>").appendTo($("#doc"));
	$('.top-btn').click(function(){
		$("body, html").animate({
				scrollTop: 0
		}, 500)
	});

	$('.leftmenu').find('li.lm_l1').each(function(){
		var ulchk =$(this).find('ul').length;
		if(ulchk > 0){
			$(this).addClass('has-sub');
			$("<div class='tgl-btn'/>").appendTo($(this));	
				
		}
	});

	$('.leftmenu').find('.lm_a1').click(function(){
		var docW = $('#doc').outerWidth();
		if(docW < 1000){
		  if($(this).parent().hasClass('is-open')){
			 $(this).parent().removeClass('is-open');
			  $(this).parent().find('ul').slideUp();
		  }else{
			 $(this).parent().addClass('is-open');
			 $(this).parent().find('ul').slideDown();
		  }
		}
	});
});	
function sizeControl(width) {
	width = parseInt(width);
	var bodyHeight = document.documentElement.clientHeight; 
	var bodyWidth = document.documentElement.clientWidth; 
	var chkHeader = $('#header > .inner').outerHeight();
	var docW = $('#doc').outerWidth();
	if(docW < 1000){
		$('#snb-wrap').css({'top': chkHeader, 'height': bodyHeight - chkHeader});
	}else{
		$('#snb-wrap').css({'top': 'auto', 'height': 'auto'});
	}
	//$('.content-slider-ovclick').css({'top': chkHeader, 'height': bodyHeight - chkHeader});
	
	if(docW < 1000){
		$('.top-search').find('input[type=text]').attr('placeholder','데이터를 검색 해보세요');
	}else{
		$('.top-search').find('input[type=text]').attr('placeholder','대한민국의 모든 데이터를 한곳에서 검색 해보세요');
	}
}
jQuery(function($){
	sizeControl($(this).width());
	$(window).resize(function() {
		if(this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 0);
	});
});	
$(window).on('resizeEnd', function() {
	sizeControl($(this).width());
});
$(window).load( function() { 
	sizeControl($(this).width());
});

$(window).scroll(function() {
	var position = $(window).scrollTop(); 
	var bodyWidth = document.documentElement.clientWidth; 
	var GnbH = $('#gnb-wrap').outerHeight();
	var headH = $('#header').outerHeight();
	var docW = $('#doc').outerWidth();
	var msec01H = $('.msec-01').outerHeight();
	if(docW > 999){
		if (position > msec01H){
			$('#header-wrap').addClass('fix')
		}
		if (position < msec01H){
			$('#header-wrap').removeClass('fix');	
		}
	}else{
		if (position > msec01H){
			$('#header-wrap').addClass('fix')
		}
		if (position < msec01H){
			$('#header-wrap').removeClass('fix');	
		}
	}
	
	
	if (position > 300){
		$('.top-btn').addClass('over');
	}else{
		$('.top-btn').removeClass('over');
	}
});
$(window).load(function(){
	var position = $(window).scrollTop(); 
	var bodyWidth = document.documentElement.clientWidth; 
	var GnbH = $('#gnb-wrap').outerHeight();
	var headH = $('#header').outerHeight();
	var docW = $('#doc').outerWidth();
	var msec01H = $('.msec-01').outerHeight();
	if(docW > 999){
		if (position > msec01H){
			$('#header-wrap').addClass('fix')
		}
		if (position < msec01H){
			$('#header-wrap').removeClass('fix');	
		}
	}else{
		if (position > msec01H){
			$('#header-wrap').addClass('fix')
		}
		if (position < msec01H){
			$('#header-wrap').removeClass('fix');	
		}
	}
	
	if (position > 300){
		$('.top-btn').addClass('over');
	}else{
		$('.top-btn').removeClass('over');
	}
});


function ovShow(){
	$('#snb-wrap').addClass('mn-open');
	$('body').css({'overflow':'hidden'});
	var $cback = $(".content-slider-ovclick");
	$cback.unbind("click").bind("click",function(){
		ovHide();
		$('.content-slider-ovclick').hide();
	}).show();
	$('.layer-wrap.selBox').hide();
	$('#container-wrap').css({'z-index': '2049'});
}
function ovHide(){
	$('#snb-wrap').removeClass('mn-open');
	$('body').css({'overflow':'visible'});
	$('.content-slider-ovclick').hide();
	$('#container-wrap').css({'z-index': '2009'});
}

function clearText(thefield) {
  if (thefield.defaultValue==thefield.value) {
    thefield.value="";
  }
} 
function defaultText(thefield) {
  if (thefield.value=="") {
    thefield.value=thefield.defaultValue;
  }
}