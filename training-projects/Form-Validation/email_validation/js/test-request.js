var request = new XMLHttpRequest();
var STATE_READY = 4;
//emailString.value = '';
var emailString = 'yaroslavvk@outlook.com';
var emailArr = emailString.split(/[@.%]/);
var url = 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + emailArr[0] + '%40' + emailArr[1] + '.' + emailArr[2];
request.open('get', url, true);
request.onreadystatechange = function() {
	if (request.readyState === STATE_READY) {
		var obj = JSON.parse(request.responseText);
		if (obj.used) {
			console.log('there is this @mail');
		} else {
			console.log('this @mail is free');
		}
	}
};
request.send();