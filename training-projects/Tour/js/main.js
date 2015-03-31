// All columns backlight do by CSS selector ":hover". This script only for changing text.
$(".culumn").hover(
  function() {
    $(this).find('.culumn-description div p').text('Unlimited Telephonic Support');
  }, function() {
  	if ($(this).hasClass("culumn-features")) {
      $(this).find('.culumn-description div p').text("Who Wouldn't Want These Awesome Stuffs!"); 
  	} else {
  		$(this).find('.culumn-description div p').text('You Literally Heve Access To Everything!');
  	}
  }
);