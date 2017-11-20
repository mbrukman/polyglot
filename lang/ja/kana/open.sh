#!/bin/bash -eu
#
# Copyright 2018 Google LLC
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

declare -r CHROME_LINUX="/usr/bin/google-chrome"
declare -r CHROME_OSX="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

declare -r FIREFOX_LINUX="/usr/bin/firefox"
declare -r FIREFOX_OSX="/Applications/Firefox.app/Contents/MacOS/firefox"

declare -r URL="${1:-}"
if [[ -z "${URL}" ]]; then
  echo "Syntax: $0 [URL to open in a browser]"
  exit 1
fi

# Args:
#   $1: URL
#   $*: available browser binaries
function open_url() {
  local url="$1"
  shift
  for browser in "$@"; do
    if [[ -e "${browser}" ]]; then
      "${browser}" "${url}" > /dev/null 2>&1 &
      return
    fi
  done
  echo "Browser not found; please open ${URL} manually." >&2
  return 2
}

if [[ "$(uname -s)" == "Linux" ]]; then
  open_url "${URL}" "${CHROME_LINUX}" "${FIREFOX_LINUX}"
elif [[ "$(uname -s)" == "Darwin" ]]; then
  open_url "${URL}" "${CHROME_OSX}" "${FIREFOX_OSX}"
else
  echo "Unknown OS; please open ${URL} manually." >&2
  return 3
fi
