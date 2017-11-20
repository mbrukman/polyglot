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

function kana2romaji(kana, type, ja2rj) {
  var romaji = [];
  for (var i = 0; i < kana.length; /* increment in body */) {
    // Try to match the digraph first.
    if (i < kana.length - 1) {
      var digraph = kana.substring(i, i + 2);
      if (digraph in ja2rj) {
        romaji.push(ja2rj[digraph]);
        i += 2;
        continue;
      }
    }

    // If not found as digraph, try the monograph.
    var monograph = kana[i];
    if (monograph in ja2rj) {
      romaji.push(ja2rj[monograph]);
      i++;
      continue;
    }

    // Special monographs which don't have stand-alone mappings.
    if (monograph == 'ー') {
      if (romaji.length == 0) {
        throw "The symbol 'ー' cannot be at the beginning of a word.";
      }
      var lastKana = romaji[romaji.length - 1];
      romaji.push(lastKana[lastKana.length - 1]);
      i++;
      continue;
    }

    // If we have found no candidates, we have a problem.
    throw 'No ' + type + ' -> rōmaji mapping for: ' + kana[i];
  }
  return romaji.join('');
}

/**
 * @param {string} hiragana
 * @return {string} romaji
 */
function hiragana2romaji(kana) {
  return kana2romaji(kana, 'hiragana', DATA['hiragana']['ja2rj']);
}

/**
 * @param {string} katakana
 * @return {string} romaji
 */
function katakana2romaji(kana) {
  return kana2romaji(kana, 'katakana', DATA['katakana']['ja2rj']);
}
