cd $env:USERPROFILE\Desktop
if(!(gcm git -ea 0)){
    iwr https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe -OutFile g.exe
    Start-Process -Wait g.exe -Args '/VERYSILENT','/NORESTART'
    $env:Path=[Environment]::GetEnvironmentVariable('Path','Machine')
    del g.exe -Force
}
if(!(gcm node -ea 0)){
    iwr https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi -OutFile n.msi
    Start-Process -Wait msiexec -Args '/i','n.msi','/quiet'
    $env:Path=[Environment]::GetEnvironmentVariable('Path','Machine')
    del n.msi -Force
}
if(Test-Path mrpii-2){rm -r -fo mrpii-2}
git clone https://github.com/m4xjunior/mrpii-2
cd mrpii-2
npm i
start http://localhost:3000
npm run dev
