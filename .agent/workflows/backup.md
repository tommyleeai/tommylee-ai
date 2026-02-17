---
description: 手動觸發備份，建立版本快照並 git commit
language: zh-TW
---

> 📌 提醒：本專案一律使用繁體中文溝通。

# 備份 Workflow

隨時可用 `/backup` 觸發此流程，建立當前狀態的完整備份。

// turbo-all

---

## 1. 取得當前版本號

```powershell
Select-String -Path "index.html" -Pattern "versionTag.*v([\d.]+)" | ForEach-Object { $_.Matches.Groups[1].Value }
```

---

## 2. 建立快照目錄

```powershell
$version = "vX.X"  # 替換為實際版本號
$date = Get-Date -Format "yyyyMMdd"
$dir = "backups/${version}_${date}"
New-Item -ItemType Directory -Path $dir -Force
```

---

## 3. 複製核心檔案到快照

```powershell
Copy-Item index.html, script.js, styles.css -Destination $dir
```

---

## 4. 驗證快照完整性

```powershell
Get-ChildItem $dir | Format-Table Name, Length
```

確認三個檔案都存在且大小合理（不為 0）。

---

## 5. Git 提交

```powershell
git add -A
git commit -m "${version}: 備份快照 ${date}"
```

---

## 6. Git 推送（如有遠端）

```powershell
git push
```

---

## 7. 回報

告知使用者：
- 備份目錄路徑
- 包含的檔案和大小
- git commit hash
