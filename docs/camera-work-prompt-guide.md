# 🎬 AI 圖片生成 — 運鏡提示詞完全指南（進階版）

> 本文件系統性分類所有攝影運鏡技巧，每個項目都附帶 **距離控制修飾詞**、**常見問題與解法**、以及 **實戰組合範例**。

---

## 📏 核心概念：角度 ≠ 距離

> [!IMPORTANT]
> AI 生成圖片時，**角度（Angle）和距離（Distance）是兩個獨立維度**。
> 單獨寫 `bird's-eye view` 只控制了角度，AI 會預設將角色填滿畫面。
> 你必須 **同時指定角度 + 距離** 才能得到正確的構圖。

### 距離控制通用修飾詞

以下修飾詞可以搭配 **任何** 角度使用，控制主體在畫面中的大小：

| 距離等級 | 英文修飾詞 | 角色在畫面佔比 | 範例場景 |
|---------|-----------|--------------|---------|
| 極近 | `extreme close-up`, `filling the frame` | 90%+ | 眼睛特寫 |
| 近 | `close-up`, `tightly framed` | 60-80% | 臉部特寫 |
| 中 | `medium shot`, `waist-up` | 30-50% | 半身人像 |
| 遠 | `full body`, `wide shot`, `showing surroundings` | 15-30% | 全身 + 背景 |
| 很遠 | `long shot`, `small figure`, `figure in the distance` | 5-15% | 小人物 + 大場景 |
| 極遠 | `extreme wide shot`, `tiny figure`, `vast landscape with a tiny person` | <5% | 史詩級場景 |

### 強化距離感的輔助詞

| 類別 | 英文關鍵詞 | 作用 |
|------|----------|------|
| 環境描述 | `vast landscape`, `expansive terrain`, `sprawling city` | 暗示場景很大，角色自然變小 |
| 大氣效果 | `atmospheric haze`, `depth haze`, `aerial perspective` | 遠處物體變朦朧，強化距離 |
| 前景物件 | `foreground elements`, `a tree branch in the foreground` | 有對比物→角色顯得更遠 |
| 分層描述 | `layered composition: foreground / midground / background` | 強迫 AI 建立景深層次 |
| 直接描述 | `seen from far away`, `viewed from a great distance` | 最直接的距離指示 |
| 比例暗示 | `dwarfed by the environment`, `insignificant against the backdrop` | 強調角色渺小 |

---

## 一、鏡頭距離（Shot Size / Framing）

### 1.1 大特寫 — Extreme Close-Up (ECU)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `extreme close-up`, `ECU`, `macro detail of face` |
| **畫面範圍** | 眼睛、嘴唇、手指等局部細節 |
| **情緒效果** | 極度親密、緊張、強調細節 |
| **常見問題** | AI 可能只生成一隻放大的眼睛，缺乏臉部上下文 |
| **解決方式** | 加入 `partial face visible`, `showing eye and nose bridge` 提供上下文 |

**✅ 進階 Prompt 範例：**
```
extreme close-up of a woman's left eye, 
partial face visible showing nose bridge and eyebrow,
iris reflecting a burning city, 
macro detail, wet eyelashes, 
shallow depth of field, cinematic color grading
```

---

### 1.2 特寫 — Close-Up (CU)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `close-up`, `close-up portrait`, `head shot` |
| **畫面範圍** | 頭部到肩膀 |
| **情緒效果** | 親密感、角色情緒表達 |
| **常見問題** | 容易被裁切到下巴以下太多或太少 |
| **解決方式** | 用 `head and shoulders framing` 或 `face filling 70% of frame` 精確控制 |

**✅ 進階 Prompt 範例：**
```
close-up portrait, head and shoulders framing,
a battle-scarred orc warrior with glowing amber eyes,
face filling 70% of frame, 
rim lighting from behind, dark moody background,
skin texture with scars and war paint, 85mm lens, f/2.0
```

---

### 1.3 中特寫 — Medium Close-Up (MCU)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `medium close-up`, `chest-up shot`, `bust shot` |
| **畫面範圍** | 胸口以上 |
| **情緒效果** | 對話感、展示上半身裝備/服飾 |
| **常見問題** | AI 經常把它和 close-up 混淆 |
| **解決方式** | 明確寫 `framed from chest up` 或 `showing upper body and face` |

