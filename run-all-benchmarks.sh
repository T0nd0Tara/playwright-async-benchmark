#!/usr/bin/env bash
set -x

for script in run-all run-best run-fair; do
  logs_path="./run-logs/$script"
  for i in 0 1 2; do
    ./$script.sh >|$logs_path/ubuntu-chrome-$i.txt
  done
done
