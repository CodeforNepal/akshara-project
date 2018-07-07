#!/bin/bash
#
# Simple script for a testing flow
#
# Usage: ./test.sh

# exit the script when a command fails
set -o errexit

curl -XDELETE "$HOSTNAME:9200/akshara_nepali_test"

../scripts/set_nepali_template.sh

./index_akshara.sh sample_docs/*.json &> /dev/null

##############################################################################

# wait for refresh so that queries work
sleep 1

# Test autocompletion
./test_autocompletion.sh bhair
./test_autocompletion.sh "bhairab ary"
./test_autocompletion.sh aryal
