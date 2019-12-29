#!/usr/bin/python
#
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Convert data in YAML file to Javascript data declaration."""

from __future__ import print_function
import json
import os
import sys

try:
    import yaml
except:
    # Add top-level `third_party/python` directory to the search path.
    sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..',
        '..', 'third_party', 'python'))
    import yaml


HIRAGANA = 'hiragana'
KATAKANA = 'katakana'

JA = 'ja'
RJ = 'rj'
EN = 'en'

JA2RJ = 'ja2rj'


class DuplicateKanaError(Exception):
    def __init__(self, message):
        super(DuplicateKanaError, self).__init__(message)
        self.message = message

    def __str__(self):
        return unicode(self.message).encode('utf-8')


def addUnique(dict, key, value):
    if key in dict:
        error = '\n'.join([
            'Duplicate entries:',
            '  %s -> %s' % (key, dict[key]),
            '  %s -> %s' % (key, value)
        ])
        raise DuplicateKanaError(error)
    dict[key] = value


def main(argv):
    if len(argv) < 2:
        sys.stderr.write('Syntax: %s [input-file]\n' % argv[0])
        sys.exit(1)

    with open(argv[1]) as input_file:
        yaml_data = yaml.safe_load(input_file.read())

    print("""\
// Copyright 2019 Google LLC
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

// DO NOT MODIFY MANUALLY; YOUR CHANGES WILL BE REVERTED!\
""")
    print('// This file was auto-generated via: "%s"' % ' '.join(argv))
    print('var VOCAB = %s;' % json.dumps(yaml_data, indent=2,
        separators=(',', ': ')))


if __name__ == '__main__':
    main(sys.argv)
