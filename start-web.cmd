@echo off
setlocal
cd /d "%~dp0"
if exist "F:\DevTools\node-v24.22.2-win-x64\npm.cmd" set "PATH=F:\DevTools\node-v24.22.2-win-x64;%PATH%"
where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Node.js 24 LTS is required. Open a new terminal after installation.
  pause
  exit /b 1
)
if not exist "node_modules\expo\package.json" (
  call npm.cmd ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
call npm.cmd run web
if errorlevel 1 pause
