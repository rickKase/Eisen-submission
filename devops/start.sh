#!/bin/bash

# Function to check if a process is running
is_running() {
  local PID_FILE=$1
  if [ -f "$PID_FILE" ]; then
    local PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
      return 0
    else
      rm $PID_FILE
      return 1
    fi
  else
    return 1
  fi
}

# Function to start the backend
start_backend() {
  echo "Starting backend..."

  # Navigate to the backend directory
  cd ../backend || { echo "Failed to navigate to backend directory"; exit 1; }

  # Create and activate the virtual environment
  if [ ! -d "venv" ]; then
    python3 -m venv venv
  fi
  source venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }

  # Install backend dependencies
  pip install -r requirements.txt || { echo "Failed to install backend dependencies"; exit 1; }

  # Start the Flask server in the background and log output
  nohup flask run > ../devops/backend.log 2>&1 &

  # Get the PID of the Flask process
  FLASK_PID=$!
  echo "Flask server started with PID $FLASK_PID"

  # Write the PID to a file for later use
  echo $FLASK_PID > ../devops/flask.pid

  echo "Backend started successfully"
}

# Function to start the frontend
start_frontend() {
  echo "Starting frontend..."

  # Navigate to the frontend directory
  cd ../frontend || { echo "Failed to navigate to frontend directory"; exit 1; }

  # Install frontend dependencies
  npm install || { echo "Failed to install frontend dependencies"; exit 1; }

  # Ensure react-scripts has execute permissions
  chmod +x node_modules/.bin/react-scripts || { echo "Failed to set permissions for react-scripts"; exit 1; }

  # Start the React application in the background and log output
  nohup npm start > ../devops/frontend.log 2>&1 &

  # Get the PID of the React process
  REACT_PID=$!
  echo "React application started with PID $REACT_PID"

  # Write the PID to a file for later use
  echo $REACT_PID > ../devops/react.pid

  echo "Frontend started successfully"
}

# Main script
cd "$(dirname "$0")" || { echo "Failed to navigate to script directory"; exit 1; }

# Check and start the backend if not already running
if is_running "../devops/flask.pid"; then
  echo "Backend is already running."
else
  start_backend
fi

# Check and start the frontend if not already running
if is_running "../devops/react.pid"; then
  echo "Frontend is already running."
else
  start_frontend
fi

echo "Backend and frontend servers are running"
