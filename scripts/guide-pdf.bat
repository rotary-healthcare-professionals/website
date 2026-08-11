@echo off
REM Regeneriraj docs\admin-guide.pdf iz docs\admin-guide.html
REM Pokreni nakon svake izmjene vodica da PDF ostane azuran.
setlocal
pushd "%~dp0.."
set "BROWSER=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%BROWSER%" set "BROWSER=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist "%BROWSER%" (
  echo Chrome ili Edge nije pronadjen. Prekidam.
  popd
  exit /b 1
)
"%BROWSER%" --headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=8000 --print-to-pdf="%CD%\docs\admin-guide.pdf" "file:///%CD:\=/%/docs/admin-guide.html"
echo Gotovo: docs\admin-guide.pdf
popd
endlocal
