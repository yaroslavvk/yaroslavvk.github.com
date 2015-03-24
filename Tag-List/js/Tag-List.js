'use strict';

(function() {

	function Talky(node, tags) {
		this.targetNode = node;
		this.tags = tags;
		var KEY_ESC = 13;
		this.targetNode.html('<div class="conteiner-edit"><div class="results-box"><a id="link1" href="#">End editing</a><div class="tags-box"></div></div><div class="form"><input class="cur-tag" type="text"><input class="addBtn btn btn-primary btn-large" type="submit" value="Add tag"></div></div><div class="conteiner-show"><div class="results-box"><a id="link2" href="#">Edit tags</a><div class="tags-box"></div></div></div>');
		this.setInitialTags(this.tags);
		var _this = this;

		$(window).keyup(function(event) {
			if (event.keyCode === KEY_ESC) {
				_this.setCurrentTags(_this.targetNode.find('.cur-tag').val());
				_this.targetNode.find('.cur-tag').val('');
			}
		});

		this.targetNode.find('.addBtn').click(function() {
			_this.setCurrentTags(_this.targetNode.find('.cur-tag').val());
			_this.targetNode.find('.cur-tag').val('');
		});

		this.targetNode.find('#link1').click(function() {
			_this.targetNode.find('.conteiner-show').css('display', 'block');
			_this.targetNode.find('.conteiner-edit').css('display', 'none');
		});

		this.targetNode.find('#link2').click(function() {
			_this.targetNode.find('.conteiner-show').css('display', 'none');
			_this.targetNode.find('.conteiner-edit').css('display', 'block');
		});
	};

	Talky.prototype.setInitialTags = function(arr) {
		for (var i = 0; i < arr.length; i += 1) {
			this.setCurrentTags(arr[i]);
		}
	};

	Talky.prototype.setCurrentTags = function(curTagName) {
		if (curTagName === '') {
			return;
		}
		this.targetNode.find('.conteiner-edit').find('.tags-box').html('');
		this.targetNode.find('.conteiner-show').find('.tags-box').html('');
		this.tags.push(curTagName.trim());
		this.tags = this.getUnique(this.tags);
		for (var i = 0; i < this.tags.length; i += 1) {
			this.targetNode.find('.conteiner-edit').find('.tags-box').append('<div class="tag"><div class="tag-name">' + this.tags[i] + '</div><span class="cancelBtn label label-danger">x</span></div>');
			this.targetNode.find('.conteiner-show').find('.tags-box').append('<div class="tag"><div class="tag-name">' + this.tags[i] + '</div>');
		}
		this.getEventForDelete();
	};

	var curTagName;

	Talky.prototype.getEventForDelete = function() {
		var _tagsArr = this.tags;
		var _this = this;
		this.targetNode.find('.cancelBtn').click(function(event) {
			curTagName = $(this).closest('.tag').find('.tag-name').text();
			for (var i = 0; i < _tagsArr.length; i += 1) {
				if (_tagsArr[i] === curTagName) {
					if (_tagsArr.indexOf(_tagsArr[i]) === 0) {
						_this.targetNode.find('.conteiner-edit').find('.tags-box').html('');
						_this.targetNode.find('.conteiner-show').find('.tags-box').html('');
						_tagsArr.splice(0, 1);
						console.log(_tagsArr);
						_this.setInitialTags(_tagsArr);
						return;
					} else {
						_tagsArr.splice(_tagsArr.indexOf(_tagsArr[i]), 1);
						_this.setInitialTags(_tagsArr);
					}
				}
			}
		});
	};

	Talky.prototype.getUnique = function(list) {
		var res = [];
		for (var i = 0; i < list.length; i += 1) {
			if (res.indexOf(list[i]) === -1) {
				res.push(list[i]);
			}
		}
		return res;
	};

	window.Talky = Talky;

})();