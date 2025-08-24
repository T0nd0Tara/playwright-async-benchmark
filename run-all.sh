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
export TEST_MULTIPLIER=5

# Concourent workers
for workers in 1; do
  export WORKER_COUNT=$workers
  npm run async-tests -- -j $workers
done

# PW workers stuff
for workers in 1 2 3 4 5 6 7 8 16 32 45; do
  npm run pw -- -j $workers
done

# Close server
fuser -k -TERM $SERVER_PORT/tcp
