'use strict'

var tabBox = document.querySelector('.tabs');
var tabs = document.querySelectorAll('.tab');
var containers = document.querySelectorAll('.container');
var btnsPlus = document.querySelectorAll('.btn-plus');
var btnsMinus = document.querySelectorAll('.btn-minus');
var navBox = document.querySelectorAll('.navigation-box');
var linkNamesArr = document.querySelectorAll('.link-name');
var body = document.body;
var imgsArr = document.querySelectorAll('img');
var curWindowWidth = 980; // This script switch page from desktop to mobile and from mobile to desktop. Point to chenge - width 980px.
var tabNames = [];	
var tempArr;
var hash;
var eventTargetName;
var stringForPush;
var index;

for (var i = 0; i < tabs.length; i += 1) {
	stringForPush = tabs[i].textContent.toLowerCase();
	tempArr = getSplitArr(stringForPush);
	tabNames.push(tempArr[0]);
}

function getSplitArr(string) {
	return string.split(/[+\-%]/);
}

function getIndex(verifiableName) {
	for (var i = 0; i < tabNames.length; i += 1) {
		if (verifiableName === tabNames[i]) {
			return tabNames.indexOf(tabNames[i]);
		}
	}
}

function removeActiveClass(node) {
	for (var i = 0; i < node.length; i += 1) {
		node[i].classList.remove('active');
	}
}

function addActiveClass(targetName) {
	index = getIndex(targetName);
	removeActiveClass(tabs);
	removeActiveClass(containers);
	if (index === 0) {
		containers[0].classList.add('active');
		tabs[0].classList.add('active');
	} else {
		containers[index].classList.add('active');
		tabs[index].classList.add('active');
	}
	getBtnsPlusMinus();
}

function getBtnsPlusMinus() {
	if (window.innerWidth <= curWindowWidth) {
		for (var k = 0; k < containers.length; k += 1) {
			btnsPlus[k].classList.remove('btn-inline');
			btnsMinus[k].classList.remove('btn-inline');
		}
		for (var i = 0; i < containers.length; i += 1) {
			if (containers[i].classList.contains('active')) {
				btnsMinus[i].classList.add('btn-inline');
			} else {
				btnsPlus[i].classList.add('btn-inline');
			}
		}
	} else {
		for (var j = 0; j < containers.length; j += 1) {
			btnsPlus[j].classList.remove('btn-inline');
			btnsMinus[j].classList.remove('btn-inline');
		}
	}
}

function setDefaultStylesConts(contArr) {
	for (var i = 0; i < contArr.length; i += 1) {
		contArr[i].classList.remove('cont-mob-block');
		contArr[i].classList.remove('cont-mob-last');
		contArr[i].classList.remove('cont-mob-top');
	}
}

function setDefaultStylesTabs(tabsArr) {
	for (var i = 0; i < tabsArr.length; i += 1) {
		tabsArr[i].classList.remove('tab-mob-first');
	}
}

function getClickEvent(eventTarget) {
	if (window.innerWidth <= curWindowWidth) {
		eventTargetName = eventTarget.textContent.toLowerCase();
		tempArr = getSplitArr(eventTargetName);
		addActiveClass(tempArr[0]);
		window.location.hash = tempArr[0];
		index = getIndex(tempArr[0]);
		if (index === 0) {
			setDefaultStylesConts(containers);
			setDefaultStylesTabs(tabs);
			containers[index].classList.add('cont-mob-block');
			tabs[index + 1].classList.add('tab-mob-first');
		} else if (index === tabs.length - 1) {
			setDefaultStylesConts(containers);
			setDefaultStylesTabs(tabs);
			containers[index].classList.add('cont-mob-last');
			containers[index].classList.add('cont-mob-block');
		} else {
			setDefaultStylesConts(containers);
			setDefaultStylesTabs(tabs);
			containers[index].classList.add('cont-mob-top');
			containers[index].classList.add('cont-mob-block');
			tabs[index + 1].classList.add('tab-mob-first');
		}
	} else {
		setDefaultStylesConts(containers);
		setDefaultStylesTabs(tabs);
		eventTargetName = eventTarget.textContent.toLowerCase();
		tempArr = getSplitArr(eventTargetName);
		addActiveClass(tempArr[0]);
		window.location.hash = tempArr[0];
	}
}

