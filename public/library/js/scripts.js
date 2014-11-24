
$(function () {

	var button = $("BUTTON");
	var textarea = $("TEXTAREA");

	function sayIt() {
		var msg = new SpeechSynthesisUtterance(textarea.val());
		speechSynthesis.speak(msg);
	}

	button.on('click', sayIt);

});