**✅ 進階 Prompt 範例：**
```
medium close-up, framed from chest up,
an elven mage holding a glowing staff near her chin,
showing intricate shoulder armor and necklace,
soft magical ambient light, three-quarter view, 
bokeh background with floating particles
```

---

### 1.4 中景 — Medium Shot (MS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `medium shot`, `waist-up shot`, `mid-shot` |
| **畫面範圍** | 腰部以上 |
| **情緒效果** | 平衡的日常感、展示手勢和道具互動 |
| **常見問題** | 手部動作可能被裁切 |
| **解決方式** | 指定 `hands visible` 或 `holding [item] at waist level` |

**✅ 進階 Prompt 範例：**
```
medium shot, waist-up, 
a female pirate captain leaning on a ship's railing,
one hand resting on a cutlass at her hip,
ocean sunset behind her, wind blowing her hair,
golden hour lighting, cinematic composition, 
shot on 50mm lens
```

---

### 1.5 中遠景 — Medium Long Shot (MLS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `medium long shot`, `knee-up shot`, `American shot` |
| **畫面範圍** | 膝蓋以上（又稱美式鏡頭） |
| **情緒效果** | 展示身體姿態與部分環境 |
| **常見問題** | AI 容易切成全身或中景 |
| **解決方式** | 明確寫 `framed from knees up` 或 `cropped at knee level` |

---

### 1.6 牛仔鏡頭 — Cowboy Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `cowboy shot`, `mid-thigh framing` |
| **畫面範圍** | 大腿中段以上 |
| **情緒效果** | 西部片感、帥氣站姿、展示腰帶/武器 |
| **常見問題** | 非西部主題時 AI 可能忽略這個術語 |
| **解決方式** | 搭配 `framed from mid-thigh up` 補充說明 |

---

### 1.7 全身鏡頭 — Full Shot (FS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `full body shot`, `full-length portrait`, `head to toe` |
| **畫面範圍** | 完整人物，從頭頂到腳底 |
| **情緒效果** | 展示完整服裝、姿態、裝備 |
| **常見問題** | ① 腳部經常被裁切 ② 角色佔滿畫面無背景 |
| **解決方式** | ① 加 `feet visible`, `standing on [surface]` ② 加 `with space around the character`, `character occupying 60% of frame height` |

**✅ 進階 Prompt 範例：**
```
full body shot, head to toe, feet visible,
a cyberpunk street samurai standing on a rain-soaked neon street,
character occupying 60% of frame height,
surrounding environment visible: neon signs, steam vents, wet reflections,
cinematic lighting, 35mm wide-angle lens, f/4
```

---

### 1.8 遠景 — Wide Shot (WS) / Long Shot (LS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `wide shot`, `long shot`, `full scene with character` |
| **畫面範圍** | 完整人物 + 大量環境 |
| **情緒效果** | 建立世界觀、角色與場景的關係 |
| **常見問題** | AI 可能仍然讓角色佔太大比例 |
| **解決方式** | 加 `character is small in the frame`, `environment-dominant composition`, `showing the full surroundings` |

**✅ 進階 Prompt 範例：**
```
wide shot, character is small in the frame,
a lone samurai walking through a bamboo forest,
environment-dominant composition,
morning mist, sunbeams filtering through bamboo,
atmospheric depth, 24mm wide-angle lens, deep focus
```

---

### 1.9 大遠景 — Extreme Wide Shot (EWS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `extreme wide shot`, `establishing shot`, `tiny figure in vast landscape` |
| **畫面範圍** | 環境為主角，人物可能是一個小黑點 |
| **情緒效果** | 史詩感、孤獨、壯闊、人類渺小 |
| **常見問題** | ① 角色消失看不到 ② 角色還是太大 |
| **解決方式** | ① 寫 `a small but visible figure` 確保角色存在 ② 寫 `tiny figure occupying less than 5% of the frame`, `dwarfed by the environment` |

**✅ 進階 Prompt 範例：**
```
extreme wide shot, establishing shot,
tiny figure of a traveler walking across an endless salt flat,
figure occupying less than 5% of the frame,
dwarfed by the vast white landscape stretching to the horizon,
dramatic sky with towering cumulus clouds,
atmospheric haze in the distance, 14mm ultra-wide lens, f/11
```

---

## 二、垂直角度（Vertical Camera Angle）

