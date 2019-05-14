#!/bin/bash
#
# indexer.sh
#
# Index all the raw akshara documents
#
# TODO use bulk api and do this all from python, so that we can do other
# things like indexing the docs along with autocomplete suggestions.
#
# Usage: ./indexer.sh [RAW_DATA_DIR]

# exit the script when a command fails
set -o errexit

# cacth exit status for piped commands
set -o pipefail

DEFAULT_RAW_DATA_DIR="crawled"

# if no arg is provided to the script, use the default
RAW_DATA_DIR="${1:-${DEFAULT_RAW_DATA_DIR}}"

if [ ! -d "$RAW_DATA_DIR" ]; then
  echo "${RAW_DATA_DIR}: No such directory"
  exit 1
fi

#INDEXING_SCRIPT="echo"
INDEXING_SCRIPT="../test/index_akshara.sh"

###############################################################################

echo "Indexing json files in directory: ${RAW_DATA_DIR}"

find "$RAW_DATA_DIR" -type f -name '*.json' -print0 | xargs -0 -I{} $INDEXING_SCRIPT '{}'
