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

  var HIRAGANA_TO_ROMAJI = [
    ['ひらがな', 'hiragana'],
    ['えんぴつ', 'enpitsu'],
    ['いちがつ', 'ichigatsu'],
    ['かぼちゃ', 'kabocha'],
    ['しょうゆ', 'shouyu'],
    ['しちめんちょう', 'shichimenchou'],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
  ];

  var KATAKANA_TO_ROMAJI = [
    ['カタカナ', 'katakana'],
    ['ラジオ', 'rajio'],
    ['テレビ', 'terebi'],
    ['オレンジ', 'orenji'],
    ['レモン', 'remon'],
    ['マヨネーズ', 'mayoneezu'],
    ['ビール', 'biiru'],
    ['コーヒー', 'koohii'],
    ['ソファー', 'sofaa'],
    ['オーブン', 'oobun'],
    ['ユーロ', 'yuuro'],
    ['ウォン', 'won'],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
  ];

  var TEST_INPUTS = [
    [HIRAGANA_TO_ROMAJI, hiragana2romaji],
    [KATAKANA_TO_ROMAJI, katakana2romaji]
  ];

  for (var i in TEST_INPUTS) {
    var kana = TEST_INPUTS[i][0];
    var convertFn = TEST_INPUTS[i][1];

    for (var i = 0; i < kana.length; ++i) {
      var result = {};
      result.kana = kana[i][0];
      // Skip empty placeholders.
      if (result.kana.length == 0) {
        continue;
      }
      result.expected = kana[i][1];

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
