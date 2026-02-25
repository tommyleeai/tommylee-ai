@echo off
REM === 快速啟動開發伺服器（禁用快取） ===
REM 用法：直接雙擊或在終端機執行 serve.cmd
cd /d "%~dp0"
echo 啟動開發伺服器 http://localhost:5050 （快取已禁用）
echo 按 Ctrl+C 停止...
echo.
REM 使用 cmd 原生呼叫 npx（繞過 PowerShell 限制）
npx http-server -p 5050 -c-1
