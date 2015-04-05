$('.masthead-nav').on('click', function(event) {
	if ($(event.target).context.localName === 'ul') {
		return;
	} else {
		$(this).find('li').removeClass('active');
		$(event.target).closest('li').addClass('active');
		if ($(event.target).text() === 'About Me') {
			$('.site-wrapper').find('.cover').css('display', 'block');
			$('.site-wrapper').find('.row').css('display', 'none');
		} else if ($(event.target).text() === 'My Works') {
			$('.site-wrapper').find('.cover').css('display', 'none');
			$('.site-wrapper').find('.row').css('display', 'block');
		}
	}
});