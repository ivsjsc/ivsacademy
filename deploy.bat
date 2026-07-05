@echo off
rem Windows wrapper to execute deploy.sh using Git Bash if available

set "BASH_EXE=%PROGRAMFILES%\\Git\\bin\\bash.exe"
if exist "%BASH_EXE%" (
  "%BASH_EXE%" "%~dp0deploy.sh" %*
) else (
  echo Bash not found. Please install Git for Windows or ensure bash is in PATH.
  exit /b 1
)
