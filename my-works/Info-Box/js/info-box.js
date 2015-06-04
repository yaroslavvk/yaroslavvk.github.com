'use strict';

(function() {
	var targetJsonUrl = 'json/info_box.json',
		contentObjectsFromServer,
		numberOfContentObjects,
		indexOfCurrentContentObject,
		indexOfFirstContentObject,
		indexOfLastContentObject,
		imgNode,
		duration;

	$.getJSON(targetJsonUrl, function(data) {
		contentObjectsFromServer = data;
		numberOfContentObjects = contentObjectsFromServer.length;
		indexOfLastContentObject = contentObjectsFromServer.length - 1;
		indexOfCurrentContentObject = 0;
		indexOfFirstContentObject = 0;
		duration = 300;

		// adding hover effects for buttons

		function inOut(node, classOutBtn, classInBtn, classOutArrow, classInArrow) {
			$(node).hover(function() {
				$(this).removeClass(classOutBtn);
				$(this).addClass(classInBtn);
				$(this).find('.control-btn').addClass('text-shadow');
				if (classOutArrow && classInArrow) {
					$(this).find('.arrow').removeClass(classOutArrow);
					$(this).find('.arrow').addClass(classInArrow);
				}
			}, function() {
				$(this).removeClass(classInBtn);
				$(this).addClass(classOutBtn);
				$(this).find('.control-btn').removeClass('text-shadow');
				if (classOutArrow && classInArrow) {
					$(this).find('.arrow').removeClass(classInArrow);
					$(this).find('.arrow').addClass(classOutArrow);
				}
			});
		}

		inOut($('.button-btn-bg-white-right'),
			'button-btn-bg-white-right',
			'button-btn-bg-orange-right',
			'button-btn-ic-gray-right',
			'button-btn-ic-brn-right');

		inOut($('.button-btn-bg-white-left'),
			'button-btn-bg-white-left',
			'button-btn-bg-orange-left',
			'button-btn-ic-gray-left',
			'button-btn-ic-brn-left');

		inOut($('.button-btn-lg-bg'),
			'button-btn-lg-bg',
			'button-btn-lg-orange');

		// adding events for buttons

		function displayContent(indexOfCurrentContentObject) {
			$('.description-note').removeClass('description-note-collapse');
			$('.link-det').hide().fadeIn(duration);
			$('.title').text(contentObjectsFromServer[indexOfCurrentContentObject].title).hide().fadeIn(duration);
			$('.description').text(contentObjectsFromServer[indexOfCurrentContentObject].description).hide().fadeIn(duration);
			$('.note').text(contentObjectsFromServer[indexOfCurrentContentObject].note).hide().fadeIn(duration);
			imgNode = '<img src="imgs/' + contentObjectsFromServer[indexOfCurrentContentObject].img + '">';
			$('.product-img').html(imgNode).hide().fadeIn(duration);
		};

		function setDefault() {
			$('.description-note').removeClass('expand');
			$('.description-note').css('height', '29px');
			$('.description-note').addClass('collapse');
			$('.link-det').text('show details');
		}

		displayContent(indexOfFirstContentObject);

		$('.button-btn-bg-white-right').on('click', function() {
			setDefault();
			if (indexOfCurrentContentObject === indexOfLastContentObject) {
				indexOfCurrentContentObject = indexOfFirstContentObject;
				displayContent(indexOfCurrentContentObject);
			} else {
				indexOfCurrentContentObject += 1;
				displayContent(indexOfCurrentContentObject);
			}
		});

		$('.button-btn-bg-white-left').on('click', function() {
			setDefault();
			if (indexOfCurrentContentObject === indexOfFirstContentObject) {
				indexOfCurrentContentObject = indexOfLastContentObject;
				displayContent(indexOfCurrentContentObject);
			} else {
				indexOfCurrentContentObject -= 1;
				displayContent(indexOfCurrentContentObject);
			}
		});

		$('.show-det').on('click', function() {
			if ($('.description-note').hasClass('expand')) {
				$('.link-det').text('show details');
				$('.description-note').animate({
					height: '29px'
				}, duration, function() {
					$('.description-note').removeClass('expand');
					$('.description-note').addClass('collapse');
					$('.product-img img').fadeToggle(duration);
				});
			} else {
				$('.product-img img').fadeToggle(duration, function() {
					$('.link-det').text('hide details');
					$('.description-note').animate({
						height: '232px'
					}, duration, function() {
						$('.description-note').removeClass('collapse');
						$('.description-note').addClass('expand');
					});
				});
			}
		});

		$('.large-btn a').on('click', function() {
			$(this).attr('href', contentObjectsFromServer[indexOfCurrentContentObject].productUrl);
		});
	});
})();