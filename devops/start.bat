@echo off
REM Check if the virtual environment directory exists
IF NOT EXIST backend\venv (
    echo Creating virtual environment...
    python -m venv backend\venv
    IF ERRORLEVEL 1 (
        echo Failed to create virtual environment.
        exit /b 1
    )
)

REM Activate the virtual environment
call backend\venv\Scripts\activate
IF ERRORLEVEL 1 (
    echo Failed to activate virtual environment.
    exit /b 1
)

REM Install backend dependencies
echo Installing backend dependencies...
pip install -r backend\requirements.txt
IF ERRORLEVEL 1 (
    echo Failed to install backend dependencies.
    exit /b 1
)

REM Start the backend
echo Starting the backend...
start "" /B python backend\app.py
IF ERRORLEVEL 1 (
    echo Failed to start the backend.
    exit /b 1
)

REM Change to the frontend directory
cd frontend

REM Install frontend dependencies if node_modules does not exist
IF NOT EXIST node_modules (
    echo Installing frontend dependencies...
    npm install
    IF ERRORLEVEL 1 (
        echo Backend started successfully, but failed to install frontend dependencies.
        exit /b 1
    )
)

REM Start the frontend
echo Starting the frontend...
start "" /B npm start
IF ERRORLEVEL 1 (
    echo Backend started successfully, but failed to start the frontend.
    exit /b 1
)

REM Return to the root directory
cd ..
echo Both backend and frontend started successfully.
