@echo off
title CodeLab Hub Local Server
echo ========================================================
echo   Starting CodeLab Hub Local HTTP Server
echo   URL: http://localhost:8080
echo ========================================================
echo.
timeout /t 1 /nobreak >nul
start "" "http://localhost:8080"
npx --yes serve -l 8080 -s "%~dp0"
pause