> [!WARNING]
> **角度關鍵詞單獨使用時，AI 通常預設「中距離」**。
> 你必須同時指定距離，否則角色會佔滿畫面。
> 例如 `bird's-eye view` 需要搭配 `tiny figure` 或 `extreme wide shot` 才能讓角色變小。

### 2.1 平視 — Eye-Level Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `eye-level shot`, `eye-level angle`, `neutral angle` |
| **效果** | 最自然的視角，無特殊情緒傾向 |
| **適用搭配距離** | 所有距離都適用 |
| **常見問題** | 太「普通」缺乏視覺衝擊力 |
| **解決方式** | 搭配特殊光線或構圖增加視覺興趣 |

---

### 2.2 仰角 — Low Angle Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `low angle shot`, `looking up at`, `shot from below` |
| **效果** | 主體顯得高大、威嚴、有權力感 |
| **情緒** | 英雄、威脅、崇拜、壓迫 |
| **搭配距離** | 特寫→威脅感 / 全身→英雄感 / 遠景→紀念碑感 |
| **常見問題** | ① 角度不夠明顯 ② 角色下巴變形 |
| **解決方式** | ① 用 `dramatic low angle` 或 `extreme low angle` 強化 ② 避免同時用 close-up，改用 medium shot |

**✅ 不同距離的組合範例：**

```
【近距離仰角 — 威脅感】
low angle close-up, looking up at a vampire lord's face,
chin and jawline prominent, glowing red eyes staring down at viewer,
dark castle ceiling behind, dramatic upward perspective,
moonlight from a high window, gothic horror atmosphere
```
```
【遠距離仰角 — 英雄史詩感】
extreme low angle, full body shot,
a giant mech warrior standing on a cliff edge,
seen from the base of the cliff looking up,
figure silhouetted against a burning sky,
massive scale, tiny rocks falling, 14mm ultra-wide lens
```

---

### 2.3 俯角 — High Angle Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `high angle shot`, `looking down at`, `shot from above` |
| **效果** | 主體顯得渺小、脆弱、被審視 |
| **情緒** | 弱勢、孤獨、被監視、可憐 |
| **搭配距離** | 特寫→審視感 / 中景→監控感 / 遠景→神之視角 |
| **常見問題** | ① 頭頂佔太多畫面 ② 跟鳥瞰混淆 |
| **解決方式** | ① 寫 `slight high angle, about 30 degrees above eye level` 控制角度 ② 鳥瞰是 90° 正上方，高角度是 30-60° |

**✅ 不同距離的組合範例：**

```
【近距離俯角 — 審視感】
high angle medium close-up, looking down at
a wounded soldier sitting against a wall,
top of head and shoulders visible, blood on face,
harsh overhead fluorescent light, gritty war photography
```
```
【遠距離俯角 — 監控感】
high angle wide shot, looking down from a rooftop,
a lone detective walking through a dark rainy alley far below,
small figure with an umbrella, neon reflections on wet ground,
noir atmosphere, surveillance camera perspective
```

---

### 2.4 鳥瞰 — Bird's-Eye View ⭐ 重要

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `bird's-eye view`, `overhead shot`, `top-down view`, `aerial view`, `drone shot` |
| **效果** | 正上方 90° 垂直往下看 |
| **情緒** | 全知視角、地圖感、圖案美學 |

> [!CAUTION]
> **這是最容易出問題的角度。** 單獨寫 `bird's-eye view` 時，AI 通常會生成一個從上往下看但角色佔滿畫面的圖。你 **必須** 搭配距離修飾詞。

#### 距離控制分級表

| 你想要的效果 | 完整 Prompt 寫法 |
|-------------|-----------------|
| 鳥瞰特寫（看到角色臉/身體細節） | `bird's-eye view, close-up, character lying on the ground looking up at camera` |
| 鳥瞰中景（角色佔畫面 30-50%） | `bird's-eye view, medium shot, character standing in a courtyard, seen from directly above` |
| 鳥瞰全身（看到完整角色+周圍地面） | `bird's-eye view, full body visible from above, character lying in a flower field, surrounded by petals` |
| 鳥瞰遠景（角色變小，環境為主） | `bird's-eye view, wide shot, small figure walking through a maze garden, intricate hedge patterns visible` |
| 鳥瞰大遠景（角色是小點） | `bird's-eye view, extreme wide shot, tiny figure on a vast beach, ocean waves creating patterns, drone photography` |
| 純場景鳥瞰（無角色） | `bird's-eye view of a medieval town, no people, architectural details, aerial photography` |

