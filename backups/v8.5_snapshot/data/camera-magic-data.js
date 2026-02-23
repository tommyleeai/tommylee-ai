// ============================================
// Camera Magic Modal — 運鏡魔法資料
// 掛載至 window.PromptGen.CameraMagicData
// 萃取自 camera-work-prompt-guide.md（54 項 + 7 分類 + bonus traits）
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.CameraMagicData = {
    TABS: [
        { id: 'all', label: '全部', en: 'All', icon: '✨' },
        { id: 'recent', label: '最近', en: 'Recent', icon: '🕐' },
        { id: 'hot', label: '熱門', en: 'Hot', icon: '🔥' },
        { id: 'distance', label: '鏡頭距離', en: 'Distance', icon: '📏' },
        { id: 'vAngle', label: '垂直角度', en: 'V-Angle', icon: '📐' },
        { id: 'hAngle', label: '水平角度', en: 'H-Angle', icon: '🔄' },
        { id: 'movement', label: '鏡頭運動', en: 'Movement', icon: '🎥' },
        { id: 'lens', label: '鏡頭焦距', en: 'Lens', icon: '🔭' },
        { id: 'dof', label: '景深對焦', en: 'DOF', icon: '🎯' },
        { id: 'composition', label: '構圖技巧', en: 'Compose', icon: '🖼️' }
    ],

    HOT_ITEMS: [
        'cu', 'ms', 'fs', 'low_angle', 'birdeye', 'three_quarter', 'dutch',
        'tracking', 'lens_85', 'shallow_dof', 'rule_thirds', 'frame_in_frame',
        'mcu', 'ews', 'profile', 'dolly_in', 'lens_50', 'bokeh', 'pov', 'cowboy'
    ],

    ITEMS: [
        // ══════════════════════════════════════
        // 📏 鏡頭距離 (distance) — 9 items
        // ══════════════════════════════════════
        { id: 'ecu', label: '大特寫', en: 'Extreme Close-Up', value: 'extreme close-up, macro detail, partial face visible', category: 'distance', icon: '🔬' },
        { id: 'cu', label: '特寫', en: 'Close-Up', value: 'close-up portrait, head and shoulders framing', category: 'distance', icon: '👤' },
        { id: 'mcu', label: '中特寫', en: 'Medium Close-Up', value: 'medium close-up, framed from chest up, bust shot', category: 'distance', icon: '👕' },
        { id: 'ms', label: '中景', en: 'Medium Shot', value: 'medium shot, waist-up shot, hands visible', category: 'distance', icon: '🧍' },
        { id: 'mls', label: '中遠景', en: 'Medium Long Shot', value: 'medium long shot, framed from knees up, American shot', category: 'distance', icon: '🚶' },
        { id: 'cowboy', label: '牛仔鏡頭', en: 'Cowboy Shot', value: 'cowboy shot, mid-thigh framing', category: 'distance', icon: '🤠' },
        { id: 'fs', label: '全身鏡頭', en: 'Full Shot', value: 'full body shot, head to toe, feet visible', category: 'distance', icon: '🧍‍♂️' },
        { id: 'ws', label: '遠景', en: 'Wide Shot', value: 'wide shot, character is small in the frame, environment-dominant composition', category: 'distance', icon: '🏞️' },
        { id: 'ews', label: '大遠景', en: 'Extreme Wide Shot', value: 'extreme wide shot, tiny figure in vast landscape, dwarfed by the environment', category: 'distance', icon: '🌍' },

        // ══════════════════════════════════════
        // 📐 垂直角度 (vAngle) — 6 items
        // ══════════════════════════════════════
        { id: 'eye_level', label: '平視', en: 'Eye-Level', value: 'eye-level shot, neutral angle', category: 'vAngle', icon: '👁️' },
        { id: 'low_angle', label: '仰角', en: 'Low Angle', value: 'dramatic low angle shot, looking up at, shot from below', category: 'vAngle', icon: '⬆️' },
        { id: 'high_angle', label: '俯角', en: 'High Angle', value: 'high angle shot, looking down at, shot from above', category: 'vAngle', icon: '⬇️' },
        { id: 'birdeye', label: '鳥瞰', en: "Bird's-Eye View", value: "bird's-eye view, overhead shot, top-down view, aerial view", category: 'vAngle', icon: '🦅' },
        { id: 'wormseye', label: '蟲視', en: "Worm's-Eye View", value: "worm's-eye view, ultra low angle, looking straight up", category: 'vAngle', icon: '🐛' },
        { id: 'ground_level', label: '地面視角', en: 'Ground-Level', value: 'ground-level shot, camera on the ground', category: 'vAngle', icon: '🌿' },

        // ══════════════════════════════════════
        // 🔄 水平角度 (hAngle) — 7 items
        // ══════════════════════════════════════
        { id: 'front_view', label: '正面', en: 'Front View', value: 'front view, facing the camera, looking at viewer', category: 'hAngle', icon: '🎯' },
        { id: 'three_quarter', label: '四分之三角', en: 'Three-Quarter', value: 'three-quarter view, face turned about 30-45 degrees', category: 'hAngle', icon: '↗️' },
        { id: 'profile', label: '側面', en: 'Profile View', value: 'profile view, perfect profile, showing one eye only', category: 'hAngle', icon: '👤' },
        { id: 'back_view', label: '背面', en: 'Back View', value: 'back view, from behind, face not shown, facing away from camera', category: 'hAngle', icon: '🔙' },
        { id: 'dutch', label: '荷蘭角', en: 'Dutch Angle', value: 'Dutch angle, strongly tilted about 20-30 degrees, canted angle', category: 'hAngle', icon: '📐' },
        { id: 'ots', label: '過肩鏡頭', en: 'Over-the-Shoulder', value: 'over-the-shoulder shot, shallow depth of field focusing on the distant subject', category: 'hAngle', icon: '🙋' },
        { id: 'pov', label: '第一人稱', en: 'POV Shot', value: "POV shot, first-person perspective, character's hands visible", category: 'hAngle', icon: '🎮' },

        // ══════════════════════════════════════
        // 🎥 鏡頭運動 (movement) — 8 items
        // ══════════════════════════════════════
        { id: 'dolly_in', label: '推進', en: 'Dolly-In', value: 'dolly-in, push-in, camera moving toward subject, shallow depth of field', category: 'movement', icon: '➡️' },
        { id: 'dolly_out', label: '拉遠', en: 'Dolly-Out', value: 'dolly-out, pull-back, reveal shot, character small in frame', category: 'movement', icon: '⬅️' },
        { id: 'orbit', label: '環繞', en: 'Orbit Shot', value: 'orbit shot, camera orbiting around, slight motion blur in background', category: 'movement', icon: '🔄' },
        { id: 'crane', label: '起重機', en: 'Crane Shot', value: 'crane shot, sweeping overhead, camera rising above', category: 'movement', icon: '🏗️' },
        { id: 'handheld', label: '手持', en: 'Handheld', value: 'handheld camera, documentary style, film grain, slightly off-center framing', category: 'movement', icon: '✋' },
        { id: 'tracking', label: '追蹤', en: 'Tracking Shot', value: 'tracking shot, camera following subject, motion blur in background, subject sharp', category: 'movement', icon: '🏃' },
        { id: 'whip_pan', label: '甩鏡', en: 'Whip Pan', value: 'whip pan, speed blur, swish pan', category: 'movement', icon: '💨' },
        { id: 'pan_tilt', label: '搖鏡/傾斜', en: 'Pan & Tilt', value: 'panning shot, panoramic composition', category: 'movement', icon: '↔️' },

        // ══════════════════════════════════════
        // 🔭 鏡頭焦距 (lens) — 8 items
        // ══════════════════════════════════════
        { id: 'lens_fisheye', label: '魚眼 8-16mm', en: 'Fisheye', value: 'fisheye lens, 180 degrees, barrel distortion', category: 'lens', icon: '🐟' },
        { id: 'lens_14', label: '超廣角 14-24mm', en: 'Ultra-Wide', value: '14mm ultra-wide angle lens, strong perspective, exaggerated space', category: 'lens', icon: '🌐' },
        { id: 'lens_35', label: '廣角 24-35mm', en: 'Wide Angle', value: '35mm wide-angle lens, natural but wide, street photography', category: 'lens', icon: '📸' },
        { id: 'lens_50', label: '標準 50mm', en: 'Nifty Fifty', value: '50mm lens, closest to human eye, natural perspective', category: 'lens', icon: '👁️' },
        { id: 'lens_85', label: '人像 85mm', en: '85mm Portrait', value: '85mm portrait lens, beautiful face compression, creamy bokeh', category: 'lens', icon: '🖼️' },
        { id: 'lens_135', label: '中望遠 135mm', en: '135mm Tele', value: '135mm lens, beautiful compression, strong bokeh', category: 'lens', icon: '🔭' },
        { id: 'lens_200', label: '望遠 200mm+', en: '200mm Telephoto', value: '200mm telephoto lens, extreme compression, tunnel effect', category: 'lens', icon: '🔬' },
        { id: 'lens_macro', label: '微距', en: 'Macro', value: 'macro lens, 1:1 macro, extreme detail, paper-thin depth of field', category: 'lens', icon: '🔍' },

        // ══════════════════════════════════════
        // 🎯 景深對焦 (dof) — 8 items
        // ══════════════════════════════════════
        { id: 'shallow_dof', label: '淺景深', en: 'Shallow DOF', value: 'shallow depth of field, bokeh, f/1.8', category: 'dof', icon: '🌸' },
        { id: 'ultra_shallow', label: '極淺景深', en: 'Ultra Shallow', value: 'paper-thin depth of field, only eyes in focus, f/1.2', category: 'dof', icon: '💫' },
        { id: 'deep_focus', label: '深景深', en: 'Deep Focus', value: 'deep focus, everything sharp, f/11', category: 'dof', icon: '🔭' },
        { id: 'tilt_shift', label: '移軸', en: 'Tilt-Shift', value: 'tilt-shift, miniature effect, selective blur', category: 'dof', icon: '🏠' },
        { id: 'soft_focus', label: '柔焦', en: 'Soft Focus', value: 'soft focus, dreamy blur, romantic atmosphere', category: 'dof', icon: '☁️' },
        { id: 'bokeh', label: '散景光點', en: 'Bokeh Lights', value: 'bokeh lights, hexagonal bokeh, creamy bokeh', category: 'dof', icon: '✨' },
        { id: 'fg_blur', label: '前景虛化', en: 'Foreground Blur', value: 'foreground blur, shooting through foreground elements, layered depth', category: 'dof', icon: '🌿' },
        { id: 'center_focus', label: '中央對焦', en: 'Center Focus', value: 'center-focused, radial blur around edges', category: 'dof', icon: '🎯' },

        // ══════════════════════════════════════
        // 🖼️ 構圖技巧 (composition) — 8 items
        // ══════════════════════════════════════
        { id: 'rule_thirds', label: '三分法', en: 'Rule of Thirds', value: 'rule of thirds, subject at third intersection', category: 'composition', icon: '#️⃣' },
        { id: 'centered', label: '中心構圖', en: 'Centered', value: 'centered composition, symmetrical framing', category: 'composition', icon: '⊕' },
        { id: 'leading_lines', label: '引導線', en: 'Leading Lines', value: 'leading lines, converging lines guiding the eye', category: 'composition', icon: '↗️' },
        { id: 'frame_in_frame', label: '框中框', en: 'Frame in Frame', value: 'natural framing, framed by doorway, window framing subject', category: 'composition', icon: '🪟' },
        { id: 'negative_space', label: '負空間', en: 'Negative Space', value: 'negative space, minimalist composition, large empty area', category: 'composition', icon: '⬜' },
        { id: 'golden_ratio', label: '黃金比例', en: 'Golden Ratio', value: 'golden ratio composition, fibonacci framing', category: 'composition', icon: '🐚' },
        { id: 'diagonal', label: '對角線', en: 'Diagonal', value: 'diagonal composition, dynamic diagonal lines', category: 'composition', icon: '↙️' },
        { id: 'layered', label: '前中後景', en: 'Layered', value: 'layered composition: foreground, midground, background, depth layers', category: 'composition', icon: '📊' }
    ],

    BONUS_TRAITS: {
        distance: [
            { icon: '🌫️', zh: '大氣透視', en: 'atmospheric haze, aerial perspective' },
            { icon: '🌿', zh: '前景物件', en: 'foreground elements adding depth' },
            { icon: '📐', zh: '分層構圖', en: 'layered composition: foreground / midground / background' },
            { icon: '🔍', zh: '主體佔比控制', en: 'character occupying 60% of frame height' },
            { icon: '👣', zh: '腳部可見', en: 'feet visible, standing on surface' },
            { icon: '🏔️', zh: '環境渺小感', en: 'dwarfed by the environment, insignificant against backdrop' }
        ],
        vAngle: [
            { icon: '🎭', zh: '戲劇性透視', en: 'dramatic perspective, foreshortening' },
            { icon: '👑', zh: '威嚴感', en: 'imposing, powerful, dominant' },
            { icon: '🕊️', zh: '脆弱感', en: 'vulnerable, small, isolated' },
            { icon: '📷', zh: '監控視角', en: 'surveillance camera perspective' },
            { icon: '🦸', zh: '英雄感', en: 'heroic, monumental, impressive' },
            { icon: '🌌', zh: '全知視角', en: 'omniscient perspective, god view' }
        ],
        hAngle: [
            { icon: '😊', zh: '自然表情', en: 'natural expression, candid feeling' },
            { icon: '🗡️', zh: '面對敵人', en: 'facing the enemy, confrontation' },
            { icon: '🎨', zh: '輪廓強調', en: 'silhouette profile, contour lines' },
            { icon: '🚶', zh: '走向未知', en: 'walking into the unknown, away from camera' },
            { icon: '💫', zh: '不安感', en: 'disorienting, chaotic energy' },
            { icon: '🎮', zh: '沉浸感', en: 'immersive, first-person experience' }
        ],
        movement: [
            { icon: '💨', zh: '背景動態模糊', en: 'motion blur in background' },
            { icon: '🎬', zh: '電影感', en: 'cinematic, dynamic perspective' },
            { icon: '📰', zh: '紀實感', en: 'documentary feel, raw footage' },
            { icon: '🌀', zh: '旋轉動感', en: 'rotational energy, spinning feel' },
            { icon: '⚡', zh: '速度感', en: 'sense of speed, fast movement' },
            { icon: '🔍', zh: '揭示效果', en: 'reveal effect, uncovering the scene' }
        ],
        lens: [
            { icon: '🌸', zh: '奶油散景', en: 'creamy bokeh, smooth background blur' },
            { icon: '📐', zh: '透視誇大', en: 'exaggerated perspective, strong convergence' },
            { icon: '🗜️', zh: '背景壓縮', en: 'compressed background, stacked layers' },
            { icon: '🔮', zh: '桶狀變形', en: 'barrel distortion, curved lines' },
            { icon: '👁️', zh: '人眼自然感', en: 'natural human eye perspective' },
            { icon: '🏔️', zh: '空間層次', en: 'spatial depth, dimensional layering' }
        ],
        dof: [
            { icon: '💎', zh: '六角形散景', en: 'hexagonal bokeh shapes' },
            { icon: '🌈', zh: '光圈星芒', en: 'starburst from small aperture, f/16' },
            { icon: '🧸', zh: '模型感', en: 'miniature model effect, toy-like' },
            { icon: '💭', zh: '夢幻朦朧', en: 'dreamy, ethereal, romantic haze' },
            { icon: '🎪', zh: '散景光暈', en: 'bokeh circles of confusion, light orbs' },
            { icon: '📸', zh: '銳利全域', en: 'tack sharp throughout, hyper-focused' }
        ],
        composition: [
            { icon: '➡️', zh: '視線引導', en: 'eye guided through the frame' },
            { icon: '⚖️', zh: '視覺平衡', en: 'visual balance, harmonious weight' },
            { icon: '🎭', zh: '張力感', en: 'visual tension, dynamic energy' },
            { icon: '🌀', zh: '螺旋構圖', en: 'golden spiral, fibonacci curve' },
            { icon: '🪞', zh: '對稱美學', en: 'perfect symmetry, mirror composition' },
            { icon: '📍', zh: '焦點突出', en: 'clear focal point, visual hierarchy' }
        ]
    }
};
