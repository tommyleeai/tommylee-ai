// ============================================
// AI Prompt Generator — Pose Magic 資料
// 9 大分類 + 重心位置 + 視線方向
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.PoseMagicData = (function () {

    // ── 姿勢分類 Tab 定義 ──
    const TABS = [
        { id: 'standing', label: '🧍 站姿系', en: 'Standing' },
        { id: 'sitting', label: '🪑 坐姿系', en: 'Sitting' },
        { id: 'movement', label: '🏃 行動系', en: 'Movement' },
        { id: 'combat', label: '⚔️ 戰鬥系', en: 'Combat' },
        { id: 'interact', label: '🤝 互動系', en: 'Interaction' },
        { id: 'emotional', label: '💔 情緒演出系', en: 'Emotional' },
        { id: 'dominant', label: '👑 王者氣場系', en: 'Dominant' },
        { id: 'cute', label: '🌸 可愛Q版系', en: 'Cute' },
        { id: 'camera', label: '📷 構圖特殊系', en: 'Camera' }
    ];

    // ── 姿勢項目（每項含 label, en, value, category）──
    const POSES = [
        // ── ① 站姿系 Standing ──
        { label: '正面站立', en: 'Front Standing', value: 'standing, front view, upright posture', category: 'standing' },
        { label: '側身站立', en: 'Side Standing', value: 'standing sideways, side profile, side pose', category: 'standing' },
        { label: '背對站立', en: 'Back Standing', value: 'from behind, back view, standing facing away', category: 'standing' },
        { label: '雙手插腰', en: 'Hands on Hips', value: 'hands on hips, confident standing pose', category: 'standing' },
        { label: '單手叉腰', en: 'One Hand on Hip', value: 'one hand on hip, casual standing pose', category: 'standing' },
        { label: '抱胸站立', en: 'Arms Crossed', value: 'arms crossed, crossed arms, standing with folded arms', category: 'standing' },
        { label: '放鬆站姿', en: 'Relaxed Stand', value: 'relaxed standing, casual stance, natural pose', category: 'standing' },
        { label: '軍姿站立', en: 'Military Stand', value: 'military stance, attention pose, soldier standing', category: 'standing' },

        // ── ② 坐姿系 Sitting ──
        { label: '正坐', en: 'Sitting Straight', value: 'sitting, proper sitting pose, upright seated', category: 'sitting' },
        { label: '側坐', en: 'Side Sitting', value: 'sitting sideways, side seated, turned sitting', category: 'sitting' },
        { label: '盤腿', en: 'Cross-Legged', value: 'sitting cross-legged, indian style sitting, lotus position', category: 'sitting' },
        { label: '翹腳', en: 'Legs Crossed', value: 'legs crossed, crossed legs while sitting, elegant sitting', category: 'sitting' },
        { label: '坐椅子後仰', en: 'Leaning Back', value: 'leaning back in chair, reclining seated, relaxed in chair', category: 'sitting' },
        { label: '坐地面', en: 'Sitting on Floor', value: 'sitting on floor, seated on ground, floor sitting', category: 'sitting' },
        { label: '坐在桌上', en: 'Sitting on Table', value: 'sitting on table, perched on desk, casual table sitting', category: 'sitting' },
        { label: '坐在高處邊緣', en: 'Edge Sitting', value: 'sitting on edge, sitting on ledge, dangling legs from height', category: 'sitting' },

        // ── ③ 行動系 Movement ──
        { label: '走路', en: 'Walking', value: 'walking, walking pose, mid-stride', category: 'movement' },
        { label: '奔跑', en: 'Running', value: 'running, sprinting, running pose, dynamic movement', category: 'movement' },
        { label: '跳躍', en: 'Jumping', value: 'jumping, leap, mid-air jump, airborne', category: 'movement' },
        { label: '回頭走', en: 'Looking Back Walk', value: 'walking while looking back, turning head while walking', category: 'movement' },
        { label: '跨步前進', en: 'Striding Forward', value: 'striding forward, large step, confident stride', category: 'movement' },
        { label: '空中翻身', en: 'Aerial Flip', value: 'aerial flip, mid-air acrobatics, somersault', category: 'movement' },
        { label: '俯衝', en: 'Dive', value: 'diving pose, swooping down, plunging downward', category: 'movement' },

        // ── ④ 戰鬥系 Combat ──
        { label: '持武器待戰', en: 'Weapon Ready', value: 'holding weapon, battle ready, combat stance with weapon', category: 'combat' },
        { label: '防禦姿態', en: 'Defensive Pose', value: 'defensive stance, guarding pose, blocking position', category: 'combat' },
        { label: '攻擊揮砍', en: 'Attack Slash', value: 'slashing attack, swinging weapon, mid-attack motion', category: 'combat' },
        { label: '弓箭拉弦', en: 'Drawing Bow', value: 'drawing bow, pulling bowstring, archer pose', category: 'combat' },
        { label: '單手舉劍', en: 'Raised Sword', value: 'sword raised, holding sword up, blade pointed skyward', category: 'combat' },
        { label: '法術施放', en: 'Casting Spell', value: 'casting spell, magic casting, magical energy in hands', category: 'combat' },
        { label: '半蹲警戒', en: 'Crouching Guard', value: 'crouching, low guard stance, half-squat alert pose', category: 'combat' },

        // ── ⑤ 互動系 Interaction ──
        { label: '揮手', en: 'Waving', value: 'waving hand, greeting wave, friendly wave', category: 'interact' },
        { label: '指向前方', en: 'Pointing Forward', value: 'pointing forward, finger pointing, outstretched arm pointing', category: 'interact' },
        { label: '雙手合十', en: 'Prayer Hands', value: 'hands together, prayer pose, clasped hands', category: 'interact' },
        { label: '比心', en: 'Heart Sign', value: 'heart hands, making heart shape with hands, finger heart', category: 'interact' },
        { label: '手插口袋', en: 'Hands in Pockets', value: 'hands in pockets, casual pocket pose', category: 'interact' },
        { label: '手托下巴', en: 'Chin Rest', value: 'hand on chin, resting chin on hand, thinking pose', category: 'interact' },
        { label: '握拳加油', en: 'Fist Pump', value: 'fist pump, clenched fist raised, cheering pose', category: 'interact' },

        // ── ⑥ 情緒演出系 Emotional ──
        { label: '抱膝縮成一團', en: 'Hugging Knees', value: 'hugging knees, curled up, fetal position sitting', category: 'emotional' },
        { label: '低頭垂肩', en: 'Drooping Shoulders', value: 'head down, slumped shoulders, dejected posture', category: 'emotional' },
        { label: '仰頭大笑', en: 'Head Back Laugh', value: 'head thrown back laughing, looking up while laughing', category: 'emotional' },
        { label: '崩潰跪地', en: 'Collapse Kneel', value: 'kneeling on ground, collapsed, on knees despair', category: 'emotional' },
        { label: '仰天吶喊', en: 'Screaming Skyward', value: 'screaming at sky, shouting upward, anguished cry', category: 'emotional' },
        { label: '背靠牆滑落', en: 'Sliding Down Wall', value: 'sliding down wall, back against wall slumping, wall slide', category: 'emotional' },

        // ── ⑦ 王者氣場系 Dominant ──
        { label: '高處俯視', en: 'Overlooking', value: 'looking down from above, overlooking, dominant high position', category: 'dominant' },
        { label: '坐王座', en: 'Throne Sitting', value: 'sitting on throne, royal seat, king on throne', category: 'dominant' },
        { label: '披風展開', en: 'Cape Spread', value: 'cape flowing, cloak spread, dramatic cape unfurling', category: 'dominant' },
        { label: '單腳踩物', en: 'Foot on Object', value: 'foot on object, stepping on, dominant foot placement', category: 'dominant' },
        { label: '單手持權杖', en: 'Holding Scepter', value: 'holding scepter, staff in hand, royal staff pose', category: 'dominant' },
        { label: '緩步前行', en: 'Slow Walk', value: 'slow confident walk, leisurely stride, powerful slow walk', category: 'dominant' },

        // ── ⑧ 可愛Q版系 Cute ──
        { label: '內八站姿', en: 'Pigeon-Toed', value: 'pigeon-toed standing, inward feet, cute shy standing', category: 'cute' },
        { label: '雙手背後', en: 'Hands Behind', value: 'hands behind back, arms behind, innocent pose', category: 'cute' },
        { label: '輕跳', en: 'Light Hop', value: 'light hop, small jump, bouncing happily', category: 'cute' },
        { label: '頭歪一邊', en: 'Head Tilt', value: 'head tilt, tilted head, curious head angle', category: 'cute' },
        { label: '單腳抬起', en: 'One Leg Up', value: 'one leg raised, standing on one foot, playful leg lift', category: 'cute' },
        { label: '轉圈裙擺飛起', en: 'Twirling Skirt', value: 'twirling, spinning, skirt flowing, dress twirl', category: 'cute' },

        // ── ⑨ 構圖特殊系 Camera ──
        { label: '俯視仰望鏡頭', en: 'Looking Up at Camera', value: 'looking up at viewer, from below, low angle looking up', category: 'camera' },
        { label: '仰視低角度', en: 'Low Angle View', value: 'low angle shot, from below, dramatic low perspective', category: 'camera' },
        { label: '近距離臉貼鏡頭', en: 'Close-Up Face', value: 'extreme close-up, face close to camera, leaning toward viewer', category: 'camera' },
        { label: '背影遠景', en: 'Back View Distance', value: 'back view, distant figure, rear silhouette, from behind far away', category: 'camera' },
        { label: '半身特寫', en: 'Upper Body Shot', value: 'upper body, portrait shot, waist up, half body', category: 'camera' },
        { label: '45度側身構圖', en: '45-Degree Angle', value: 'three-quarter view, 45 degree angle, angled portrait', category: 'camera' }
    ];

    // ── 重心位置（3 選 1）──
    const GRAVITY = [
        { id: 'forward', label: '⬆️ 前傾', en: 'Forward Lean', value: 'leaning forward, forward posture' },
        { id: 'neutral', label: '⚖️ 中立', en: 'Neutral', value: '' },
        { id: 'backward', label: '⬇️ 後仰', en: 'Backward Lean', value: 'leaning back, backward lean posture' }
    ];

    // ── 視線方向（4 選 1）──
    const GAZE = [
        { id: 'direct', label: '👁️ 正視', en: 'Direct Gaze', value: 'looking at viewer, direct eye contact' },
        { id: 'side', label: '👀 斜視', en: 'Side Glance', value: 'looking to the side, side glance, averted gaze' },
        { id: 'down', label: '⬇️ 低頭', en: 'Looking Down', value: 'looking down, downcast eyes, head lowered' },
        { id: 'up', label: '⬆️ 仰望', en: 'Looking Up', value: 'looking up, upward gaze, gazing skyward' }
    ];

    return {
        TABS,
        POSES,
        GRAVITY,
        GAZE
    };
})();