**✅ 進階 Prompt 範例：**

```
【鳥瞰 + 遠景 — 正確的「俯瞰小人物」效果】
bird's-eye view, extreme wide shot,
tiny figure of a girl in a red dress walking through a golden wheat field,
figure occupying less than 3% of the frame,
vast agricultural landscape stretching in all directions,
geometric field patterns, afternoon sunlight casting long shadow,
drone photography, 14mm lens, deep focus
```
```
【鳥瞰 + 近景 — 角色佔滿但角度正確】
bird's-eye view, close-up from directly above,
a woman floating in a swimming pool, eyes closed, arms spread,
her body filling most of the frame,
turquoise water with ripple patterns around her,
bright summer sunlight, high contrast
```

---

### 2.5 蟲視 — Worm's-Eye View

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `worm's-eye view`, `ultra low angle`, `looking straight up` |
| **效果** | 從地面幾乎 90° 仰望，極端誇大高度 |
| **情緒** | 巨大、壓倒性、恐懼、敬畏 |
| **搭配距離** | 近→壓迫感 / 遠→建築巍峨 |
| **常見問題** | 角色身體比例嚴重變形（腳大頭小） |
| **解決方式** | 如果要自然比例，改用 `low angle` 而非 `worm's-eye view` |

**✅ 進階 Prompt 範例：**
```
worm's-eye view, looking straight up,
a massive dragon hovering directly overhead,
wings spread wide blocking the sky,
belly scales and claws visible, fire glowing in throat,
surrounding tree canopy at edges of frame,
dramatic foreshortening, dark fantasy, 14mm fisheye lens
```

---

### 2.6 地面視角 — Ground-Level Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `ground-level shot`, `ground angle`, `camera on the ground` |
| **效果** | 鏡頭放在地面但水平看（不像蟲視是往上看） |
| **情緒** | 戲劇性、動作感、跟昆蟲同視角 |

---

## 三、水平角度（Horizontal Angle）

### 3.1 正面 — Front View

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `front view`, `front-facing`, `facing the camera`, `looking at viewer` |
| **效果** | 角色直視鏡頭 |
| **適用場景** | 角色設定圖、證件照風格、直接互動 |
| **常見問題** | 表情僵硬、太像大頭照 |
| **解決方式** | 加 `slight smile`, `natural expression`, `candid feeling` |

---

### 3.2 四分之三角 — Three-Quarter View ⭐ 最常用

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `three-quarter view`, `3/4 angle`, `turned slightly to the side` |
| **效果** | 最經典的人像角度，臉部有立體感 |
| **適用場景** | 幾乎所有人像場景 |
| **常見問題** | 角度太微妙 AI 判斷不穩定 |
| **解決方式** | 描述具體朝向：`face turned about 30-45 degrees to the right` |

---

### 3.3 側面 — Profile View

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `profile view`, `side view`, `silhouette profile` |
| **效果** | 完全側臉，強調輪廓線條 |
| **適用場景** | 剪影、雕塑感、硬幣肖像風格 |
| **常見問題** | AI 常生成四分之三角而非完全側面 |
| **解決方式** | 強調 `perfect profile, showing one eye only, ear visible` |

---

### 3.4 背面 — Back View

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `back view`, `from behind`, `rear angle`, `seen from behind` |
| **效果** | 展示背影，常用於敘事或展示背部裝備 |
| **適用場景** | 面對遠方、走向未知、背部刺青/裝飾 |
| **常見問題** | AI 可能會旋轉角色讓臉部可見 |
| **解決方式** | 加 `back of head visible, face not shown, facing away from camera` |

---

### 3.5 荷蘭角 — Dutch Angle

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `Dutch angle`, `tilted camera`, `canted angle`, `diagonal composition` |
| **效果** | 畫面歪斜，製造不安和動態感 |
| **情緒** | 眩暈、混亂、恐怖、瘋狂、動態能量 |
| **常見問題** | 傾斜角度太輕微看不出來 |
| **解決方式** | 加 `strongly tilted, about 20-30 degrees` |

