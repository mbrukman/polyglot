// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var kanaPractice = angular.module('kanaPractice', []);

kanaPractice.controller('KanaPracticeCtrl', ['$scope', function($scope) {
  $scope.data = KANA;

  $scope.kana = 'hiragana';

  $scope.countCorrect = 0;
  $scope.countTotal = 0;

  $scope.inCorrectionMode = false;

  $scope.dict = null;
  $scope.japanese = '';
  $scope.romaji = '';

  $scope.nextQuestion = function() {
    $scope.dict = $scope.data[$scope.kana]['ja2rj'];
    var random = Math.floor(
      Math.random() * Object.keys($scope.dict).length);
    $scope.japanese = Object.keys($scope.dict)[random];

    $scope.correctAnswer = '';
    $scope.romaji = '';
    document.getElementById('romaji').focus();
  };

  $scope.checkUserInput = function() {
    var userInput = $scope.romaji.replace(/(^\s+)|(\s+$)/, '').toLowerCase();
    if (userInput.length == 0) {
      return;
    }

    if (!$scope.inCorrectionMode) {
      $scope.countTotal++;
    }

    var correctAnswer = $scope.dict[$scope.japanese];
    if (correctAnswer == userInput) {
      if (!$scope.inCorrectionMode) {
        $scope.countCorrect++;
      }
      $scope.inCorrectionMode = false;
      $scope.nextQuestion();
    } else {
      $scope.correctAnswer = correctAnswer;
      $scope.inCorrectionMode = true;
    }
  };

  $scope.nextQuestion();
}]);