function getMobileSidebar() {
	for (var i = 0; i < linkNamesArr.length; i += 1) {
		linkNamesArr[i].classList.add('link-name-none');
	}
	navBox[0].classList.add('nav-box-mob');
	body.classList.add('body-margin');
}

function getDesktopSidebar() {
	for (var i = 0; i < linkNamesArr.length; i += 1) {
		linkNamesArr[i].classList.remove('link-name-none');
	}
	navBox[0].classList.remove('nav-box-mob');
	body.classList.remove('body-margin');
}

function getSidebarSize() {
	if (window.innerWidth <= curWindowWidth) {
		getMobileSidebar();
	} else {
		getDesktopSidebar();
	}
}

tabBox.addEventListener("click", function(event) { //Event delegation
	if (event.target === tabBox) {
		return
	} else {
		getClickEvent(event.target);
		getBtnsPlusMinus();
	}
}, false);

window.addEventListener("load", function() {
	getSidebarSize();
	hash = window.location.hash;
	if (hash === '') {
		window.location.hash = tabNames[0];
	}
	if (window.innerWidth <= curWindowWidth) {
		if (hash === '') {
			btnsMinus[0].classList.add('btn-inline');
			for (var i = 1; i < containers.length; i += 1) {
				btnsPlus[i].classList.add('btn-inline');
			}
		}
	} else {
		getBtnsPlusMinus();
	}
	setDefaultStylesConts(containers);
	setDefaultStylesTabs(tabs);
	if (hash === '') {
		if (window.innerWidth <= curWindowWidth) {
			setDefaultStylesConts(containers);
			setDefaultStylesTabs(tabs);
			containers[0].classList.add('active');
			tabs[0].classList.add('active');
			containers[0].classList.add('cont-mob-block');
			tabs[1].classList.add('tab-mob-first');
		} else {
			containers[0].classList.add('active');
			tabs[0].classList.add('active');
		}
	} else {
		if (window.innerWidth <= curWindowWidth) {
			tempArr = hash.split('#');
			eventTargetName = tempArr[1];
			addActiveClass(eventTargetName);
			index = getIndex(eventTargetName);
			if (index === 0) {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-block');
				tabs[index + 1].classList.add('tab-mob-first');
			} else if (index === tabs.length - 1) {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-last');
				containers[index].classList.add('cont-mob-block');
			} else {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-top');
				containers[index].classList.add('cont-mob-block');
				tabs[index + 1].classList.add('tab-mob-first');
			}
		} else {
			tempArr = hash.split('#');
			eventTargetName = tempArr[1];
			addActiveClass(eventTargetName);
		}
	}
}, false);

window.addEventListener("resize", function() {
	getSidebarSize();
	getBtnsPlusMinus();
	setDefaultStylesConts(containers);
	setDefaultStylesTabs(tabs);
	hash = window.location.hash;
	if (hash === '') {
		if (window.innerWidth <= curWindowWidth) {
			setDefaultStylesConts(containers);
			setDefaultStylesTabs(tabs);
			containers[0].classList.add('active');
			tabs[0].classList.add('active');
			containers[0].classList.add('cont-mob-block');
			tabs[1].classList.add('tab-mob-first');
		} else {
			containers[0].classList.add('active');
			tabs[0].classList.add('active');
		}
	} else {
		if (window.innerWidth <= curWindowWidth) {
			tempArr = hash.split('#');
			eventTargetName = tempArr[1];
			addActiveClass(eventTargetName);
			index = getIndex(eventTargetName);
			if (index === 0) {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-block');
				tabs[index + 1].classList.add('tab-mob-first');
			} else if (index === tabs.length - 1) {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-last');
				containers[index].classList.add('cont-mob-block');
			} else {
				setDefaultStylesConts(containers);
				setDefaultStylesTabs(tabs);
				containers[index].classList.add('cont-mob-top');
				containers[index].classList.add('cont-mob-block');
				tabs[index + 1].classList.add('tab-mob-first');
			}
		} else {
			tempArr = hash.split('#');
			eventTargetName = tempArr[1];
			addActiveClass(eventTargetName);
		}
	}
}, false);