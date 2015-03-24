'use strict'

function makeZoomable(node) {
	var imgSmall = node.find('img');
	var closeButton = $(document).find('.zoomable-close');
	var imgLarge1 = $('#img1'); // в данном скрипте реализовал
	var imgLarge2 = $('#img2'); // подход при котором
	var imgLarge3 = $('#img3'); // все большие изображения на странице
	var imgLarge4 = $('#img4'); // имеют свой ID.
	var imgLarge5 = $('#img5');
	var imgSmallSrc;
	var srcSmallArr;
	var imgLargeSrc;
	var srcLargeArr;
	var zoomableDiv;
	var scrollSize;
	var curLargeImg;
	var curLargeImgConteiner;
	var curCloseButton;
	var curImgWrapper;
	var modWidth = 100;
	var KEY_ESC = 27;

	function getImgName(imgId) {
		imgLargeSrc = imgId.attr('src');
		srcLargeArr = imgLargeSrc.split(/[/.%]/);
		return srcLargeArr[2];
	}

	function showLargeImg(imgNode) {
		zoomableDiv = imgNode.closest('.zoomable');
  		$(zoomableDiv).removeClass('zoomable-closed');
  		$(zoomableDiv).addClass('for-rsz');
  		$(zoomableDiv).offset({top:0});
	}

	function hideLargeImg() {
		$('.zoomable').addClass('zoomable-closed');
		$(zoomableDiv).removeClass('for-rsz');
	}

	function getMinusWidth(modWidth) {
		return modWidth -= 10;
	}

	function getWidth() {
		curLargeImg = $(document).find('.for-rsz').find('img');
		curImgWrapper = $(document).find('.for-rsz').find('.zoomable-img-wrapper');
		curCloseButton = $(document).find('.for-rsz').find('.zoomable-close');
		curImgWrapper.offset({top:0});
		if (curLargeImg.width() > $(window).width()) {
			curLargeImg.width(getMinusWidth(modWidth) + '%'); // с изменением ширины пропорционально изменяется и высота картинки
			curCloseButton.css('margin-right', '5%');
		}
	}

	imgSmall.on('click', function(){
  		imgSmallSrc = $(this).attr('src');
  		srcSmallArr = imgSmallSrc.split(/[/.%]/);
  		if (srcSmallArr[2] === getImgName(imgLarge1)) {
  			showLargeImg(imgLarge1);
  			getWidth();
  		} else if (srcSmallArr[2] === getImgName(imgLarge2)) {
  			showLargeImg(imgLarge2);
  			getWidth();
  		} else if (srcSmallArr[2] === getImgName(imgLarge3)) {
  			showLargeImg(imgLarge3);
  			getWidth();
  		} else if (srcSmallArr[2] === getImgName(imgLarge4)) {
  			showLargeImg(imgLarge4);
  			getWidth();
  		} else if (srcSmallArr[2] === getImgName(imgLarge5)) {
  			showLargeImg(imgLarge5);
  			getWidth();
  		}
		$("body").append("<div class='blur'></div>");	

	});

	closeButton.on('click', function(){
		hideLargeImg();
		$('.blur').remove();
	});

	$(window).keyup(function(event) {
		if (event.keyCode === KEY_ESC) {
			hideLargeImg();
			$('.blur').remove();
		}
	});

	$(window).resize(function() {
		getWidth();
	});

	$(window).scroll(function() {
		scrollSize = $(window).scrollTop();
		curImgWrapper = $(document).find('.for-rsz').find('.zoomable-img-wrapper');
		curImgWrapper.offset({top:scrollSize});
	});
}