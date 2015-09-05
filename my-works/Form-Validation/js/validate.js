'use strict';

// (function () {
	var groupNode;
	var massageNode;
	var inputId;
	var inputVal;
	var request;
	var STATE_READY = 4;
	var url;
	var emailString;
	var emailStringToArray;
	var answerObj;

	// It's native JS ajax http request method:

	function isValidMailInBase(inputVal) {
		request = new XMLHttpRequest();
		emailString = inputVal;
		emailStringToArray = emailString.split(/[@.%]/);
		url = 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + emailStringToArray[0] + '%40' + emailStringToArray[1] + '.' + emailStringToArray[2];
		request.open('get', url, true);
		request.onreadystatechange = function() {
			if (request.readyState === STATE_READY) {
				answerObj = JSON.parse(request.responseText);
				console.log(request.responseText);
				console.log(answerObj);
				if (answerObj.used) {
					massageNode.css('display', 'block');
					massageNode.text('This email is already registered. Please fill out enother email.');
				}
			}
		};
		request.send();
	}

	// It's jQuery ajax http request method:

	// function isValidMailInBase(inputVal) {
	// 	emailString = inputVal;
	// 	emailStringToArray = emailString.split(/[@.%]/);
	// 	// console.log(emailStringToArray);
	// 	$.get(
	// 		'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + emailStringToArray[0] + '%40' + emailStringToArray[1] + '.' + emailStringToArray[2],
	// 		function onAjaxSuccess(data) {
	// 			if (data.used) {
	// 				$('#email').closest('.required').addClass('has-error');
	// 				massageNode.css('display', 'block');
	// 				massageNode.text('This email is already registered. Please fill out enother email');
	// 			}
	// 		}
	// 	);
	// }

	$('input').on('blur', function(event) {
		groupNode = $(event.target).closest('.required');
		massageNode = $(event.target).closest('.required').find('.massage');
		inputId = $(event.target).attr("id");
		inputVal = $(event.target).val();
		if (inputVal === '') {
			groupNode.addClass('has-error');
			massageNode.css('display', 'block');
			massageNode.text('* You should fill out this field');
		} else if (/[^@]+@[^@\.]+\.[^@]+/.test(inputVal)) { // regexp email validate.
			groupNode.removeClass('has-error');
			massageNode.css('display', 'none');
			isValidMailInBase(inputVal); // get http request to 'https://aqueous-reaches-8130.herokuapp.com' server.
		} else {
			groupNode.addClass('has-error');
			massageNode.css('display', 'block');
			if (inputId === 'email') {
				massageNode.text('Email should be correct like ivanov@mail.com');
			} else if (inputId === 'password') {
				groupNode.removeClass('has-error');
				massageNode.css('display', 'none');
				if (inputVal.length < 5) {
					groupNode.addClass('has-error');
					massageNode.css('display', 'block');
					massageNode.text('Password is too small. It should be more then 5 symbols');
				} else if (/^[a-z]+$/i.test(inputVal) || /^\d+$/i.test(inputVal)) { // regexp password validate.
					groupNode.addClass('has-error');
					massageNode.css('display', 'block');
					massageNode.text('Password should has letters and numbers');
				}
			}
		}
	});

	$('.checkbox').find('input').on('change', function() {
		// regexp validate befor send form to server.
		if ($('.checkbox').find('input').prop("checked")) {
			if ($('#email').val() === '' || $('#password').val() === '') {
				$('.send-button').addClass('disabled');
			} else if ($('.required').hasClass('has-error')) {
				$('.send-button').addClass('disabled');
			} else if (!(/[^@]+@[^@\.]+\.[^@]+/.test($('#email').val()))) {
				$('.send-button').addClass('disabled');
			} else if (!(/^[a-z]+$/i.test($('#password').val()) || !(/^\d+$/i.test($('#password').val())))) {
				$('.send-button').addClass('disabled');
			} else {
				$('.send-button').removeClass('disabled');
			}
		} else {
			$('.send-button').addClass('disabled');
		}
	});
// })();