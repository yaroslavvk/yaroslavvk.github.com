'use strict';

(function() {

	// products it is an array of all products in cart
	var products = [{
			title: 'Продукт1',
			price: 10,
			id: 1,
			urlImgLarge: 'img/product-large.png',
			urlImgSmall: 'img/product-small.png'
		}, {
			title: 'Продукт2',
			price: 21,
			id: 2,
			urlImgLarge: 'img/product-large.png',
			urlImgSmall: 'img/product-small.png'
		}, {
			title: 'Продукт3',
			price: 12,
			id: 3,
			urlImgLarge: 'img/product-large.png',
			urlImgSmall: 'img/product-small.png'
		}, {
			title: 'Продукт4',
			price: 33.3,
			id: 4,
			urlImgLarge: 'img/product-large.png',
			urlImgSmall: 'img/product-small.png'
		},

		// products be able to include more then 4 product (according "Надо реализовать: 3. Возможность изменения количества товаров. Добавлять их через верстку или через js.")
		// for example: just uncomment object below and update the page

		// {
		// 	title: 'Продукт5',
		// 	price: 99,
		// 	id: 5,
		// 	urlImgLarge: 'img/product-large.png',
		// 	urlImgSmall: 'img/product-small.png'
		// },
	];

	var pricesArr;
	var totalPrice;
	var pruductId;
	var $massage = $('.massage');
	var $name = $('#name');
	var $phone = $('#phone');
	var $email = $('#email');

	function getImg() {
		if (window.innerWidth <= 992) {
			for (var s = 0; s <= products.length - 1; s += 1) {
				$('#img' + products[s].id).attr('src', products[s].urlImgSmall);
			}
		} else {
			for (var l = 0; l <= products.length - 1; l += 1) {
				$('#img' + products[l].id).attr('src', products[l].urlImgLarge);
			}
		}
	}

	function getTotalPrice() {
		pricesArr = [];
		totalPrice = 0;
		for (var k = 0; k <= products.length - 1; k += 1) {
			pricesArr.push(products[k].price);
		}
		for (var j = 0; j <= pricesArr.length - 1; j += 1) {
			totalPrice += pricesArr[j];
		}
		$('.total-price').text('Сумма заказа: ' + totalPrice);
	}

	function nameValidate() {
		if (/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test($name.val())) { // RegExp for matching name. 2-min. symbols, 20-max symbols, first symbol-should be a letter
			return true;
		} else {
			$name.closest('.form-group').find('.massage').text('Должно быть минимум 2 символа. Первый символ обязательно буква');
			$name.closest('.form-group').find('.massage').css('display', 'block');
			return false;
		}
	}

	function phoneValidate() {
		if (/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test($phone.val())) { // RegExp for matching phone format like +38(098)968-54-27
			return true;
		} else {
			$phone.closest('.form-group').find('.massage').text('Номер телефона должен быть в формате +38(098)968-54-27');
			$phone.closest('.form-group').find('.massage').css('display', 'block');
			return false;
		}
	}

	function emailValidate() {
		if (/[^@]+@[^@\.]+\.[^@]+/.test($email.val())) { // RegExp for matching email format like ivanov@gmail.com
			return true;
		} else {
			$email.closest('.form-group').find('.massage').text('Email должен быть в виде ivanov@gmail.com. Не забудьте символы "@" и "."');
			$email.closest('.form-group').find('.massage').css('display', 'block');
			return false;
		}
	}

	function getEmptyFieldErrorMassage(id) {
		if ($(id).val() === "") {
			$(id).closest('.form-group').find('.massage').text('Это поле обязательное для заполнения');
			$(id).closest('.form-group').find('.massage').css('display', 'block');
			return true;
		} else {
			if (id === '#name') {
				nameValidate();
			} else if (id === '#phone') {
				phoneValidate();
			} else if (id === '#email') {
				emailValidate();
			} else {
				return false;
			}
		}
	}

	// display content(products)
	for (var i = 0; i <= products.length - 1; i += 1) {
		$('.content').append('<div class="product"><img class="img" id="img' + products[i].id + '"' + '><h5 class="title text" id="title' + products[i].id + '"' + '></h5><h5 class="price text" id="price' + products[i].id + '"' + '><strong></strong> грн</h5><h5 class="id text" id="' + products[i].id + '"' + '></h5><div class="delete-btn"><span>Удалить</span></div></div>');
		$('#title' + products[i].id).text(products[i].title);
		$('#price' + products[i].id + ' strong').text(products[i].price);
		$('#' + products[i].id).text('id: ' + products[i].id);
	}

	getImg();
	getTotalPrice();

	// adding events
	$('.delete-btn span').on('click', function(event) {
		pruductId = parseInt($(event.target).closest('.product').find('.id').attr('id')); // convert id from string to number
		for (var index = 0; index <= products.length - 1; index += 1) {
			if (pruductId === products[index].id) {
				products.splice(index, 1);
			}
		}
		$(event.target).closest('.product').remove();
		getTotalPrice();
	});

	$(window).on('resize', function() {
		getImg();
	});

	// validate form avery submit event
	$(".form").submit(function() {
		$massage.css('display', 'none');
		getEmptyFieldErrorMassage('#name');
		getEmptyFieldErrorMassage('#phone');
		getEmptyFieldErrorMassage('#email');
		if ($name.val() === '' || $phone.val() === '' || $email.val() === '' || !nameValidate() || !phoneValidate() || !emailValidate()) {
			return false;
		} else {
			$massage.css('display', 'none');
			return true;
		}
	});

})();