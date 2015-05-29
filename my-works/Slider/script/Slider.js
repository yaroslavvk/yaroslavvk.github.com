'use strict';

(function() {
	function Slider(node, imgs) {
		this.mainNode = $(node);
		this.imgs = imgs;
		this.mainNode.html('<div class="slider"><div class="strips-block"><div class="strip one"></div><div class="strip two"></div><div class="strip three"></div><div class="strip four"></div></div><div class="imgs-block"><ul class="table"><li><img id="img1" src=' + this.imgs[0] + ' alt="image1"></li><li><img id="img2" src=' + this.imgs[1] + ' alt="image2"></li><li><img id="img3" src=' + this.imgs[2] + ' alt="image3"></li><li><img id="img4" src=' + this.imgs[3] + ' alt="image4"></li></ul></div></div>');
		this.table = this.mainNode.find('.table');
		this.stripOne = this.mainNode.find('.one');
		this.stripTwo = this.mainNode.find('.two');
		this.stripThree = this.mainNode.find('.three');
		this.stripFour = this.mainNode.find('.four');
		this.intervalID = null;
		this.pause = null;
		var _this = this;

		this.mainNode.find('.strips-block').on('click', '.one', function() {
			clearTimeout(_this.pause);
			var strip = $(this);
			strip.addClass("strip-hover");
			_this.stripTwo.removeClass("strip-hover");
			_this.stripThree.removeClass("strip-hover");
			_this.stripFour.removeClass("strip-hover");
			_this.table.stop().animate({
				"margin-left": "0"
			}, "slow");
			clearInterval(_this.intervalID);
			_this.pause = setTimeout(function() {
				_this.intervalID = setInterval(function() {
					_this.nextPic();
					_this.addRemoveBacklight();
				}, 2000);
			}, 5000);
		});

		this.mainNode.find('.strips-block').on('click', '.two', function() {
			clearTimeout(_this.pause);
			var strip = $(this);
			strip.addClass("strip-hover");
			_this.stripOne.removeClass("strip-hover");
			_this.stripThree.removeClass("strip-hover");
			_this.stripFour.removeClass("strip-hover");
			_this.table.stop().animate({
				"margin-left": "-910px"
			}, "slow");
			clearInterval(_this.intervalID);
			_this.pause = setTimeout(function() {
				_this.intervalID = setInterval(function() {
					_this.nextPic();
					_this.addRemoveBacklight();
				}, 2000);
			}, 5000);
		});

		this.mainNode.find('.strips-block').on('click', '.three', function() {
			clearTimeout(_this.pause);
			var strip = $(this);
			strip.addClass("strip-hover");
			_this.stripOne.removeClass("strip-hover");
			_this.stripTwo.removeClass("strip-hover");
			_this.stripFour.removeClass("strip-hover");
			_this.table.stop().animate({
				"margin-left": "-1820px"
			}, "slow");
			clearInterval(_this.intervalID);
			_this.pause = setTimeout(function() {
				_this.intervalID = setInterval(function() {
					_this.nextPic();
					_this.addRemoveBacklight();
				}, 2000);
			}, 5000);
		});

		this.mainNode.find('.strips-block').on('click', '.four', function() {
			clearTimeout(_this.pause);
			var strip = $(this);
			strip.addClass("strip-hover");
			_this.stripOne.removeClass("strip-hover");
			_this.stripTwo.removeClass("strip-hover");
			_this.stripThree.removeClass("strip-hover");
			_this.table.stop().animate({
				"margin-left": "-2730px"
			}, "slow");
			clearInterval(_this.intervalID);
			_this.pause = setTimeout(function() {
				_this.intervalID = setInterval(function() {
					_this.nextPic();
					_this.addRemoveBacklight();
				}, 2000);
			}, 5000);
		});
	};

	Slider.prototype.nextPic = function() {
		if (this.table.css("margin-left") === "-2730px") {
			this.table.stop().animate({
				"margin-left": "0px"
			}, "slow");
		} else {
			this.table.stop().animate({
				"margin-left": "-=910px"
			}, "slow");
		}
	};

	Slider.prototype.addRemoveBacklight = function() {
		this.stripOne.removeClass("strip-hover");
		if (this.table.css("margin-left") === "0px") {
			this.stripTwo.prev().removeClass("strip-hover");
			this.stripTwo.addClass("strip-hover");
		} else if (this.table.css("margin-left") === "-910px") {
			this.stripThree.prev().removeClass("strip-hover");
			this.stripThree.addClass("strip-hover");
		} else if (this.table.css("margin-left") === "-1820px") {
			this.stripFour.prev().removeClass("strip-hover");
			this.stripFour.addClass("strip-hover");
		} else if (this.table.css("margin-left") === "-2730px") {
			this.stripThree.removeClass("strip-hover");
			this.stripFour.removeClass("strip-hover");
			this.addFirstBacklight();
		}
	};

	Slider.prototype.addFirstBacklight = function() {
		this.stripOne.addClass("strip-hover");
	};

	window.Slider = Slider;

})();