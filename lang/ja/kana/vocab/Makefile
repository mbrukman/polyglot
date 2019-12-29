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

VERB = @
ifeq ($(VERBOSE),1)
	VERB =
endif

YAML2JS = ./yaml2js.py

.PHONY default:
	$(VERB) echo "Available targets:"
	$(VERB) echo "* vocab: generate JavaScript file"
	$(VERB) echo "* test: open conversion test web page in browser"

vocab: vocab.js

vocab.js: vocab.yaml Makefile $(YAML2JS)
	$(VERB) $(YAML2JS) "$<" > "$@"

test: vocab
	$(VERB) ../open.sh convert_test.html

