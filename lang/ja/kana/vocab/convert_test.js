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

var kanaConvertTestApp = angular.module('kanaConvertTestApp', []);

kanaConvertTestApp.controller('KanaConvertTestCtrl', ['$scope', function($scope) {
  $scope.results = [];
  $scope.success = true;

  var TEST_INPUTS = [
    [VOCAB['hiragana'], hiragana2romaji],
    [VOCAB['katakana'], katakana2romaji]
  ];

  for (var i in TEST_INPUTS) {
    var kana = TEST_INPUTS[i][0];
    var convertFn = TEST_INPUTS[i][1];

    for (var i = 0; i < kana.length; ++i) {
      var result = {};
      result.kana = kana[i]['ja'];
      result.expected = kana[i]['rj'];

      try {
        result.actual = convertFn(result.kana);
      } catch (error) {
        result.error = error;
      }

      result.success = (result.expected == result.actual);
      $scope.success &= result.success;
      $scope.results.push(result);
    }
  }

}]);
