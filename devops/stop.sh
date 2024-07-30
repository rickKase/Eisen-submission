#!/bin/bash

# Function to stop a process given a PID file and process name
stop_process() {
  local PID_FILE=$1
  local PROCESS_NAME=$2

  if [ -f "$PID_FILE" ]; then
    local PID=$(cat "$PID_FILE")
    kill $PID || { echo "Failed to stop $PROCESS_NAME with PID $PID"; return 1; }
    echo "$PROCESS_NAME stopped"
    rm "$PID_FILE"
  else
    echo "No $PROCESS_NAME PID file found. $PROCESS_NAME may not be running."
  fi
}

# Stop the Flask server
stop_process "../devops/flask.pid" "Flask server"
FLASK_STOPPED=$?

# Stop the Node.js process (React application)
stop_process "../devops/react.pid" "Node.js application"
REACT_STOPPED=$?

# Check if Node.js (React app) is still running on port 3000 and kill it if necessary
if lsof -i :3000; then
  REACT_PID=$(lsof -ti :3000)
  kill $REACT_PID || { echo "Failed to stop Node.js application with PID $REACT_PID"; exit 1; }
  echo "Node.js application running on port 3000 stopped"
fi

if [ $FLASK_STOPPED -eq 0 ] && [ $REACT_STOPPED -eq 0 ]; then
  echo "Backend and frontend servers are stopped"
else
  echo "There was an issue stopping one or more processes"
  exit 1
fi
