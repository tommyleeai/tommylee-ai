// ============================================
// AI Prompt Generator — Pose Magic 資料
// 9 大分類 + 重心位置 + 視線方向
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.PoseMagicData = (function () {

    // ── 姿勢分類 Tab 定義 ──
    const TABS = [
        { id: 'standing', icon: '🧍', label: '站姿系', en: 'Standing' },
        { id: 'sitting', icon: '🪑', label: '坐姿系', en: 'Sitting' },
        { id: 'movement', icon: '🏃', label: '行動系', en: 'Movement' },
        { id: 'combat', icon: '⚔️', label: '戰鬥系', en: 'Combat' },
        { id: 'interact', icon: '🤝', label: '互動系', en: 'Interaction' },
        { id: 'emotional', icon: '💔', label: '情緒演出系', en: 'Emotional' },
        { id: 'dominant', icon: '👑', label: '王者氣場系', en: 'Dominant' },
        { id: 'cute', icon: '🌸', label: '可愛Q版系', en: 'Cute' },
        { id: 'camera', icon: '📷', label: '構圖特殊系', en: 'Camera' }
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
        { label: '45度側身構圖', en: '45-Degree Angle', value: 'three-quarter view, 45 degree angle, angled portrait', category: 'camera' },

        // ══ 新增姿勢 200 項 ══

        // ── ① 站姿系擴充 Standing ──
        { label: '倚靠牆壁', en: 'Leaning on Wall', value: 'leaning against wall, shoulder on wall, casual lean', category: 'standing' },
        { label: '背靠柱子', en: 'Pillar Lean', value: 'leaning back on pillar, arms crossed, cool stance', category: 'standing' },
        { label: '單腳靠牆', en: 'Foot on Wall', value: 'one foot on wall, standing with foot against wall', category: 'standing' },
        { label: '雙手伸展', en: 'Arms Spread', value: 'arms spread wide, open arms, welcoming gesture', category: 'standing' },
        { label: '回頭看', en: 'Looking Back', value: 'looking over shoulder, turning to look back, glance behind', category: 'standing' },
        { label: '伸懶腰', en: 'Stretching', value: 'stretching arms above head, yawning stretch, morning stretch', category: 'standing' },
        { label: '墊腳尖', en: 'Tiptoeing', value: 'standing on tiptoes, reaching up, on tip of toes', category: 'standing' },
        { label: '手扶帽子', en: 'Holding Hat', value: 'hand on hat, adjusting hat, wind blowing hat', category: 'standing' },
        { label: '撐傘站立', en: 'Holding Umbrella', value: 'holding umbrella, standing in rain, umbrella pose', category: 'standing' },
        { label: '對鏡自拍', en: 'Mirror Selfie', value: 'mirror selfie pose, phone in hand, reflected image', category: 'standing' },
        { label: '模特兒走台步', en: 'Catwalk', value: 'catwalk pose, model walk, runway stride, fashion pose', category: 'standing' },
        { label: '站在風中', en: 'Standing in Wind', value: 'standing in wind, hair blowing, clothes fluttering', category: 'standing' },
        { label: '雙手抱物', en: 'Holding Object', value: 'holding large object, cradling, both arms carrying', category: 'standing' },
        { label: '彎腰撿物', en: 'Bending Down', value: 'bending down, picking up something, leaning forward', category: 'standing' },
        { label: '扭腰回望', en: 'Twisting Look Back', value: 'twisting torso, looking back over hip, dynamic twist', category: 'standing' },
        { label: '斜靠欄杆', en: 'Leaning on Railing', value: 'leaning on railing, casual rail lean, overlooking view', category: 'standing' },
        { label: '挺胸昂首', en: 'Chest Out', value: 'chest out, head held high, proud posture', category: 'standing' },
        { label: '弓箭步', en: 'Lunge Stance', value: 'lunge stance, forward lunge, one knee bent', category: 'standing' },
        { label: '交叉站立', en: 'Crossed Legs Stand', value: 'standing with crossed legs, ankles crossed, casual cross', category: 'standing' },
        { label: '手持相框', en: 'Frame Pose', value: 'hands making frame, framing face, photographer gesture', category: 'standing' },
        { label: '手舉過頭', en: 'Arms Overhead', value: 'both arms raised high, reaching skyward, hands above head', category: 'standing' },
        { label: '勝利姿勢', en: 'Victory Pose', value: 'victory pose, arms in V shape, triumphant stance', category: 'standing' },
        { label: '雙手捧物獻上', en: 'Offering', value: 'both hands presenting, offering pose, palms up holding', category: 'standing' },

        // ── ② 坐姿系擴充 Sitting ──
        { label: '正座', en: 'Seiza', value: 'seiza, kneeling sit, japanese formal sitting', category: 'sitting' },
        { label: '雙腿伸直坐', en: 'Legs Extended Sit', value: 'sitting with legs extended, straight legs, relaxed floor sit', category: 'sitting' },
        { label: '抱枕而坐', en: 'Hugging Pillow', value: 'sitting hugging pillow, clutching cushion, cozy seated', category: 'sitting' },
        { label: '窗邊坐', en: 'Window Seat', value: 'sitting by window, window seat, gazing outside, sunlight', category: 'sitting' },
        { label: '鞦韆上坐', en: 'Swing Sitting', value: 'sitting on swing, playground swing, gently swinging', category: 'sitting' },
        { label: '台階上坐', en: 'Sitting on Stairs', value: 'sitting on stairs, staircase seated, steps sitting', category: 'sitting' },
        { label: '趴在桌上', en: 'Desk Slump', value: 'head on desk, slumped on table, tired at desk', category: 'sitting' },
        { label: '倒騎椅子', en: 'Reverse Chair Sit', value: 'sitting backwards on chair, arms on chair back, reversed', category: 'sitting' },
        { label: '蹲坐', en: 'Squatting', value: 'squatting, low squat, crouching sit', category: 'sitting' },
        { label: '側臥', en: 'Side Lying', value: 'lying on side, side recline, propped on elbow', category: 'sitting' },
        { label: '仰躺', en: 'Lying on Back', value: 'lying on back, supine, looking up at sky', category: 'sitting' },
        { label: '趴著', en: 'Lying Face Down', value: 'lying face down, prone position, on stomach', category: 'sitting' },
        { label: '吊腳坐', en: 'Dangling Feet', value: 'dangling feet, legs hanging, sitting on high place', category: 'sitting' },
        { label: '抱膝望天', en: 'Knees Up Gazing', value: 'hugging knees looking up, seated gazing at sky', category: 'sitting' },
        { label: '一腳盤一腳垂', en: 'Half Cross Sit', value: 'one leg crossed, other leg hanging, relaxed seated mix', category: 'sitting' },
        { label: '躺在草地', en: 'Lying on Grass', value: 'lying on grass, outdoor relaxation, meadow rest', category: 'sitting' },
        { label: '靠在某人肩上', en: 'Leaning on Shoulder', value: 'leaning on shoulder, resting head on shoulder, cozy lean', category: 'sitting' },
        { label: '樹下坐', en: 'Under Tree Sit', value: 'sitting under tree, tree shade, back against trunk', category: 'sitting' },
        { label: '浮在水面', en: 'Floating on Water', value: 'floating on water surface, back float, aquatic relaxation', category: 'sitting' },
        { label: '半躺沙發', en: 'Sofa Recline', value: 'reclining on sofa, half lying on couch, lounging', category: 'sitting' },
        { label: '打盹', en: 'Dozing Off', value: 'dozing off, nodding off, about to fall asleep sitting', category: 'sitting' },
        { label: '雙手撐地', en: 'Hands on Ground', value: 'both hands on ground, seated support, palms on floor', category: 'sitting' },

        // ── ③ 行動系擴充 Movement ──
        { label: '滑行', en: 'Sliding', value: 'sliding, gliding on surface, ice skating motion', category: 'movement' },
        { label: '蹦跳', en: 'Bouncing', value: 'bouncing, hopping, playful bounce, spring jump', category: 'movement' },
        { label: '旋轉', en: 'Spinning', value: 'spinning around, pirouette, rotation, turning rapidly', category: 'movement' },
        { label: '側翻', en: 'Cartwheel', value: 'cartwheel, side flip, gymnastic roll', category: 'movement' },
        { label: '後空翻', en: 'Backflip', value: 'backflip, backward somersault, aerial back flip', category: 'movement' },
        { label: '攀爬', en: 'Climbing', value: 'climbing, scaling wall, rock climbing, ascending', category: 'movement' },
        { label: '游泳', en: 'Swimming', value: 'swimming, freestyle stroke, in water, underwater movement', category: 'movement' },
        { label: '飛行', en: 'Flying', value: 'flying, soaring through air, mid-flight, superhero flying', category: 'movement' },
        { label: '滑板', en: 'Skateboarding', value: 'skateboarding, on skateboard, kickflip, grinding', category: 'movement' },
        { label: '騎自行車', en: 'Cycling', value: 'riding bicycle, cycling, pedaling, bike riding', category: 'movement' },
        { label: '倒退走', en: 'Walking Backwards', value: 'walking backwards, reverse walk, looking forward while moving back', category: 'movement' },
        { label: '踢腿', en: 'High Kick', value: 'high kick, leg raised, martial arts kick', category: 'movement' },
        { label: '翻滾落地', en: 'Combat Roll', value: 'combat roll, tactical roll, rolling on ground', category: 'movement' },
        { label: '墜落', en: 'Falling', value: 'falling, plummeting, gravity pull, descending rapidly', category: 'movement' },
        { label: '衝刺滑停', en: 'Slide Stop', value: 'sliding to stop, skid halt, sudden brake, dust cloud', category: 'movement' },
        { label: '空中懸浮', en: 'Hovering', value: 'hovering in air, floating, suspended, levitation', category: 'movement' },
        { label: '單手撐跳', en: 'Vault Jump', value: 'vaulting over obstacle, parkour vault, one hand jump', category: 'movement' },
        { label: '快速閃避', en: 'Quick Dodge', value: 'dodging, quick evasion, side step dodge, matrix dodge', category: 'movement' },
        { label: '飄浮跳舞', en: 'Float Dancing', value: 'dancing while floating, aerial dance, gravity-defying movement', category: 'movement' },
        { label: '用力著地', en: 'Hard Landing', value: 'superhero landing, one knee down, fist on ground, impact landing', category: 'movement' },
        { label: '迴旋踢', en: 'Spinning Kick', value: 'spinning kick, roundhouse kick, whirlwind kick', category: 'movement' },
        { label: '衝浪', en: 'Surfing', value: 'surfing, riding wave, surfboard balance, ocean wave', category: 'movement' },
        { label: '跳傘', en: 'Skydiving', value: 'skydiving, free fall, parachute, arms spread in sky', category: 'movement' },

        // ── ④ 戰鬥系擴充 Combat ──
        { label: '雙刀交叉', en: 'Dual Blade Cross', value: 'dual wielding swords crossed, twin blade defense, X guard', category: 'combat' },
        { label: '拔刀瞬間', en: 'Quick Draw', value: 'drawing sword, iai slash, quick draw stance, hand on hilt', category: 'combat' },
        { label: '蓄力衝拳', en: 'Power Punch', value: 'charging punch, powered fist, devastating blow, wind up punch', category: 'combat' },
        { label: '迴旋斬', en: 'Spinning Slash', value: 'spinning slash, whirlwind sword attack, 360 degree cut', category: 'combat' },
        { label: '魔法陣施放', en: 'Magic Circle Cast', value: 'magic circle beneath, arcane circle, summoning magic', category: 'combat' },
        { label: '持盾防禦', en: 'Shield Block', value: 'shield blocking, raised shield, defensive shield position', category: 'combat' },
        { label: '雙手巨劍', en: 'Great Sword Hold', value: 'holding great sword, two-handed sword, massive blade, overhead', category: 'combat' },
        { label: '槍兵突刺', en: 'Spear Thrust', value: 'spear thrust, lance pierce, polearm attack, forward lunge', category: 'combat' },
        { label: '空中斬擊', en: 'Aerial Strike', value: 'aerial sword strike, jumping attack, diving slash', category: 'combat' },
        { label: '武術起手式', en: 'Martial Stance', value: 'martial arts stance, kung fu pose, fighting ready position', category: 'combat' },
        { label: '拳打連擊', en: 'Combo Punch', value: 'rapid punches, combo attack, flurry of fists', category: 'combat' },
        { label: '投擲手榴彈', en: 'Throwing Grenade', value: 'throwing grenade, overhead toss, explosive throw', category: 'combat' },
        { label: '狙擊瞄準', en: 'Sniper Aim', value: 'sniping, aiming through scope, prone shooting position', category: 'combat' },
        { label: '近身纏鬥', en: 'Close Quarter', value: 'close combat, grappling, hand-to-hand fight', category: 'combat' },
        { label: '背刺暗殺', en: 'Backstab', value: 'backstab, assassination from behind, stealth kill', category: 'combat' },
        { label: '能量蓄積', en: 'Energy Charge', value: 'charging energy, aura building, power up, glowing body', category: 'combat' },
        { label: '太刀居合斬', en: 'Iaijutsu', value: 'iaijutsu stance, katana draw cut, sheathed sword ready', category: 'combat' },
        { label: '氣功波', en: 'Ki Blast', value: 'ki blast, energy ball launch, kamehameha pose, beam attack', category: 'combat' },
        { label: '瞬間移動', en: 'Teleport', value: 'teleporting, flash step, instant movement, afterimage', category: 'combat' },
        { label: '雙手砲射擊', en: 'Dual Gun Fire', value: 'dual pistols firing, akimbo shooting, two-gun action', category: 'combat' },
        { label: '格擋反擊', en: 'Counter Strike', value: 'parry and counter, deflect and attack, riposte', category: 'combat' },
        { label: '空中多段踢', en: 'Aerial Combo Kick', value: 'aerial kick combo, multiple kicks mid-air, flying kicks', category: 'combat' },
        { label: '召喚術', en: 'Summoning', value: 'summoning creature, magic summoning circle, calling forth beast', category: 'combat' },

        // ── ⑤ 互動系擴充 Interaction ──
        { label: '敬禮', en: 'Salute', value: 'military salute, hand to forehead, formal salute', category: 'interact' },
        { label: '鞠躬', en: 'Bowing', value: 'bowing, formal bow, respectful bow, greeting bow', category: 'interact' },
        { label: '擁抱', en: 'Hugging', value: 'hugging, embrace, warm hug, holding someone', category: 'interact' },
        { label: '牽手', en: 'Holding Hands', value: 'holding hands, hand in hand, interlocked fingers', category: 'interact' },
        { label: '拍肩', en: 'Pat on Shoulder', value: 'patting shoulder, hand on shoulder, comforting touch', category: 'interact' },
        { label: '高舉手臂歡呼', en: 'Cheering Arms Up', value: 'cheering with arms up, celebrating, triumphant raise', category: 'interact' },
        { label: '扶額', en: 'Facepalm', value: 'facepalm, hand on forehead, exasperated gesture', category: 'interact' },
        { label: '摸頭', en: 'Head Pat', value: 'patting head, gentle head rub, affectionate touch', category: 'interact' },
        { label: '撥頭髮', en: 'Hair Flip', value: 'flipping hair, hair toss, brushing hair from face', category: 'interact' },
        { label: '伸手觸碰', en: 'Reaching Out', value: 'reaching out hand, extending arm, trying to touch', category: 'interact' },
        { label: '豎大拇指', en: 'Thumbs Up', value: 'thumbs up, approval gesture, good job sign', category: 'interact' },
        { label: '擺V字手勢', en: 'Peace Sign', value: 'peace sign, V sign, two fingers up, photo pose', category: 'interact' },
        { label: '手放耳邊', en: 'Ear Cup', value: 'hand cupping ear, listening gesture, eavesdropping', category: 'interact' },
        { label: '掩嘴偷笑', en: 'Hand Over Mouth', value: 'hand over mouth, suppressed laugh, covering giggle', category: 'interact' },
        { label: '搖手指', en: 'Finger Wag', value: 'wagging finger, scolding gesture, tsk tsk motion', category: 'interact' },
        { label: '擦汗', en: 'Wiping Sweat', value: 'wiping sweat from brow, relieved gesture, phew motion', category: 'interact' },
        { label: '雙手遞東西', en: 'Handing Over', value: 'handing object, giving with both hands, presenting item', category: 'interact' },
        { label: '摀眼偷看', en: 'Peeking Through Fingers', value: 'peeking through fingers, covering eyes partially, shy peek', category: 'interact' },
        { label: '彈手指', en: 'Finger Snap', value: 'snapping fingers, finger click, snap gesture', category: 'interact' },
        { label: '手勢比心', en: 'Finger Heart', value: 'korean finger heart, thumb and index finger heart, cute gesture', category: 'interact' },
        { label: '做鬼臉', en: 'Making Faces', value: 'making funny face, tongue out, silly expression with hands', category: 'interact' },
        { label: '舉杯敬酒', en: 'Toast', value: 'raising glass, toast gesture, cheers pose', category: 'interact' },
        { label: '自拍姿勢', en: 'Selfie Pose', value: 'selfie pose, phone held up, duck lips, camera angle', category: 'interact' },

        // ── ⑥ 情緒演出系擴充 Emotional ──
        { label: '雙手遮臉', en: 'Face Cover', value: 'both hands covering face, hiding face, face buried in hands', category: 'emotional' },
        { label: '仰望流淚', en: 'Crying Looking Up', value: 'looking up while crying, tears falling, upward gaze tears', category: 'emotional' },
        { label: '捶地', en: 'Pounding Ground', value: 'fist hitting ground, pounding floor in frustration, floor slam', category: 'emotional' },
        { label: '蜷縮牆角', en: 'Curled in Corner', value: 'curled up in corner, hiding in corner, fetal position corner', category: 'emotional' },
        { label: '張開雙臂擁抱天空', en: 'Arms Open to Sky', value: 'arms wide open, embracing sky, freedom pose, liberating', category: 'emotional' },
        { label: '默默轉身', en: 'Silent Turn Away', value: 'silently turning away, back to viewer, walking away from', category: 'emotional' },
        { label: '手握胸口', en: 'Hand on Chest', value: 'hand on chest, clutching heart, emotional chest grab', category: 'emotional' },
        { label: '跪地祈禱', en: 'Kneeling Prayer', value: 'kneeling in prayer, devout kneeling, begging on knees', category: 'emotional' },
        { label: '雙手伸向天', en: 'Reaching for Sky', value: 'both hands reaching up, desperate reach, grasping at nothing', category: 'emotional' },
        { label: '對著照片發呆', en: 'Staring at Photo', value: 'staring at photograph, lost in memories, holding picture', category: 'emotional' },
        { label: '頹然靠坐', en: 'Slumped Sitting', value: 'slumped against wall, exhausted sitting, defeated slouch', category: 'emotional' },
        { label: '狂奔逃離', en: 'Running Away', value: 'running away, fleeing, desperate escape, looking back scared', category: 'emotional' },
        { label: '咬唇忍淚', en: 'Biting Lip Tears', value: 'biting lip holding tears, trying not to cry, trembling', category: 'emotional' },
        { label: '無力跪坐', en: 'Weak Kneeling', value: 'weakly kneeling, no strength, drained on knees', category: 'emotional' },
        { label: '發呆凝視', en: 'Blank Stare', value: 'blank stare, zoning out, lost in thought, unfocused', category: 'emotional' },
        { label: '對鏡自視', en: 'Mirror Self-Gaze', value: 'looking at self in mirror, self-reflection, mirror contemplation', category: 'emotional' },
        { label: '微笑流淚', en: 'Smiling Through Tears', value: 'smiling while crying, bittersweet expression, tears with smile', category: 'emotional' },
        { label: '顫抖縮肩', en: 'Trembling Shiver', value: 'trembling, shivering, shoulders shaking, fearful quiver', category: 'emotional' },
        { label: '託付重物', en: 'Entrusting', value: 'entrusting precious item, handing over something important, final gift', category: 'emotional' },

        // ── ⑦ 王者氣場系擴充 Dominant ──
        { label: '指尖輕抬下巴', en: 'Chin Lift', value: 'finger lifting chin, tilting chin up, dominant gesture', category: 'dominant' },
        { label: '手指緊扣白手套', en: 'Glove Adjust', value: 'adjusting white gloves, pulling glove tight, noble preparation', category: 'dominant' },
        { label: '單手撐桌', en: 'Desk Lean', value: 'one hand on desk, leaning forward over table, commanding lean', category: 'dominant' },
        { label: '紅酒晃杯', en: 'Swirling Wine', value: 'swirling wine glass, elegant wine holding, sophisticated', category: 'dominant' },
        { label: '背手巡視', en: 'Hands Behind Back Walk', value: 'walking with hands behind back, inspecting, surveying', category: 'dominant' },
        { label: '雙手交叉坐', en: 'Boss Sitting', value: 'sitting with crossed arms, CEO pose, authoritative seated', category: 'dominant' },
        { label: '抬頭不理', en: 'Looking Away Disdain', value: 'looking away in disdain, chin up dismissive, cold ignore', category: 'dominant' },
        { label: '單指下令', en: 'Command Point', value: 'pointing down commanding, ordering gesture, imperial command', category: 'dominant' },
        { label: '倚劍而立', en: 'Sword Rest', value: 'leaning on sword, sword planted in ground, warrior rest', category: 'dominant' },
        { label: '握拳舉過頭', en: 'Raised Fist', value: 'fist raised overhead, power fist, rally gesture, revolution', category: 'dominant' },
        { label: '踩踏戰利品', en: 'Standing on Trophy', value: 'foot on defeated enemy, standing on prey, victor pose', category: 'dominant' },
        { label: '張開黑翼', en: 'Dark Wings Spread', value: 'dark wings spread wide, demonic wings open, fallen angel pose', category: 'dominant' },
        { label: '俯瞰城市', en: 'Overlooking City', value: 'overlooking city, standing on rooftop edge, city below', category: 'dominant' },
        { label: '簽署文件', en: 'Signing Document', value: 'signing document, pen in hand, authorizing, official act', category: 'dominant' },
        { label: '優雅坐姿品茶', en: 'Elegant Tea', value: 'elegantly sipping tea, pinky out, refined seated pose', category: 'dominant' },
        { label: '翻牌亮出', en: 'Card Reveal', value: 'revealing card, showing hand, trump card display', category: 'dominant' },
        { label: '冷笑斜靠', en: 'Smirk Lean', value: 'smirking while leaning, cold smile, condescending lean', category: 'dominant' },
        { label: '操控傀儡', en: 'Puppet Master', value: 'puppet master pose, controlling strings, manipulator stance', category: 'dominant' },
        { label: '帝王端坐', en: 'Imperial Sit', value: 'imperial seated pose, emperor posture, absolute ruler', category: 'dominant' },

        // ── ⑧ 可愛Q版系擴充 Cute ──
        { label: '捧臉', en: 'Cheek Hold', value: 'both hands on cheeks, squishing own face, cute cheek squeeze', category: 'cute' },
        { label: '伸舌吐舌', en: 'Tongue Out', value: 'sticking tongue out, playful tongue, teasing expression', category: 'cute' },
        { label: '雙手舉起萬歲', en: 'Banzai', value: 'banzai pose, both arms up, celebration, hooray pose', category: 'cute' },
        { label: '蹲下看花', en: 'Crouching at Flower', value: 'crouching to look at flower, curious crouch, nature wonder', category: 'cute' },
        { label: '踮腳親吻', en: 'Tippy Toe Kiss', value: 'standing on tip toes, reaching up, almost kissing height', category: 'cute' },
        { label: '充氣鼓腮', en: 'Puffed Cheeks', value: 'puffed cheeks, inflated cheeks, cute pouting face', category: 'cute' },
        { label: '抱玩偶', en: 'Hugging Plush', value: 'hugging stuffed animal, clutching plush toy, teddy bear hug', category: 'cute' },
        { label: '雙手比YA', en: 'Double Peace', value: 'double peace sign, both hands V sign, happy photo pose', category: 'cute' },
        { label: '歪頭張嘴', en: 'Cute Gasp', value: 'head tilt with open mouth, cute surprised, mini gasp', category: 'cute' },
        { label: '蹦蹦跳跳', en: 'Skip Along', value: 'skipping, happy skipping, bouncy walk, cheerful movement', category: 'cute' },
        { label: '扭來扭去', en: 'Wiggling', value: 'wiggling, squirming cutely, shy shifting, body sway', category: 'cute' },
        { label: '撒嬌搖晃', en: 'Clingy Sway', value: 'clinging and swaying, begging gesture, adorable pleading', category: 'cute' },
        { label: '趴地打滾', en: 'Floor Rolling', value: 'rolling on floor, cute floor roll, tantrum roll', category: 'cute' },
        { label: '雙手做貓爪', en: 'Cat Paw Hands', value: 'cat paw gesture, neko pose, hands like cat paws', category: 'cute' },
        { label: '躲在角落偷看', en: 'Peeking from Corner', value: 'peeking around corner, hiding behind wall, shy peek out', category: 'cute' },
        { label: '抱著花跑', en: 'Running with Flowers', value: 'running while holding flowers, happy sprint with bouquet', category: 'cute' },
        { label: '單手托臉發呆', en: 'Daydream Chin Rest', value: 'chin in hand, daydreaming, cute spacing out, lost in thought', category: 'cute' },
        { label: '飛撲', en: 'Tackle Hug', value: 'tackle hug, flying embrace, jumping into arms', category: 'cute' },
        { label: '食指點唇', en: 'Finger on Lips', value: 'index finger on lips, thinking cute, shh gesture', category: 'cute' },

        // ── ⑨ 構圖特殊系擴充 Camera ──
        { label: '全身遠景', en: 'Full Body Wide', value: 'full body shot, wide angle, entire figure visible', category: 'camera' },
        { label: '荷蘭角', en: 'Dutch Angle', value: 'dutch angle, tilted camera, canted angle, diagonal frame', category: 'camera' },
        { label: '鳥瞰俯拍', en: 'Birds Eye View', value: 'birds eye view, directly above, top down shot', category: 'camera' },
        { label: '魚眼廣角', en: 'Fisheye Lens', value: 'fisheye lens, ultra wide angle, barrel distortion', category: 'camera' },
        { label: '框中框構圖', en: 'Frame within Frame', value: 'frame within frame, doorway framing, window framing subject', category: 'camera' },
        { label: '前景模糊', en: 'Foreground Blur', value: 'foreground bokeh, blurred foreground, depth of field, subject in focus behind', category: 'camera' },
        { label: '分割構圖', en: 'Split Composition', value: 'split screen, divided composition, two halves, contrast', category: 'camera' },
        { label: '膝上特寫', en: 'Cowboy Shot', value: 'cowboy shot, from knees up, medium shot, western framing', category: 'camera' },
        { label: '人物置左', en: 'Subject Left', value: 'subject on left side, rule of thirds left, offset composition', category: 'camera' },
        { label: '地面低拍', en: 'Ground Shot', value: 'ground level shot, worms eye view, very low angle, from below', category: 'camera' },
        { label: '窥視構圖', en: 'Hidden Observer', value: 'hidden observer perspective, looking through doorway, candid angle', category: 'camera' },
        { label: '倒影構圖', en: 'Reflection Shot', value: 'reflection composition, mirror reflection, water reflection, symmetrical', category: 'camera' },
        { label: '背後跟拍', en: 'Follow Behind', value: 'following from behind, tracking shot, walking away from camera', category: 'camera' },
        { label: '正面逆光', en: 'Backlit Front', value: 'backlit silhouette, rim light, dramatic backlighting, halo effect', category: 'camera' },
        { label: '淺景深半身', en: 'Shallow DOF Portrait', value: 'shallow depth of field, blurred background, bokeh portrait, f1.4', category: 'camera' },
        { label: '對稱構圖', en: 'Symmetrical', value: 'symmetrical composition, centered subject, mirror symmetry', category: 'camera' },
        { label: '窗框光影', en: 'Window Light', value: 'window light framing, light through window, dramatic window shadow', category: 'camera' },
        { label: '螺旋構圖', en: 'Spiral Composition', value: 'golden spiral composition, fibonacci framing, dynamic spiral', category: 'camera' },
        { label: '多重曝光', en: 'Double Exposure', value: 'double exposure, multiple exposure, overlapping images, ghost effect', category: 'camera' }
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
