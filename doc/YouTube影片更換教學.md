# YouTube 影片更換教學

本文件說明如何更換國泰產險活動頁面中的 YouTube 影片連結。

---

## 📍 影片位置

本活動頁面有 **2 個位置** 使用 YouTube 影片：

### 1. 舞蹈教學彈出視窗
- **檔案**: `index.html`
- **行數**: 第 995 行
- **功能**: 點擊「簡單點舞蹈教學」按鈕後，彈出視窗播放的影片

### 2. 完整版 MV
- **檔案**: `index.html`
- **行數**: 第 791 行
- **功能**: 點擊封面圖後播放的完整版 MV 影片

---

## 🔧 如何更換影片

### Step 1: 取得 YouTube 影片 ID

#### 方法 A: 從影片網址取得 (推薦)

**範例網址:**
```
https://www.youtube.com/watch?v=9-WSZPBaNJk
```

**影片 ID 就是 `v=` 後面的部分:**
```
9-WSZPBaNJk
```

#### 方法 B: 從分享連結取得

**分享連結:**
```
https://youtu.be/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg
```

**影片 ID 是 `youtu.be/` 後面、`?` 前面的部分:**
```
9-WSZPBaNJk
```

**`si` 參數** (可選):
```
HzZPs0Fk0CstvDUg
```
> `si` 參數是 YouTube 的追蹤參數，建議保留以追蹤流量來源。

---

### Step 2: 修改 `index.html` 檔案

#### 📍 位置 1: 舞蹈教學彈出視窗 (第 995 行)

**找到這一行:**
```html
<div class="video_modal_content">
  <iframe 
    id="youtube_player" 
    width="100%" 
    height="100%" 
    src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1" 
    title="國泰產險 - 簡單點舞蹈教學" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
  </iframe>
</div>
```

**只需修改 `src` 屬性中的影片 ID 和 `si` 參數:**

**修改前:**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1"
```

**修改後 (範例):**
```html
src="https://www.youtube.com/embed/新的影片ID?si=新的si參數&enablejsapi=1"
```

**實際範例:**
假設新影片網址是 `https://youtu.be/ABC123xyz?si=DEF456uvw`

```html
src="https://www.youtube.com/embed/ABC123xyz?si=DEF456uvw&enablejsapi=1"
```

---

#### 📍 位置 2: 完整版 MV (第 791 行)

**找到這一行:**
```html
<iframe 
  id="campaign-video" 
  width="100%" 
  height="100%" 
  src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1" 
  title="國泰產險 - 簡單點洗腦舞完整版MV" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  style="display: none;">
</iframe>
```

**同樣只需修改 `src` 屬性:**

**修改前:**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1"
```

**修改後 (範例):**
```html
src="https://www.youtube.com/embed/新的影片ID?si=新的si參數&enablejsapi=1"
```

---

### Step 3: 儲存並測試

1. **儲存 `index.html` 檔案**
2. **重新整理網頁** (強制刷新: `Ctrl+Shift+R` 或 `Cmd+Shift+R`)
3. **測試兩個位置的影片是否正常播放:**
   - ✅ 點擊「簡單點舞蹈教學」按鈕
   - ✅ 點擊完整版 MV 封面圖

---

## ⚠️ 重要注意事項

### 1. 必須保留 `enablejsapi=1` 參數
```html
src="https://www.youtube.com/embed/影片ID?si=參數&enablejsapi=1"
                                                        ↑
                                            這個參數必須保留！
```

**原因:** 這個參數讓 JavaScript 可以控制影片播放（例如：點擊封面圖後自動播放）

**❌ 錯誤範例:**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg"
<!-- 缺少 &enablejsapi=1，導致 JavaScript 無法控制播放 -->
```

**✅ 正確範例:**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1"
```

---

### 2. 確保影片允許嵌入

**檢查方法:**
1. 前往 YouTube 影片頁面
2. 點擊「分享」按鈕
3. 點擊「嵌入」

**如果看到嵌入代碼:**
```html
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>
```

**✅ 代表此影片允許嵌入**

**❌ 如果顯示「無法嵌入」或「影片擁有者已停用嵌入功能」:**
- 該影片無法使用在網頁中
- 需要選擇其他允許嵌入的影片

---

### 3. `si` 參數的作用

**`si` 參數是什麼？**
- YouTube 的「分享識別碼」(Share Identifier)
- 用於追蹤流量來源和分析觀看數據

**是否必須保留？**
- ⚠️ **非必要**，但**建議保留**
- 移除後影片仍可正常播放，但會失去追蹤功能

**範例對比:**

**有 `si` 參數 (推薦):**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1"
```

