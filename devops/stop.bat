@echo off
REM Stop the backend
echo Stopping the backend...
FOR /F "tokens=5" %%i IN ('netstat -aon ^| find "5000" ^| find "LISTENING"') DO taskkill /F /PID %%i
IF ERRORLEVEL 1 (
    echo Failed to stop the backend.
)

REM Stop the frontend
echo Stopping the frontend...
FOR /F "tokens=5" %%i IN ('netstat -aon ^| find "3000" ^| find "LISTENING"') DO taskkill /F /PID %%i
IF ERRORLEVEL 1 (
    echo Failed to stop the frontend.
)

echo Both backend and frontend stopped successfully.
