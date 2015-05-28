talker = angular.module('Talker', []);

var phraseGroups = [
	{
		title: "Default",
		defaultVoice: "Fred",
		phrases: [
			'Hi',
			'Hello',
			'How are you?',
			'I am well thank you.',
			'Good morning',
			'Good evening',
			'Good night',
			'Okey dokey',
		]
	},
	{
		title: "Stephen Hawking",
		defaultVoice: 'Fred',
		phrases: [
			'black holes are awesome',
			"ee equals m c squared"
		]
	},
];

talker.controller('TalkerController', ['$scope', function ($scope) {
	
	var hashText = (window.location.hash || "").replace(/^#/g, '');
	$scope.hashUsed = !!hashText;
	$scope.text = hashText;
	$scope.said = '';
	$scope.supported = !!window.speechSynthesis;
	if (!$scope.supported) return;
	$scope.voices = [];
	$scope.voice;
	$scope.previousVoice;
	$scope.$watch(function (scope) {
		// console.log(scope.text);
		window.location.hash = scope.text;
	});

	$scope.phraseGroups = phraseGroups
	$scope.phraseGroup = $scope.phraseGroups[0];

	var speechSynthesis = window.speechSynthesis,
		msg = new SpeechSynthesisUtterance(),
		voicesInitHappened = false;

	speechSynthesis.onvoiceschanged = function () {
		if (voicesInitHappened) return;

		voicesInitHappened = true;
		$scope.$apply(function ($s) {
			$s.voices = speechSynthesis.getVoices();
			$s.voice = $s.voices[0];
			$s.changePhraseGroup();
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
			if ($scope.phraseGroup.phrases.indexOf($scope.text) < 0) {
				$scope.phraseGroup.phrases.push($scope.text);
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

		var i = $scope.phraseGroup.phrases.indexOf(phrase);
		if (i > -1) {
			$scope.phraseGroup.phrases.splice(i, 1);
		}
	};

	$scope.changePhraseGroup = function () {
		if ($scope.phraseGroup.defaultVoice) {
			if ($scope.voices) {
				for (var i in $scope.voices) {
					var voice = $scope.voices[i];
					if (voice.name === $scope.phraseGroup.defaultVoice) {
						$scope.chooseVoice(voice);
						return;
					}
				}
			}
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

	// Try to get the voices first synchronously for Safari's sake.
	$scope.voices = speechSynthesis.getVoices();
	if ($scope.voices && $scope.voices.length > 0) {
		$scope.voice = $scope.voices[0];
		$scope.changePhraseGroup();
	}
	
	if ($scope.hashUsed) {
		$scope.sayIt();
	}

}]);
