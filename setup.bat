@echo off
cd %USERPROFILE%\Desktop

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Git...
    curl -L https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe -o git.exe
    git.exe /VERYSILENT /NORESTART
    del git.exe
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Node.js...
    curl -L https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi -o node.msi
    msiexec /i node.msi /quiet /norestart
    timeout /t 30
    del node.msi
)

if exist mrpii-2 rd /s /q mrpii-2
git clone https://github.com/m4xjunior/mrpii-2
cd mrpii-2
call npm install
start http://localhost:3000
npm run dev