**✅ 進階 Prompt 範例：**
```
Dutch angle, strongly tilted about 25 degrees,
medium shot of a mad scientist in a sparking laboratory,
electrical arcs illuminating the scene,
equipment falling off tilted shelves,
chaotic energy, horror sci-fi atmosphere,
wide-angle lens distortion
```

---

### 3.6 過肩鏡頭 — Over-the-Shoulder (OTS)

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `over-the-shoulder shot`, `OTS`, `looking over someone's shoulder at` |
| **效果** | 從一人肩後看向另一人或場景 |
| **適用場景** | 對話、面對敵人、看風景 |
| **常見問題** | 前景的肩膀人物太清楚搶焦點 |
| **解決方式** | 加 `foreground shoulder slightly blurred` 或 `shallow depth of field focusing on the distant subject` |

---

### 3.7 第一人稱 — POV Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `POV shot`, `first-person perspective`, `from the character's eyes` |
| **效果** | 看到角色眼中的世界（可能看到角色的手或武器） |
| **適用場景** | 遊戲風、沉浸感、恐怖場景 |
| **進階寫法** | `POV shot, character's hands visible holding a sword, facing a dragon` |

---

## 四、鏡頭運動（Camera Movement）

> 靜態圖片中，運動關鍵詞模擬「某一幀被凍結的動感」。

### 4.1 推進 — Dolly-In / Push-In

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `dolly-in`, `push-in`, `camera moving toward subject` |
| **圖片效果** | 近距離聚焦感，主體突出，背景壓縮 |
| **情緒** | 聚焦、揭示、不安、親密 |
| **靜態圖片實現** | 搭配 `shallow depth of field` + 較長焦距 (85mm+) |

---

### 4.2 拉遠 — Dolly-Out / Pull-Back

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `dolly-out`, `pull-back`, `camera pulling away`, `reveal shot` |
| **圖片效果** | 從角色拉遠，揭示周圍環境 |
| **情緒** | 孤獨、揭示真相、規模展示 |
| **靜態圖片實現** | 讓角色在畫面中偏小，環境細節豐富 |

---

### 4.3 環繞 — Orbit / Arc Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `orbit shot`, `arc shot`, `camera orbiting around` |
| **圖片效果** | 有旋轉動感的構圖，背景有動態模糊 |
| **情緒** | 戲劇性、力量、重要時刻 |
| **靜態圖片實現** | 加 `slight motion blur in background`, `dynamic perspective` |

---

### 4.4 起重機 — Crane Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `crane shot`, `sweeping overhead`, `camera rising above` |
| **圖片效果** | 由低到高的升起感，或從高處俯衝 |
| **情緒** | 壯闘、史詩、揭示全局 |

---

### 4.5 手持 — Handheld Camera

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `handheld camera`, `shaky cam`, `documentary style` |
| **圖片效果** | 微微不穩定的構圖、粒感、真實 |
| **情緒** | 紀錄片風、戰爭、恐怖、真實報導 |
| **靜態圖片實現** | 搭配 `film grain`, `slightly off-center framing`, `natural imperfections` |

---

### 4.6 追蹤 — Tracking Shot

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `tracking shot`, `camera following subject`, `lateral tracking` |
| **圖片效果** | 主體清楚但背景有橫向動態模糊 |
| **靜態圖片實現** | 加 `motion blur in background`, `subject sharp, background streaked` |

---

### 4.7 甩鏡 — Whip Pan

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `whip pan`, `speed blur`, `swish pan` |
| **圖片效果** | 全畫面水平運動模糊，中心有焦點 |
| **情緒** | 極速、混亂、衝擊 |

---

### 4.8 搖鏡 / 傾斜 — Pan & Tilt

| 項目 | 內容 |
|------|------|
| **Prompt 關鍵詞** | `panning shot` (水平), `tilt-up` / `tilt-down` (垂直) |
| **圖片效果** | 暗示掃描方向性的構圖 |
| **靜態圖片實現** | `panoramic composition` 或 `vertical reveal composition` |

---

## 五、鏡頭焦距（Lens / Focal Length）

### 焦距效果完整對照

