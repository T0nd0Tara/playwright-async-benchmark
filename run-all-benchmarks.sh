#!/usr/bin/env bash
set -x

for script in run-all run-best run-fair; do
  for i in 0 1 2; do
    ./$script.sh >|./run-logs/$script/ubuntu-chrome-$i.txt
  done
done
