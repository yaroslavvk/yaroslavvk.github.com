'use strict';

(function() {
	var targetJsonUrl = 'json/info_box.json',
		contentObjectsFromServer,
		numberOfContentObjects,
		indexOfCurrentContentObject = 0,
		indexOfFirstContentObject = 0,
		indexOfLastContentObject,
		imgNode,
		duration = 400,
		$content = $('.content'),
		$descr = $('.description'),
		$descrNote = $('.description-note'),
		$linkDet = $('.link-det'),
		$title = $('.title'),
		$note = $('.note'),
		$productImg = $('.product-img'),
		$info = $('.info');

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

	// hover effects were added

	displayContent(indexOfFirstContentObject);

	// get content from server

	$.getJSON(targetJsonUrl, function(data) {
		contentObjectsFromServer = data;
		numberOfContentObjects = contentObjectsFromServer.length;
		indexOfLastContentObject = contentObjectsFromServer.length - 1;

		// adding events for buttons
		function displayContent(indexOfCurrentContentObject) {
			$descrNote.removeClass('description-note-collapse');
			$linkDet.hide().fadeIn(duration);
			$title.text(contentObjectsFromServer[indexOfCurrentContentObject].title).hide().fadeIn(duration);
			$descr.text(contentObjectsFromServer[indexOfCurrentContentObject].description).hide().fadeIn(duration);
			$note.text(contentObjectsFromServer[indexOfCurrentContentObject].note).hide().fadeIn(duration);
			imgNode = '<img src="imgs/' + contentObjectsFromServer[indexOfCurrentContentObject].img + '">';
			$productImg.html(imgNode).hide().fadeIn(duration);
		};

		function setDefault() {
			$descrNote.removeClass('expand');
			$descrNote.css('height', '29px');
			$descrNote.addClass('collapse');
			$linkDet.text('show details');
		}

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
			if ($descrNote.hasClass('expand')) {
				$linkDet.text('show details');
				$info.addClass('info-absolute');
				$info.animate({
					top: '205px'
				}, duration);
				$descrNote.animate({
					height: '29px'
				}, duration, function() {
					$descrNote.removeClass('expand');
					$descrNote.addClass('collapse');
					$content.find('img').fadeToggle(duration);
				});
			} else {
				$content.find('img').fadeToggle(duration, function() {
					$linkDet.text('hide details');
					$info.removeClass('info-absolute');
					$info.animate({
						top: '0px'
					}, duration);
					$descrNote.animate({
						height: '232px'
					}, duration, function() {
						$descrNote.removeClass('collapse');
						$descrNote.addClass('expand');
					});
				});
			}
		});

		$('.large-btn a').on('click', function() {
			$(this).attr('href', contentObjectsFromServer[indexOfCurrentContentObject].productUrl);
		});
	});

	// contentObjectsFromServer = [{
	// 	"title": "Time to Share: 6 for $3.99*",
	// 	"img": "comp_plate_promo1.png",
	// 	"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
	// 	"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
	// 	"productUrl": "products/promo1.html"
	// }, {
	// 	"title": "Rise 'n shine",
	// 	"img": "comp_plate_promo2.png",
	// 	"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
	// 	"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
	// 	"productUrl": "products/promo2.html"
	// }, {
	// 	"title": "PM Snackers: Brownie Bites",
	// 	"img": "comp_plate_promo3.png",
	// 	"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
	// 	"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
	// 	"productUrl": "products/promo3.html"
	// }, {
	// 	"title": "ICED Coffee",
	// 	"img": "comp_plate_promo4.png",
	// 	"description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
	// 	"note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga. * At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
	// 	"productUrl": "products/promo4.html"
	// }];
})();