| 焦段 | Prompt 關鍵詞 | 透視效果 | 景深 | 背景壓縮 | 最佳用途 |
|------|-------------|---------|------|---------|---------|
| 8-16mm | `fisheye lens` | 極端桶狀變形、180° | 深 | 無 | 創意/VR/滑板視角 |
| 14-24mm | `ultra-wide angle`, `14mm lens` | 強透視線、空間誇大 | 深 | 無 | 建築、室內、史詩風景 |
| 24-35mm | `wide-angle`, `35mm lens` | 自然但寬廣 | 中 | 輕微 | 街拍、環境人像 |
| 50mm | `50mm lens`, `nifty fifty` | 最接近人眼 | 中 | 輕微 | 通用、自然感 |
| 85mm | `85mm portrait lens` | 臉部壓縮好看、散景優美 | 淺 | 中等 | **人像首選** |
| 100-135mm | `135mm lens` | 優美壓縮、強散景 | 很淺 | 明顯 | 進階人像、特寫 |
| 200mm+ | `200mm telephoto` | 極度壓縮、隧道效果 | 極淺 | 極強 | 野生動物、運動、壓縮風景 |
| 微距 | `macro lens`, `1:1 macro` | 放大微小物 | 極淺(mm級) | N/A | 昆蟲、花、質感 |

### 搭配光圈控制景深

| 光圈 | Prompt 關鍵詞 | 景深效果 | 適用場景 |
|------|-------------|---------|---------|
| f/1.2 - f/1.4 | `f/1.4, extremely shallow depth of field` | 極淺，只有眼睛清楚 | 夢幻人像 |
| f/1.8 - f/2.8 | `f/2.0, shallow depth of field` | 淺，主體突出 | 一般人像 |
| f/4 - f/5.6 | `f/4, moderate depth of field` | 中等清晰範圍 | 小團體、環境人像 |
| f/8 - f/11 | `f/8, sharp throughout` | 大部分清楚 | 風景、建築 |
| f/16 - f/22 | `f/16, deep focus, everything in focus` | 從近到遠全清 | 全景風景 |

> [!TIP]
> **黃金組合：** `85mm lens, f/1.4, shallow depth of field, creamy bokeh` 是 AI 圖生成中最常用且效果最好的人像設定之一。

### ⚠️ 焦距 + 角度衝突對照

| ❌ 衝突組合 | 原因 | ✅ 正確替代 |
|------------|------|-----------|
| `fisheye lens` + `compressed background` | 魚眼鏡頭不會壓縮 | `200mm telephoto` + `compressed background` |
| `wide-angle` + `strong bokeh` | 廣角鏡頭散景弱 | `85mm lens` + `strong bokeh` |
| `200mm telephoto` + `vast wide landscape` | 長焦看不到寬廣場景 | `14mm ultra-wide` + `vast wide landscape` |
| `macro lens` + `full body shot` | 微距鏡頭不適合拍全身 | `macro lens` + `extreme close-up` |

---

## 六、景深與對焦效果（Depth of Field & Focus）

| 效果 | Prompt 關鍵詞 | 說明 | 範例搭配 |
|------|-------------|------|---------|
| 淺景深 | `shallow depth of field`, `bokeh` | 主體清楚，背景模糊 | 人像、特寫 |
| 極淺景深 | `paper-thin depth of field`, `only eyes in focus` | 只有極窄範圍清楚 | 戲劇性特寫 |
| 深景深 | `deep focus`, `everything sharp` | 全部清楚 | 風景、建築、群像 |
| 移軸 | `tilt-shift`, `miniature effect` | 選擇性模糊，模型感 | 城市、鳥瞰 |
| 柔焦 | `soft focus`, `dreamy blur` | 整體柔和朦朧 | 夢境、浪漫 |
| 散景光點 | `bokeh lights`, `hexagonal bokeh`, `creamy bokeh` | 背景光點虛化形狀 | 夜景人像 |
| 前景虛化 | `foreground blur`, `shooting through foreground elements` | 前方模糊，有層次感 | 偷窺感、草叢中 |
| 中央對焦 | `center-focused`, `radial blur around edges` | 中間清楚邊緣模糊 | 懷舊、鏡頭效果 |

---

## 七、構圖技巧（Composition）

