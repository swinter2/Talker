talker = angular.module('Talker', []);

talker.controller('TalkerController', ['$scope', function ($scope) {

	$scope.text = '';
	$scope.supported = !!window.speechSynthesis;
	$scope.voices = [];
	$scope.phrases = [];
	$scope.voice;

	var speechSynthesis = window.speechSynthesis;

	speechSynthesis.onvoiceschanged = function () {
		$scope.$apply(function ($s) {
			$s.voices = speechSynthesis.getVoices();
		});
	};

	$scope.sayIt = function (phrase) {
		if (!phrase) {
			if ($scope.phrases.indexOf($scope.text) < 0) {
				$scope.phrases.push($scope.text);	
			}
		}
		var msg = new SpeechSynthesisUtterance(phrase || $scope.text);
		msg.voice = $scope.voice;
		speechSynthesis.speak(msg);
	};

	$scope.chooseVoice = function(voice) {
		$scope.voice = voice;
	};

}]);
