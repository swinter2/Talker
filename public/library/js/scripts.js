TalkerController = (function ($) {

	var supported = false, 
		ss,
		button,
		textarea,
		msg, 
		voice;

	function onDocReady() {
		button = $("button");
		textarea = $("textarea");
		supported = window.speechSynthesis && SpeechSynthesisUtterance;

		if (!supported) {
			console.error("No speech synthesis supported in this browser.");
			button.add(textarea).hide();
			textarea.after("No speech synthesis supported in this browser.");
			return;
		}
		ss = window.speechSynthesis;

		button.on('click', sayIt);
		ss.onvoiceschanged = function () {
			ss.getVoices().forEach(function (voice) {
				console.log(voice.name);
			});
			voice = ss.getVoices().filter(function (voice) {
				// return voice.name === 'Hysterical';
				return voice.name === 'Google UK English Male';
				// return voice.name === 'Google Deutsch';
			})[0];
			console.log(voice);
		};
	}

	function sayIt() {
		msg = new SpeechSynthesisUtterance(textarea.val());
		msg.voice = voice;
		ss.speak(msg);
	}

	$(onDocReady);
	return {};

})(jQuery);
