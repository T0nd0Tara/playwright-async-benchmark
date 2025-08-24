#!/usr/bin/env bash
SERVER_PORT=3000
TIMEFORMAT=$'\nreal %3lR\nuser %3lU\nsys  %3lS'

tsc &
TSC_PID=$!
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
echo "Server is running"
wait $TSC_PID
export TEST_MULTIPLIER=200

# Concourent workers
export WORKER_COUNT=1
npm run async-tests -- -j 1

export WORKER_COUNT=2
npm run async-tests -- -j 2

# PW workers stuff
npm run pw -- -j 6

# Close server
fuser -k -TERM $SERVER_PORT/tcp