| 技巧 | Prompt 關鍵詞 | 效果 | 最佳搭配 |
|------|-------------|------|---------|
| 三分法 | `rule of thirds`, `subject at third intersection` | 主體偏離中心 | 人像、風景 |
| 中心構圖 | `centered composition`, `symmetrical framing` | 主體正中 | 對稱建築、肖像 |
| 引導線 | `leading lines`, `converging lines` | 用道路/河流引導視線 | 風景、建築 |
| 框中框 | `natural framing`, `framed by doorway/window/arch` | 用環境元素框住主體 | 門窗、拱門 |
| 負空間 | `negative space`, `minimalist composition` | 大量留白 | 孤獨、簡約 |
| 黃金比例 | `golden ratio composition` | 經典美學構圖 | 藝術攝影 |
| 對角線 | `diagonal composition`, `dynamic diagonal` | 動態、不穩定 | 動作場景 |
| 前中後景 | `layered composition: foreground, midground, background` | 多層次景深 | 風景、場景建立 |

---

## 八、完整組合公式

### 🧩 公式模板

```
[水平角度] + [垂直角度] + [鏡頭距離] + [主體描述] + 
[焦距] + [光圈] + [景深描述] + [光線] + [風格] + [品質]
```

> 不需要每個都填，選擇對你最重要的 5-8 個參數。

### 📖 實戰範例

#### 🎭 電影感反派登場
```
low angle, medium shot, three-quarter view,
a dark sorcerer emerging from shadows,
85mm lens, f/2.0, shallow depth of field,
dramatic rim lighting from behind, 
smoke and particles in the air,
dark fantasy, cinematic color grading, 8K
```

#### 🏔️ 史詩級「小人物大世界」
```
bird's-eye view, extreme wide shot,
tiny figure of an explorer standing at the edge of a massive frozen waterfall,
figure occupying less than 3% of the frame,
vast icy landscape with layered ice formations,
atmospheric haze, 14mm ultra-wide lens, f/11, deep focus,
National Geographic photography style, golden hour
```

#### 👤 夢幻柔美人像
```
three-quarter view, eye-level, medium close-up,
a young woman with cherry blossoms falling around her,
135mm lens, f/1.8, extremely shallow depth of field,
creamy pastel bokeh, soft diffused natural light,
subject sharp from nose to ears only,
sakura petals blurred in foreground,
ethereal dreamy atmosphere, soft color palette
```

#### ⚔️ 動態戰鬥瞬間
```
Dutch angle, low angle, cowboy shot,
a knight mid-swing slashing a flaming sword,
motion blur on sword arc, sharp on face and armor,
35mm wide-angle lens, f/4, moderate depth of field,
sparks flying, dust clouds, battlefield environment,
dynamic action photography, cinematic lighting
```

#### 🕵️ 懸疑監控風
```
high angle, wide shot, slightly Dutch angle,
a lone figure under a single streetlight in an empty parking lot,
figure is small in the frame, long shadows,
CCTV surveillance aesthetic, slight fish-eye distortion,
green-tinted night vision color palette,
grain and noise, unsettling atmosphere
```

#### 🏰 鳥瞰城堡全景
```
bird's-eye view, extreme wide shot,
a medieval castle complex on a river island,
no people visible, architectural details from above,
surrounding farmland and forest visible,
morning mist hanging in the river valley,
drone photography, 24mm lens, f/8, deep focus,
fantasy cartography aesthetic
```

---

## ⚠️ 總結：常見錯誤 vs 正確做法

| # | ❌ 常見錯誤 | 問題 | ✅ 正確做法 |
|---|-----------|------|-----------|
| 1 | 只寫 `bird's-eye view` | 角色佔滿畫面 | 搭配 `extreme wide shot, tiny figure` |
| 2 | 只寫 `low angle` | 角度可能不明顯 | 加 `dramatic low angle, looking up at` |
| 3 | `wide-angle` + `bokeh` | 物理上矛盾 | 廣角→深景深，長焦→散景 |
| 4 | `full body` 但腳被切 | 沒要求腳可見 | 加 `feet visible, standing on [surface]` |
| 5 | 塞太多修飾詞 | AI 困惑、結果混亂 | 選最重要的 5-8 個 |
| 6 | 角度和距離不分 | 構圖不如預期 | 角度（上下左右）+距離（遠近）分別指定 |
| 7 | 只靠一個關鍵詞 | 效果不穩定 | 用描述性句子+關鍵詞雙重確認 |
| 8 | 沒指定風格 | AI 預設平淡 | 加攝影風格或藝術風格 |

---

*最後更新：2026-02-21*
