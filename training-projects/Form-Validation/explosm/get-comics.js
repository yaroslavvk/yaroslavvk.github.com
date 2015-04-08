'use strict';

(function() {
	var prevImg = $('.previous-comic');
	var prevImgHref = prevImg.attr('href');

	$(window).scroll(function() {

		$.get(
			// prevImgHref,
			"/comics/latest/",
			onAjaxSuccess
		);

		function onAjaxSuccess(data) {
			var exBox = $(document).find('#main-comic').closest('.small-12.medium-12.large-12.columns') //&& $(document).find('#featured-comic').closest('.small-12.medium-12.large-12.columns');

			if ($(window).height() + $(window).scrollTop() > exBox.offset().top + exBox.height()) {
				// debugger
				var existingImg = $('#main-comic')// && $('#featured-comic');
				var existingImgBox = existingImg.closest('.small-12');
				existingImgBox.append("<img id='main-comic' src=''>");
				var newImgNode = existingImgBox.children().last();
				var dataImg = $(data).find('#main-comic');
				var dataImgHref = dataImg.attr('src');
				newImgNode.attr('src', dataImgHref);
				var prevDataImg = $(data).find('.previous-comic');
				var prevDataImgHref = prevDataImg.attr('href');
			} else {
				return;
			}
			getAjax(prevDataImgHref);
		}

		function getAjax(dataHref) {
			$.get(
			  dataHref,
			  onAjaxSuccess
			);
		}
	});
})();
//не смог решить проблему с подгрузкой одинаковых комиксов