**沒有 `si` 參數 (仍可使用):**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?enablejsapi=1"
```

---

### 4. 兩個位置是否必須使用相同影片？

**答案: ❌ 不一定**

- **舞蹈教學彈出視窗** 和 **完整版 MV** 可以使用不同的影片
- 根據需求，可以設定不同的影片 ID

**範例: 使用不同影片**

**舞蹈教學 (第 995 行):**
```html
src="https://www.youtube.com/embed/教學影片ID?si=參數&enablejsapi=1"
```

**完整版 MV (第 791 行):**
```html
src="https://www.youtube.com/embed/完整版影片ID?si=參數&enablejsapi=1"
```

---

## 📋 完整修改檢查清單

更換影片時，請確認以下項目：

- [ ] **取得新影片的 YouTube ID**
- [ ] **確認影片允許嵌入** (在 YouTube 上點擊「分享 → 嵌入」確認)
- [ ] **修改 `index.html` 第 995 行** (舞蹈教學彈出視窗)
- [ ] **修改 `index.html` 第 791 行** (完整版 MV)
- [ ] **確保保留 `&enablejsapi=1` 參數**
- [ ] **儲存檔案**
- [ ] **重新整理網頁並測試兩個位置**
- [ ] **確認沒有出現「Video unavailable」錯誤**

---

## 🐛 常見問題排解

### 問題 1: 影片顯示「Video unavailable」

**可能原因:**
1. ✅ 影片 ID 輸入錯誤
2. ✅ 影片不允許嵌入
3. ✅ 影片已被刪除或設為私人
4. ✅ 瀏覽器安裝了內容阻擋器 (Ad Blocker)

**解決方法:**
1. 確認影片 ID 是否正確
2. 在 YouTube 上確認影片允許嵌入
3. 嘗試使用無痕模式測試（排除 Ad Blocker 干擾）
4. 檢查 Console (按 F12) 是否有錯誤訊息

---

### 問題 2: 點擊封面圖後影片沒有自動播放

**可能原因:**
缺少 `enablejsapi=1` 參數

**解決方法:**
確認 `src` 屬性中包含 `&enablejsapi=1`

**正確範例:**
```html
src="https://www.youtube.com/embed/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg&enablejsapi=1"
```

---

### 問題 3: 影片在本地測試正常，但部署後無法播放

**可能原因:**
1. YouTube 限制某些網域嵌入
2. 網頁使用 HTTP 而非 HTTPS

**解決方法:**
1. 確保部署環境使用 HTTPS (例如 GitHub Pages 自動支援)
2. 確認影片設定允許在所有網域嵌入

---

## 🔍 快速參考

### 影片網址格式

**YouTube 影片網址:**
```
https://www.youtube.com/watch?v=9-WSZPBaNJk
                                 ↑ 影片 ID
```

**YouTube 分享連結:**
```
https://youtu.be/9-WSZPBaNJk?si=HzZPs0Fk0CstvDUg
                  ↑ 影片 ID    ↑ si 參數
```

**嵌入網址格式:**
```
https://www.youtube.com/embed/影片ID?si=參數&enablejsapi=1
```

---

### 修改範本

**替換影片時，複製以下範本:**

```html
src="https://www.youtube.com/embed/[在這裡貼上新的影片ID]?si=[在這裡貼上si參數]&enablejsapi=1"
```

**範例:**
假設新影片網址是:
```
https://youtu.be/XYZ789abc?si=LMN456def
```

**修改為:**
```html
src="https://www.youtube.com/embed/XYZ789abc?si=LMN456def&enablejsapi=1"
```

---

## 📞 需要協助？

如果遇到問題無法解決，請檢查:
1. **Console 錯誤訊息** (按 F12 開啟開發者工具)
2. **影片是否允許嵌入** (在 YouTube 上確認)
3. **網址格式是否正確** (參考本文件的範例)

---

**文件版本:** v1.0  
**最後更新:** 2026-05-29  
**適用檔案:** `new-campaign-2026/index.html`
