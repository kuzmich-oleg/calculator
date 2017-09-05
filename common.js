var result = "";
var temp_string = "";
var optional_box = document.getElementsByClassName("optional-box")[0];
var result_screen = document.getElementsByClassName("result")[0];

function throw_err() {
	optional_box.style.backgroundColor = "red";
	setTimeout(function () {optional_box.style.backgroundColor = "white"}, 1000);
	result = "";
}

function check(string) {
	for (i = 1 i < string.length; ++i)
		if (string[i] == "/" && string[i - 1] == "/") return false;
	return true;
}

function calculate() {
	"use strict";
	if (!check(temp_string)) throw_err();
	try {
		result = eval(temp_string);
		if (result=== Infinity) {
			throw_err();
		} 
	} catch (err) {
		throw_err();
	}

	if (result) {
			result_screen.innerHTML = result;
	} 
	temp_string = result;
}

function storeInfo(event) {
	"use strict";
	var ev_tar = event.target;
	var temp_id = ev_tar.getAttribute("id");

	if (temp_id) {
		if (temp_id === "equal") {
			calculate();
		} else {
			temp_string += ev_tar.innerHTML;
			result_screen.innerHTML = temp_string;
		}
	}
}

window.onload = function () {
	"use strict";
	optional_box.addEventListener("click", function (event) {
		storeInfo(event);
	});
};
