talker = angular.module('Talker', []);

var phrases = [
'Hi', 
'Hello', 
'How are you?',
'I am well thank you.',
'Good morning', 
'Good evening',
'Good night',
'Okey dokey',
];

talker.controller('TalkerController', ['$scope', function ($scope) {

	$scope.text = '';
	$scope.said = '';
	$scope.supported = !!window.speechSynthesis;
	if (!$scope.supported) return;
	$scope.voices = [];
	$scope.phrases = phrases;
	$scope.voice;
	$scope.previousVoice;

	var speechSynthesis = window.speechSynthesis, 
		msg = new SpeechSynthesisUtterance();

	speechSynthesis.onvoiceschanged = function () {
		$scope.$apply(function ($s) {
			$s.voices = speechSynthesis.getVoices();
			$s.voice = $s.voices[0];
		});
	};

	$scope.onKeyPress = function (e) {
		// If enter and the shift key is *not* down...
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			$scope.sayIt();
		}
	}

	$scope.sayIt = function (e, phrase) {
		e && e.preventDefault();
		speechSynthesis.cancel();

		if (!phrase && $scope.text) {
			if ($scope.phrases.indexOf($scope.text) < 0) {
				$scope.phrases.push($scope.text);
			}
		}

		var txt = phrase || $scope.text;
		msg.text = txt;
		$scope.previousVoice = $scope.voice;
		msg.voice = $scope.voice;
		speechSynthesis.speak(msg);
		$scope.said = txt;
	};

	$scope.removePhrase = function (e, phrase) {
		e && e.preventDefault();
		e && e.stopPropagation();

		if (!confirm("Delete this phrase?")) {
			return;
		}

		var i = $scope.phrases.indexOf(phrase);
		if (i > -1) {
			$scope.phrases.splice(i, 1);
		}
	};

	$scope.chooseVoice = function(voice) {
		$scope.voice = voice;
	};

	$scope.clearSaid = function () {
		$scope.said = '';
	};

	$scope.clearText = function () {
		$scope.text = '';
	};

}]);
