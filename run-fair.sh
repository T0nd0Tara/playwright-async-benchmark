#!/usr/bin/env bash
SERVER_PORT=3000
TIMEFORMAT=$'\nreal %3lR\nuser %3lU\nsys  %3lS'

npm run build
fuser -k -TERM $SERVER_PORT/tcp
while (curl http://localhost:$SERVER_PORT >/dev/null 2>&1); do
  echo "Waiting for port $SERVER_PORT to be close"
  sleep 1
done
npm run server &
SERVER_PID=$!
while ! (curl http://localhost:$SERVER_PORT >/dev/null 2>&1); do
  echo "Waiting for port $SERVER_PORT to be open"
  sleep 1
done
export TEST_MULTIPLIER=120

# Concourent workers
export WORKER_COUNT=6
npm run async-plimit -- -j $WORKER_COUNT

# PW worker
npm run pw -- -j $WORKER_COUNT
#
# Close server
fuser -k -TERM $SERVER_PORT/tcp
