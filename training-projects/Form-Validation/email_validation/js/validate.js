'use strict';

(function() {

	function topWalker(node, testFunc, lastParent) {
		while (node && node !== lastParent) {
			if (testFunc(node)) {
				return node;
			}
			node = node.parentNode;
		}
	}

	function showError(groupNode, errorMessage) {
		groupNode.classList.add('has-error');
		var erroMessageNode = document.createElement('div');
		erroMessageNode.className = 'alert alert-danger';
		erroMessageNode.innerHTML = errorMessage;
		groupNode.appendChild(erroMessageNode);
	}

	function hideError(groupNode) {
		groupNode.classList.remove('has-error');
		var erroMessageNode = groupNode.querySelector('.alert.alert-danger');
		if (erroMessageNode) {
			erroMessageNode.parentNode.removeChild(erroMessageNode);
		}
	}


	var emailNode = document.getElementById('email');
	var emailHolder = topWalker(emailNode, function (oneOfParents) {
		return oneOfParents.classList.contains('form-group');
	});
	function validateEmail() {
		var emailNodeValue = emailNode.value.trim();
		hideError(emailHolder)
		if (!emailNodeValue) {
			showError(emailHolder, "Введите емейл. Поле обязательно для заполнения");
			submitButton.disabled = true;
			return false;
		}
		if (!/[^@]+@[^@\.]+\.[^@]+/.test(emailNodeValue)) {
			showError(emailHolder, "Исправьте правописание. Ошибка в адресе почты");
			submitButton.disabled = true;
			return false;
		}
	}
	emailNode.addEventListener('keyup', validateEmail, false);
	emailNode.addEventListener('change', validateEmail, false);
	emailNode.addEventListener('blur', validateEmail, false);


	var passwordNode = document.getElementById('password');
	var passwordHolder = topWalker(passwordNode, function (oneOfParents) {
		return oneOfParents.classList.contains('form-group');
	});
	function validatePassword() {
		var passwordNodeValue = passwordNode.value.trim();
		hideError(passwordHolder)
		if (!passwordNodeValue) {
			showError(passwordHolder, "Введите пароль. Поле обязательно для заполнения");
			submitButton.disabled = true;
			return false;
		}
		if (/^[a-z]+$/i.test(passwordNodeValue) || /^\d+$/i.test(passwordNodeValue)) {
			showError(passwordHolder, "Введите пароль посложнее. Пароль должен состоять из чисел и букв");
			submitButton.disabled = true;
			return false;
		}
		return true;
	}
	passwordNode.addEventListener('keyup', validatePassword, false);
	passwordNode.addEventListener('change', validatePassword, false);
	passwordNode.addEventListener('blur', validatePassword, false);

	var submitButton = document.querySelector('button[type="submit"]')
	document.querySelector('form').addEventListener('submit', function (event) {
		var formIsValid;
		formIsValid = validateEmail() && validatePassword();
		if (!formIsValid) {
			submitButton.disabled = false;
			event.preventDefault();
		}
	}, false);

	emailNode.addEventListener('keyup', isValidMailInBase, false);
	emailNode.addEventListener('change', isValidMailInBase, false);
	emailNode.addEventListener('blur', isValidMailInBase, false);

//Валидация емэйла на сервере

	function isValidMailInBase() {
			var emailNodeValue = emailNode.value;
			if (/[^@]+@[^@\.]+\.[^@]+/.test(emailNodeValue)) {
			var request = new XMLHttpRequest();
			var STATE_READY = 4;
			var emailString = emailNode.value;
			var emailArr = emailString.split(/[@.%]/);
			var url = 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + emailArr[0] + '%40' + emailArr[1] + '.' + emailArr[2];
			request.open('get', url, true);
			request.onreadystatechange = function() {
				if (request.readyState === STATE_READY) {
					var obj = JSON.parse(request.responseText);
					if (obj.used) {
						hideError(emailHolder);
						showError(emailHolder, "Такой адрес уже зарегистрирован. Введите другой.");
						console.log('this @mail already registered');
					} else {
						console.log('this @mail is free');
					}
				}
			};
			request.send();
		}
	}
}())