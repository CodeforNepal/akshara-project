#!/bin/bash
#
# setup_aksara_cluster.sh
#
# Simple script to prep the akshara elasticsearch cluster once it's up.
# Configures stuff like index mappings and pipeline configuration.
#
# Ideally we want this to execute after the elasticsearch container starts,
# but there seems to be now way to trigger it cleanly from there.

# dir where this script is
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

SCRIPTS_DIR="${BASE_DIR}/scripts"

##############################################################################

if [ ! -d "$SCRIPTS_DIR" ]; then
  echo "Could not find the scripts directory: ${SCRIPTS_DIR}"
  exit 1
fi

if ! curl --silent "${HOSTNAME}:9200" 2>&1 > /dev/null; then
  echo "No response from the elasticsearch cluster. Is it up?"
  exit 1
fi

##############################################################################

for script in "$SCRIPTS_DIR"/*.sh; do
  # only print the script filename
  echo "Running script: ${script##*/}"

  # run it now
  "$script"

  echo -e "\n"
done
