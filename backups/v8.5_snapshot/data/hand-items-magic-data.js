// ============================================
// AI Prompt Generator — Hand Items Magic 資料
// 手持物件九大分類 + 加分特徵
// 掛載至 window.PromptGen.HandItemsMagicData
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.HandItemsMagicData = (function () {

    // ── 分類 Tab 定義 ──
    const CATEGORIES = [
        { id: 'all', icon: '🌐', label: '全部', en: 'All' },
        { id: 'recent', icon: '📋', label: '最近', en: 'Recent' },
        { id: 'hot', icon: '🔥', label: '熱門', en: 'Hot' },
        { id: 'ring', icon: '💍', label: '戒指', en: 'Rings' },
        { id: 'bracelet', icon: '📿', label: '手環手鍊', en: 'Bracelets' },
        { id: 'glove', icon: '🧤', label: '手套', en: 'Gloves' },
        { id: 'weapon', icon: '⚔️', label: '武器持握', en: 'Weapons' },
        { id: 'tool', icon: '📚', label: '工具職業', en: 'Tools' },
        { id: 'tech', icon: '🔧', label: '科技裝置', en: 'Tech' },
        { id: 'magic', icon: '🔮', label: '魔法媒介', en: 'Magic' },
        { id: 'guard', icon: '🛡️', label: '束縛防護', en: 'Guard' },
        { id: 'concept', icon: '✨', label: '概念象徵', en: 'Concept' }
    ];

    // ── 所有手持物件 Chip 項目（200 件）──
    const ITEMS = [
        // ══════════════════════════════════
        // ── ① 戒指 ring（22 件）──
        // ══════════════════════════════════
        { id: 'simple_ring', name: '素戒', en: 'Simple Ring', icon: '💍', cat: 'ring', value: 'simple ring, plain ring on finger' },
        { id: 'diamond_ring', name: '鑽石戒指', en: 'Diamond Ring', icon: '💎', cat: 'ring', value: 'diamond ring, sparkling diamond on finger' },
        { id: 'gold_ring', name: '金戒指', en: 'Gold Ring', icon: '🥇', cat: 'ring', value: 'gold ring, golden band on finger' },
        { id: 'silver_ring', name: '銀戒指', en: 'Silver Ring', icon: '⚪', cat: 'ring', value: 'silver ring, silver band on finger' },
        { id: 'gemstone_ring', name: '寶石戒指', en: 'Gemstone Ring', icon: '💎', cat: 'ring', value: 'gemstone ring, jeweled ring, precious stone ring' },
        { id: 'signet_ring', name: '印章戒指', en: 'Signet Ring', icon: '🔖', cat: 'ring', value: 'signet ring, seal ring, noble crest ring' },
        { id: 'wedding_ring', name: '婚戒', en: 'Wedding Ring', icon: '💒', cat: 'ring', value: 'wedding ring, wedding band, marriage ring' },
        { id: 'engagement_ring', name: '訂婚戒指', en: 'Engagement Ring', icon: '💍', cat: 'ring', value: 'engagement ring, solitaire ring' },
        { id: 'magic_ring', name: '魔法戒指', en: 'Magic Ring', icon: '🔮', cat: 'ring', value: 'magic ring, enchanted ring, glowing ring, mystical ring' },
        { id: 'energy_ring', name: '能量戒指', en: 'Energy Ring', icon: '⚡', cat: 'ring', value: 'energy ring, power ring, glowing energy band' },
        { id: 'skull_ring', name: '骷髏戒指', en: 'Skull Ring', icon: '💀', cat: 'ring', value: 'skull ring, gothic ring, dark ring' },
        { id: 'multi_ring', name: '多指戒', en: 'Multi-finger Ring', icon: '🖐️', cat: 'ring', value: 'multi-finger ring, connected rings on multiple fingers' },
        { id: 'knuckle_ring', name: '指節戒', en: 'Knuckle Ring', icon: '✊', cat: 'ring', value: 'knuckle ring, midi ring, mid-finger ring' },
        { id: 'claw_ring', name: '爪戒', en: 'Claw Ring', icon: '🐲', cat: 'ring', value: 'claw ring, dragon claw ring, talon ring' },
        { id: 'poison_ring', name: '毒戒', en: 'Poison Ring', icon: '☠️', cat: 'ring', value: 'poison ring, hidden compartment ring, secret ring' },
        { id: 'mood_ring', name: '變色戒', en: 'Mood Ring', icon: '🌈', cat: 'ring', value: 'mood ring, color-changing ring' },
        { id: 'rose_gold_ring', name: '玫瑰金戒', en: 'Rose Gold Ring', icon: '🌹', cat: 'ring', value: 'rose gold ring, pink gold ring' },
        { id: 'spinner_ring', name: '轉動戒指', en: 'Spinner Ring', icon: '🔄', cat: 'ring', value: 'spinner ring, fidget ring, rotating ring' },
        { id: 'crown_ring', name: '王冠戒指', en: 'Crown Ring', icon: '👑', cat: 'ring', value: 'crown ring, tiara ring, royal ring' },
        { id: 'snake_ring', name: '蛇形戒指', en: 'Snake Ring', icon: '🐍', cat: 'ring', value: 'snake ring, serpent ring, coiled snake ring' },
        { id: 'rune_ring', name: '符文戒指', en: 'Rune Ring', icon: '🔣', cat: 'ring', value: 'rune ring, runic band, inscribed ring, magic runes' },
        { id: 'ring_armor', name: '指套式戒環', en: 'Ring Armor', icon: '🛡️', cat: 'ring', value: 'finger armor ring, full finger ring, armored ring' },

        // ══════════════════════════════════
        // ── ② 手環手鍊 bracelet（22 件）──
        // ══════════════════════════════════
        { id: 'metal_bracelet', name: '金屬手環', en: 'Metal Bracelet', icon: '⚙️', cat: 'bracelet', value: 'metal bracelet, metallic bangle' },
        { id: 'leather_bracelet', name: '皮革手環', en: 'Leather Bracelet', icon: '🟤', cat: 'bracelet', value: 'leather bracelet, leather wristband' },
        { id: 'gem_bangle', name: '寶石手鐲', en: 'Gem Bangle', icon: '💎', cat: 'bracelet', value: 'gemstone bangle, jeweled bracelet' },
        { id: 'chain_bracelet', name: '鎖鏈手鍊', en: 'Chain Bracelet', icon: '🔗', cat: 'bracelet', value: 'chain bracelet, chain link bracelet' },
        { id: 'energy_bracelet', name: '能量手環', en: 'Energy Bracelet', icon: '⚡', cat: 'bracelet', value: 'energy bracelet, glowing wristband, power bracelet' },
        { id: 'monitor_bracelet', name: '監測手環', en: 'Monitor Bracelet', icon: '📊', cat: 'bracelet', value: 'health monitor bracelet, fitness tracker wristband' },
        { id: 'seal_bangle', name: '魔法封印手鐲', en: 'Seal Bangle', icon: '🔮', cat: 'bracelet', value: 'magic seal bangle, cursed bracelet, sealed power bangle' },
        { id: 'charm_bracelet', name: '吊飾手鍊', en: 'Charm Bracelet', icon: '🎀', cat: 'bracelet', value: 'charm bracelet, dangling charms bracelet' },
        { id: 'beaded_bracelet', name: '串珠手鍊', en: 'Beaded Bracelet', icon: '📿', cat: 'bracelet', value: 'beaded bracelet, prayer beads bracelet' },
        { id: 'cuff_bracelet', name: '寬版手環', en: 'Cuff Bracelet', icon: '⭕', cat: 'bracelet', value: 'cuff bracelet, wide bangle, statement bracelet' },
        { id: 'friendship_bracelet', name: '友誼手環', en: 'Friendship Bracelet', icon: '🤝', cat: 'bracelet', value: 'friendship bracelet, braided bracelet, woven band' },
        { id: 'gold_bangle', name: '金手鐲', en: 'Gold Bangle', icon: '🥇', cat: 'bracelet', value: 'gold bangle, golden bracelet' },
        { id: 'silver_bangle', name: '銀手鐲', en: 'Silver Bangle', icon: '⚪', cat: 'bracelet', value: 'silver bangle, silver bracelet' },
        { id: 'hemp_bracelet', name: '麻繩手環', en: 'Hemp Bracelet', icon: '🌿', cat: 'bracelet', value: 'hemp bracelet, natural fiber bracelet' },
        { id: 'rubber_band', name: '橡膠手環', en: 'Rubber Band', icon: '🔴', cat: 'bracelet', value: 'rubber wristband, silicone bracelet' },
        { id: 'bone_bracelet', name: '骨飾手環', en: 'Bone Bracelet', icon: '🦴', cat: 'bracelet', value: 'bone bracelet, tribal bone bangle' },
        { id: 'crystal_bracelet', name: '水晶手鍊', en: 'Crystal Bracelet', icon: '🔮', cat: 'bracelet', value: 'crystal bracelet, quartz bead bracelet' },
        { id: 'id_bracelet', name: '身份手環', en: 'ID Bracelet', icon: '🏷️', cat: 'bracelet', value: 'ID bracelet, medical ID wristband, identification band' },
        { id: 'armlet', name: '臂環', en: 'Armlet', icon: '💪', cat: 'bracelet', value: 'armlet, upper arm band, arm ring' },
        { id: 'prayer_beads', name: '念珠', en: 'Prayer Beads', icon: '📿', cat: 'bracelet', value: 'prayer beads, rosary bracelet, mala beads' },
        { id: 'tech_band', name: '科技手環', en: 'Tech Band', icon: '📡', cat: 'bracelet', value: 'tech wristband, smart bracelet, digital band' },
        { id: 'vine_bracelet', name: '藤蔓手環', en: 'Vine Bracelet', icon: '🌱', cat: 'bracelet', value: 'vine bracelet, living plant bracelet, nature band' },

        // ══════════════════════════════════
        // ── ③ 手套 glove（22 件）──
        // ══════════════════════════════════
        { id: 'half_gloves', name: '半指手套', en: 'Fingerless Gloves', icon: '🤘', cat: 'glove', value: 'fingerless gloves, half-finger gloves' },
        { id: 'full_gloves', name: '全指手套', en: 'Full Gloves', icon: '🧤', cat: 'glove', value: 'gloves, full-finger gloves' },
        { id: 'tactical_gloves', name: '戰術手套', en: 'Tactical Gloves', icon: '🎯', cat: 'glove', value: 'tactical gloves, military gloves, combat gloves' },
        { id: 'long_gloves', name: '長手套', en: 'Long Gloves', icon: '👒', cat: 'glove', value: 'long gloves, elbow-length gloves, opera gloves' },
        { id: 'magic_gloves', name: '魔法手套', en: 'Magic Gloves', icon: '✨', cat: 'glove', value: 'magic gloves, enchanted gloves, glowing gloves' },
        { id: 'mech_arm', name: '機械義手', en: 'Mechanical Arm', icon: '🦾', cat: 'glove', value: 'mechanical arm, prosthetic arm, cybernetic arm, robotic hand' },
        { id: 'power_gloves', name: '動力手套', en: 'Power Gloves', icon: '💪', cat: 'glove', value: 'power gloves, powered gauntlets, exo-gloves' },
        { id: 'boxing_gloves', name: '拳擊手套', en: 'Boxing Gloves', icon: '🥊', cat: 'glove', value: 'boxing gloves, fighting gloves' },
        { id: 'leather_gloves', name: '皮革手套', en: 'Leather Gloves', icon: '🟤', cat: 'glove', value: 'leather gloves, brown leather gloves' },
        { id: 'lace_gloves', name: '蕾絲手套', en: 'Lace Gloves', icon: '🎀', cat: 'glove', value: 'lace gloves, delicate lace gloves, elegant gloves' },
        { id: 'latex_gloves', name: '乳膠手套', en: 'Latex Gloves', icon: '🔬', cat: 'glove', value: 'latex gloves, rubber gloves, medical gloves' },
        { id: 'gauntlets', name: '護手鎧', en: 'Gauntlets', icon: '🛡️', cat: 'glove', value: 'gauntlets, armored gloves, metal gauntlets' },
        { id: 'fur_gloves', name: '毛皮手套', en: 'Fur Gloves', icon: '🐻', cat: 'glove', value: 'fur gloves, furry gloves, winter fur mittens' },
        { id: 'silk_gloves', name: '絲綢手套', en: 'Silk Gloves', icon: '🎭', cat: 'glove', value: 'silk gloves, satin gloves, smooth elegant gloves' },
        { id: 'claw_gauntlets', name: '爪甲手套', en: 'Claw Gauntlets', icon: '🐲', cat: 'glove', value: 'claw gauntlets, clawed gloves, beast claw gloves' },
        { id: 'fire_gloves', name: '火焰手套', en: 'Fire Gloves', icon: '🔥', cat: 'glove', value: 'fire gloves, flaming hands, burning gauntlets' },
        { id: 'ice_gloves', name: '冰霜手套', en: 'Ice Gloves', icon: '❄️', cat: 'glove', value: 'ice gloves, frost gauntlets, frozen hands' },
        { id: 'bandaged_hands', name: '繃帶纏手', en: 'Bandaged Hands', icon: '🩹', cat: 'glove', value: 'bandaged hands, hand wraps, wrapped hands' },
        { id: 'work_gloves', name: '工作手套', en: 'Work Gloves', icon: '🔧', cat: 'glove', value: 'work gloves, heavy duty gloves, industrial gloves' },
        { id: 'archery_glove', name: '射箭護手', en: 'Archery Glove', icon: '🏹', cat: 'glove', value: 'archery glove, archer bracer, bow glove' },
        { id: 'neon_gloves', name: '霓虹手套', en: 'Neon Gloves', icon: '💡', cat: 'glove', value: 'neon gloves, LED gloves, glow-in-dark gloves, cyberpunk gloves' },
        { id: 'shadow_gloves', name: '暗影手套', en: 'Shadow Gloves', icon: '🖤', cat: 'glove', value: 'shadow gloves, dark energy gloves, void gauntlets' },

        // ══════════════════════════════════
        // ── ④ 武器持握 weapon（27 件）──
        // ══════════════════════════════════
        { id: 'longsword', name: '長劍', en: 'Longsword', icon: '⚔️', cat: 'weapon', value: 'holding longsword, one-handed sword' },
        { id: 'katana', name: '武士刀', en: 'Katana', icon: '🗡️', cat: 'weapon', value: 'holding katana, japanese sword, samurai sword' },
        { id: 'dagger', name: '匕首', en: 'Dagger', icon: '🔪', cat: 'weapon', value: 'holding dagger, short blade, combat knife' },
        { id: 'rapier', name: '細劍', en: 'Rapier', icon: '🤺', cat: 'weapon', value: 'holding rapier, fencing sword, thrusting sword' },
        { id: 'shortsword', name: '短劍', en: 'Short Sword', icon: '⚔️', cat: 'weapon', value: 'holding short sword, gladius' },
        { id: 'scimitar', name: '彎刀', en: 'Scimitar', icon: '⚔️', cat: 'weapon', value: 'holding scimitar, curved sword, arabian sword' },
        { id: 'handgun', name: '手槍', en: 'Handgun', icon: '🔫', cat: 'weapon', value: 'holding handgun, pistol, firearm' },
        { id: 'revolver', name: '左輪手槍', en: 'Revolver', icon: '🔫', cat: 'weapon', value: 'holding revolver, western revolver' },
        { id: 'magic_wand', name: '魔杖', en: 'Magic Wand', icon: '🪄', cat: 'weapon', value: 'holding magic wand, wizard wand, enchanted wand' },
        { id: 'staff', name: '法杖', en: 'Staff', icon: '🏑', cat: 'weapon', value: 'holding staff, magic staff, wizard staff' },
        { id: 'energy_blade', name: '能量刃', en: 'Energy Blade', icon: '⚡', cat: 'weapon', value: 'energy blade, laser sword, plasma blade, lightsaber' },
        { id: 'whip', name: '鞭子', en: 'Whip', icon: '🎭', cat: 'weapon', value: 'holding whip, leather whip, coiled whip' },
        { id: 'hand_shield', name: '手持盾牌', en: 'Hand Shield', icon: '🛡️', cat: 'weapon', value: 'holding shield, hand shield, round shield' },
        { id: 'hand_axe', name: '手斧', en: 'Hand Axe', icon: '🪓', cat: 'weapon', value: 'holding hand axe, hatchet, throwing axe' },
        { id: 'kunai', name: '苦無', en: 'Kunai', icon: '📌', cat: 'weapon', value: 'holding kunai, ninja knife, throwing knife' },
        { id: 'shuriken', name: '手裡劍', en: 'Shuriken', icon: '⭐', cat: 'weapon', value: 'holding shuriken, ninja star, throwing star' },
        { id: 'sai', name: '釵', en: 'Sai', icon: '🔱', cat: 'weapon', value: 'holding sai, trident dagger, okinawan weapon' },
        { id: 'flail', name: '連枷', en: 'Flail', icon: '⛓️', cat: 'weapon', value: 'holding flail, morning star, spiked ball chain' },
        { id: 'crossbow_pistol', name: '手弩', en: 'Hand Crossbow', icon: '🏹', cat: 'weapon', value: 'holding hand crossbow, small crossbow, pistol crossbow' },
        { id: 'talisman', name: '符咒', en: 'Talisman', icon: '📜', cat: 'weapon', value: 'holding talisman, paper talisman, ofuda, spiritual tag' },
        { id: 'chain_blade', name: '鎖鏈刃', en: 'Chain Blade', icon: '⛓️', cat: 'weapon', value: 'chain blade, chained weapon, kusarigama' },
        { id: 'dual_blades', name: '雙持短刀', en: 'Dual Blades', icon: '⚔️', cat: 'weapon', value: 'dual wielding, twin blades, two daggers' },
        { id: 'war_fan', name: '戰扇', en: 'War Fan', icon: '🪭', cat: 'weapon', value: 'holding war fan, iron fan, tessen, combat fan' },
        { id: 'arm_cannon', name: '手臂砲', en: 'Arm Cannon', icon: '💥', cat: 'weapon', value: 'arm cannon, arm-mounted weapon, buster arm' },
        { id: 'plasma_pistol', name: '電漿手槍', en: 'Plasma Pistol', icon: '🔫', cat: 'weapon', value: 'plasma pistol, sci-fi handgun, energy pistol' },
        { id: 'chakram', name: '飛輪刃', en: 'Chakram', icon: '⭕', cat: 'weapon', value: 'holding chakram, throwing ring, ring blade' },
        { id: 'scepter', name: '權杖', en: 'Scepter', icon: '🪄', cat: 'weapon', value: 'holding scepter, royal scepter, magic scepter' },

        // ══════════════════════════════════
        // ── ⑤ 工具職業 tool（25 件）──
        // ══════════════════════════════════
        { id: 'book', name: '書本', en: 'Book', icon: '📖', cat: 'tool', value: 'holding book, reading a book, open book' },
        { id: 'magic_book', name: '魔法書', en: 'Magic Book', icon: '📕', cat: 'tool', value: 'holding magic book, spellbook, grimoire, ancient tome' },
        { id: 'notebook', name: '筆記本', en: 'Notebook', icon: '📓', cat: 'tool', value: 'holding notebook, journal, writing pad' },
        { id: 'briefcase', name: '手提箱', en: 'Briefcase', icon: '💼', cat: 'tool', value: 'holding briefcase, business case, document case' },
        { id: 'medkit', name: '醫療包', en: 'Medical Kit', icon: '🏥', cat: 'tool', value: 'holding medical kit, first aid kit, doctor bag' },
        { id: 'forge_hammer', name: '鍛造錘', en: 'Forge Hammer', icon: '🔨', cat: 'tool', value: 'holding forge hammer, blacksmith hammer, smithing hammer' },
        { id: 'measuring_tool', name: '測量儀器', en: 'Measuring Tool', icon: '📏', cat: 'tool', value: 'holding measuring instrument, compass tool, protractor' },
        { id: 'camera', name: '相機', en: 'Camera', icon: '📷', cat: 'tool', value: 'holding camera, photography camera, dslr camera' },
        { id: 'pen', name: '鋼筆', en: 'Pen', icon: '🖊️', cat: 'tool', value: 'holding pen, fountain pen, writing with pen' },
        { id: 'paintbrush', name: '畫筆', en: 'Paintbrush', icon: '🖌️', cat: 'tool', value: 'holding paintbrush, art brush, painting brush' },
        { id: 'scissors', name: '剪刀', en: 'Scissors', icon: '✂️', cat: 'tool', value: 'holding scissors, hair scissors, shears' },
        { id: 'wrench', name: '扳手', en: 'Wrench', icon: '🔧', cat: 'tool', value: 'holding wrench, mechanic wrench, spanner' },
        { id: 'magnifying_glass', name: '放大鏡', en: 'Magnifying Glass', icon: '🔍', cat: 'tool', value: 'holding magnifying glass, detective glass, loupe' },
        { id: 'telescope', name: '望遠鏡', en: 'Telescope', icon: '🔭', cat: 'tool', value: 'holding telescope, spyglass, looking through telescope' },
        { id: 'cooking_utensil', name: '廚具', en: 'Cooking Utensil', icon: '🍳', cat: 'tool', value: 'holding cooking utensil, frying pan, ladle, spatula' },
        { id: 'scroll', name: '卷軸', en: 'Scroll', icon: '📜', cat: 'tool', value: 'holding scroll, ancient scroll, magic scroll, parchment' },
        { id: 'compass', name: '指南針', en: 'Compass', icon: '🧭', cat: 'tool', value: 'holding compass, navigation compass, explorer tool' },
        { id: 'lantern', name: '提燈', en: 'Lantern', icon: '🏮', cat: 'tool', value: 'holding lantern, oil lantern, hanging lamp, paper lantern' },
        { id: 'key', name: '鑰匙', en: 'Key', icon: '🔑', cat: 'tool', value: 'holding key, ornate key, golden key, skeleton key' },
        { id: 'potion', name: '藥水瓶', en: 'Potion Bottle', icon: '🧪', cat: 'tool', value: 'holding potion bottle, elixir, glowing potion, alchemy flask' },
        { id: 'violin', name: '小提琴', en: 'Violin', icon: '🎻', cat: 'tool', value: 'holding violin, playing violin, violin bow' },
        { id: 'guitar', name: '吉他', en: 'Guitar', icon: '🎸', cat: 'tool', value: 'holding guitar, playing guitar, acoustic guitar' },
        { id: 'flute', name: '長笛', en: 'Flute', icon: '🎶', cat: 'tool', value: 'holding flute, playing flute, magic flute' },
        { id: 'map', name: '地圖', en: 'Map', icon: '🗺️', cat: 'tool', value: 'holding map, treasure map, reading map, old map' },
        { id: 'pocket_watch', name: '懷錶', en: 'Pocket Watch', icon: '⏱️', cat: 'tool', value: 'holding pocket watch, antique watch, chain pocket watch' },

        // ══════════════════════════════════
        // ── ⑥ 科技裝置 tech（22 件）──
        // ══════════════════════════════════
        { id: 'smartwatch', name: '智慧手錶', en: 'Smartwatch', icon: '⌚', cat: 'tech', value: 'smartwatch, digital watch, smart wearable' },
        { id: 'hologram_device', name: '全息投影器', en: 'Hologram Device', icon: '📱', cat: 'tech', value: 'hologram projector, handheld holographic display, hologram from hand' },
        { id: 'handheld_terminal', name: '手持終端', en: 'Handheld Terminal', icon: '📲', cat: 'tech', value: 'handheld terminal, portable data pad, mobile computer' },
        { id: 'data_pad', name: '數據板', en: 'Data Pad', icon: '📋', cat: 'tech', value: 'data pad, sci-fi tablet, information display pad' },
        { id: 'energy_controller', name: '能量操控器', en: 'Energy Controller', icon: '🎮', cat: 'tech', value: 'energy controller, power manipulation device, energy gauntlet' },
        { id: 'neural_link', name: '神經連接手環', en: 'Neural Link Band', icon: '🧠', cat: 'tech', value: 'neural link wristband, brain-computer interface band, cybernetic link' },
        { id: 'smartphone', name: '手機', en: 'Smartphone', icon: '📱', cat: 'tech', value: 'holding smartphone, using phone, mobile phone in hand' },
        { id: 'drone_controller', name: '無人機遙控器', en: 'Drone Controller', icon: '🎮', cat: 'tech', value: 'drone controller, remote control, UAV controller' },
        { id: 'wrist_computer', name: '腕式電腦', en: 'Wrist Computer', icon: '💻', cat: 'tech', value: 'wrist computer, pip-boy, forearm computer, wrist-mounted display' },
        { id: 'scanner', name: '掃描器', en: 'Scanner', icon: '📡', cat: 'tech', value: 'handheld scanner, tricorder, scanning device' },
        { id: 'holo_map', name: '全息地圖', en: 'Holo Map', icon: '🗺️', cat: 'tech', value: 'holographic map, floating map display, 3D hologram map' },
        { id: 'laser_pointer', name: '雷射指示器', en: 'Laser Pointer', icon: '🔴', cat: 'tech', value: 'laser pointer, directing laser, red dot sight' },
        { id: 'comm_device', name: '通訊裝置', en: 'Comm Device', icon: '📞', cat: 'tech', value: 'communication device, walkie-talkie, commlink' },
        { id: 'nano_tool', name: '奈米工具', en: 'Nano Tool', icon: '🔬', cat: 'tech', value: 'nano tool, nanotechnology device, nanobot controller' },
        { id: 'gravity_device', name: '重力裝置', en: 'Gravity Device', icon: '🌀', cat: 'tech', value: 'gravity manipulation device, anti-gravity tool, gravity glove' },
        { id: 'force_field_gen', name: '力場產生器', en: 'Force Field Generator', icon: '🔵', cat: 'tech', value: 'force field generator, shield emitter, energy barrier device' },
        { id: 'bio_scanner', name: '生物掃描器', en: 'Bio Scanner', icon: '🧬', cat: 'tech', value: 'bio scanner, life sign detector, biological analyzer' },
        { id: 'hacking_tool', name: '駭客工具', en: 'Hacking Tool', icon: '💻', cat: 'tech', value: 'hacking device, cyberpunk hacking tool, digital intrusion device' },
        { id: 'energy_pack', name: '能量背包', en: 'Energy Pack', icon: '🔋', cat: 'tech', value: 'energy pack, power cell pack, portable reactor' },
        { id: 'mech_gauntlet', name: '機械護手', en: 'Mech Gauntlet', icon: '🦾', cat: 'tech', value: 'mechanical gauntlet, powered exo-glove, mech fist' },
        { id: 'holo_blade', name: '全息劍', en: 'Holo Blade', icon: '🔷', cat: 'tech', value: 'holographic blade, hard-light weapon, holo sword' },
        { id: 'teleporter', name: '傳送裝置', en: 'Teleporter', icon: '⚡', cat: 'tech', value: 'handheld teleporter, portal device, spatial transport tool' },

        // ══════════════════════════════════
        // ── ⑦ 魔法媒介 magic（25 件）──
        // ══════════════════════════════════
        { id: 'magic_circle', name: '浮空魔法陣', en: 'Floating Magic Circle', icon: '⭕', cat: 'magic', value: 'floating magic circle, hovering rune circle, magical array in hand' },
        { id: 'energy_ball', name: '能量球', en: 'Energy Ball', icon: '🔵', cat: 'magic', value: 'energy ball in hand, glowing orb, power sphere' },
        { id: 'fire_hand', name: '火焰', en: 'Fire', icon: '🔥', cat: 'magic', value: 'fire in hand, flames from palm, pyrokinesis, firebolt' },
        { id: 'lightning_hand', name: '雷電', en: 'Lightning', icon: '⚡', cat: 'magic', value: 'lightning in hand, electrical discharge, thunder magic, spark from fingers' },
        { id: 'ice_crystal', name: '冰霜結晶', en: 'Ice Crystal', icon: '❄️', cat: 'magic', value: 'ice crystal in hand, frost magic, frozen shard, ice spell' },
        { id: 'soul_fire', name: '靈魂火焰', en: 'Soul Fire', icon: '👻', cat: 'magic', value: 'soul fire, ghostly flame, spectral fire, will-o-wisp in hand' },
        { id: 'dark_vortex', name: '黑暗漩渦', en: 'Dark Vortex', icon: '🌀', cat: 'magic', value: 'dark vortex in hand, shadow swirl, void energy, darkness portal' },
        { id: 'healing_light', name: '治療光芒', en: 'Healing Light', icon: '💛', cat: 'magic', value: 'healing light, golden glow from hands, restoration magic' },
        { id: 'wind_spiral', name: '風之螺旋', en: 'Wind Spiral', icon: '🌪️', cat: 'magic', value: 'wind spiral in hand, air vortex, tornado magic, wind element' },
        { id: 'water_sphere', name: '水之球', en: 'Water Sphere', icon: '💧', cat: 'magic', value: 'water sphere, floating water ball, aqua magic, water manipulation' },
        { id: 'earth_stone', name: '大地之石', en: 'Earth Stone', icon: '🪨', cat: 'magic', value: 'earth stone, floating rock, levitating earth chunk, geo magic' },
        { id: 'light_beam', name: '聖光之矛', en: 'Light Beam', icon: '✝️', cat: 'magic', value: 'holy light beam, divine light spear, sacred ray' },
        { id: 'shadow_tendril', name: '暗影觸手', en: 'Shadow Tendril', icon: '🖤', cat: 'magic', value: 'shadow tendrils from hand, dark tentacles, shadow manipulation' },
        { id: 'star_dust', name: '星辰之塵', en: 'Star Dust', icon: '⭐', cat: 'magic', value: 'stardust in hand, cosmic particles, sparkling star magic' },
        { id: 'blood_magic', name: '血魔法', en: 'Blood Magic', icon: '🩸', cat: 'magic', value: 'blood magic, crimson energy, blood floating from hand' },
        { id: 'time_magic', name: '時間魔法', en: 'Time Magic', icon: '⏳', cat: 'magic', value: 'time magic, clock hands floating, temporal energy, time distortion' },
        { id: 'gravity_magic', name: '重力魔法', en: 'Gravity Magic', icon: '🌑', cat: 'magic', value: 'gravity magic, gravity well, gravitational distortion from hand' },
        { id: 'nature_magic', name: '自然魔法', en: 'Nature Magic', icon: '🌿', cat: 'magic', value: 'nature magic, growing plants from hand, leaf swirl, druid magic' },
        { id: 'crystal_magic', name: '水晶魔法', en: 'Crystal Magic', icon: '💎', cat: 'magic', value: 'crystal magic, floating crystals, gem energy, crystal formation' },
        { id: 'rune_cast', name: '符文施放', en: 'Rune Cast', icon: '🔣', cat: 'magic', value: 'casting runes, floating rune symbols, runic magic from fingers' },
        { id: 'soul_orb', name: '靈魂之珠', en: 'Soul Orb', icon: '🔮', cat: 'magic', value: 'soul orb, spirit sphere, ethereal orb, ghost ball' },
        { id: 'chaos_energy', name: '混沌能量', en: 'Chaos Energy', icon: '💜', cat: 'magic', value: 'chaos energy, unstable magic, multicolor swirling energy' },
        { id: 'void_rift', name: '虛空裂縫', en: 'Void Rift', icon: '🕳️', cat: 'magic', value: 'void rift, spatial tear, dimensional crack, portal in palm' },
        { id: 'phoenix_flame', name: '鳳凰之焰', en: 'Phoenix Flame', icon: '🐦', cat: 'magic', value: 'phoenix flame, rebirth fire, golden-red magic fire' },
        { id: 'moonlight_magic', name: '月光魔法', en: 'Moonlight Magic', icon: '🌙', cat: 'magic', value: 'moonlight magic, lunar energy, silver glow, moon beam from hand' },

        // ══════════════════════════════════
        // ── ⑧ 束縛防護 guard（20 件）──
        // ══════════════════════════════════
        { id: 'handcuffs', name: '手銬', en: 'Handcuffs', icon: '🔒', cat: 'guard', value: 'handcuffs, shackles, cuffed hands' },
        { id: 'hand_armor', name: '手部護甲', en: 'Hand Armor', icon: '🛡️', cat: 'guard', value: 'hand armor, armored hands, plated gloves' },
        { id: 'wrist_guard', name: '護腕', en: 'Wrist Guard', icon: '💪', cat: 'guard', value: 'wrist guard, wrist bracer, arm guard' },
        { id: 'seal_shackle', name: '封印枷鎖', en: 'Seal Shackle', icon: '⛓️', cat: 'guard', value: 'seal shackle, cursed chains, magic suppression shackle' },
        { id: 'energy_bind', name: '能量束縛環', en: 'Energy Bind Ring', icon: '🔵', cat: 'guard', value: 'energy restraint ring, hovering bind, force cuffs' },
        { id: 'hand_plate', name: '護手鎧', en: 'Hand Plate', icon: '⚙️', cat: 'guard', value: 'hand plate armor, vambrace, forearm plate armor' },
        { id: 'spiked_bracer', name: '帶刺護腕', en: 'Spiked Bracer', icon: '🔥', cat: 'guard', value: 'spiked bracer, punk wristband, barbed bracer' },
        { id: 'chain_wrap', name: '鍊條纏繞', en: 'Chain Wrap', icon: '⛓️', cat: 'guard', value: 'chain-wrapped hands, chains around wrists, chained arms' },
        { id: 'ethereal_chains', name: '幽靈鎖鏈', en: 'Ethereal Chains', icon: '👻', cat: 'guard', value: 'ethereal chains, ghostly shackles, spectral restraints' },
        { id: 'divine_seal', name: '神聖封印', en: 'Divine Seal', icon: '✝️', cat: 'guard', value: 'divine seal on hands, holy binding, sacred restraint' },
        { id: 'leather_bracer', name: '皮革護腕', en: 'Leather Bracer', icon: '🟤', cat: 'guard', value: 'leather bracer, leather arm guard, ranger bracer' },
        { id: 'riot_shield', name: '防暴盾', en: 'Riot Shield', icon: '🛡️', cat: 'guard', value: 'holding riot shield, police shield, transparent shield' },
        { id: 'buckler', name: '小圓盾', en: 'Buckler', icon: '🛡️', cat: 'guard', value: 'buckler shield, small round shield, fist shield' },
        { id: 'cursed_chain', name: '詛咒鎖鏈', en: 'Cursed Chain', icon: '💀', cat: 'guard', value: 'cursed chains, dark enchanted chains, binding curse' },
        { id: 'barrier_glove', name: '結界手套', en: 'Barrier Glove', icon: '🔵', cat: 'guard', value: 'barrier glove, force field glove, shield-generating gauntlet' },
        { id: 'binding_rope', name: '束縛繩索', en: 'Binding Rope', icon: '🪢', cat: 'guard', value: 'binding rope, enchanted rope, magic bindings' },
        { id: 'arm_brace', name: '手臂支架', en: 'Arm Brace', icon: '🏥', cat: 'guard', value: 'arm brace, medical arm support, arm splint' },
        { id: 'power_limiter', name: '力量限制器', en: 'Power Limiter', icon: '⚠️', cat: 'guard', value: 'power limiter bracelet, ability suppressor, energy dampener' },
        { id: 'tattoo_seal', name: '封印刺青', en: 'Tattoo Seal', icon: '🖋️', cat: 'guard', value: 'seal tattoo on hand, binding mark, cursed tattoo, magic seal tattoo' },
        { id: 'exo_frame', name: '外骨骼框架', en: 'Exo Frame', icon: '🦾', cat: 'guard', value: 'exoskeleton frame on arm, powered exo-arm, mechanical support frame' },

        // ══════════════════════════════════
        // ── ⑨ 概念象徵 concept（15 件）──
        // ══════════════════════════════════
        { id: 'blood_pact', name: '血契印記', en: 'Blood Pact Mark', icon: '🩸', cat: 'concept', value: 'blood pact mark on hand, blood contract seal, crimson sigil' },
        { id: 'glowing_crest', name: '發光紋章', en: 'Glowing Crest', icon: '💫', cat: 'concept', value: 'glowing crest on hand, luminous emblem, shining family crest' },
        { id: 'royal_seal', name: '王族戒印', en: 'Royal Seal Ring', icon: '👑', cat: 'concept', value: 'royal seal ring, king signet, noble crest ring, authority symbol' },
        { id: 'time_mark', name: '時間刻印', en: 'Time Mark', icon: '⏳', cat: 'concept', value: 'time mark on hand, temporal tattoo, clock symbols on skin' },
        { id: 'fate_thread', name: '命運線纏繞', en: 'Fate Thread', icon: '🧵', cat: 'concept', value: 'fate threads wrapped around fingers, red string of fate, destiny thread' },
        { id: 'pixel_fragment', name: '數位像素碎片', en: 'Digital Pixel Fragment', icon: '🎮', cat: 'concept', value: 'digital pixels fragmenting from hand, glitch effect, data particles' },
        { id: 'contract_mark', name: '契約紋', en: 'Contract Mark', icon: '📝', cat: 'concept', value: 'magic contract mark, binding agreement seal, pact sign on hand' },
        { id: 'cursed_brand', name: '詛咒烙印', en: 'Cursed Brand', icon: '💀', cat: 'concept', value: 'cursed brand on hand, dark mark, demonic brand, scarred symbol' },
        { id: 'star_map', name: '星圖印記', en: 'Star Map Mark', icon: '🌌', cat: 'concept', value: 'star map tattoo on hand, constellation marks, astral chart on skin' },
        { id: 'elemental_mark', name: '元素印記', en: 'Elemental Mark', icon: '🔥', cat: 'concept', value: 'elemental mark, glowing element symbol, fire water earth air sign' },
        { id: 'dream_weave', name: '夢境編織', en: 'Dream Weave', icon: '💭', cat: 'concept', value: 'dream weaving from hands, ethereal dream threads, surreal energy' },
        { id: 'soul_brand', name: '靈魂烙印', en: 'Soul Brand', icon: '👻', cat: 'concept', value: 'soul brand on palm, spiritual mark, ethereal symbol' },
        { id: 'quantum_mark', name: '量子印記', en: 'Quantum Mark', icon: '⚛️', cat: 'concept', value: 'quantum fluctuation mark, probability wave pattern, subatomic symbol on hand' },
        { id: 'void_mark', name: '虛空印記', en: 'Void Mark', icon: '🕳️', cat: 'concept', value: 'void mark on hand, emptiness seal, null energy symbol' },
        { id: 'divine_blessing', name: '神祝福印', en: 'Divine Blessing', icon: '✨', cat: 'concept', value: 'divine blessing mark, holy glow on hand, gods favor symbol, sacred light' }
    ];

    // ── 熱門列表（20 件）──
    const HOT_ITEMS = [
        'magic_wand', 'katana', 'energy_blade', 'magic_ring', 'half_gloves',
        'mech_arm', 'fire_hand', 'lightning_hand', 'magic_book', 'magic_circle',
        'handgun', 'longsword', 'energy_ball', 'staff', 'gauntlets',
        'smartwatch', 'blood_pact', 'fate_thread', 'handcuffs', 'potion'
    ];

    // ── 加分特徵 ──
    const BONUS_TRAITS = {
        ring: [
            { icon: '✨', zh: '鑲嵌寶石', en: 'jeweled, gemstone embedded' },
            { icon: '🌟', zh: '發光效果', en: 'glowing, luminous' },
            { icon: '🔮', zh: '附魔', en: 'enchanted, magical aura' },
            { icon: '🖤', zh: '暗黑風格', en: 'dark theme, gothic' },
            { icon: '🌹', zh: '花朵雕刻', en: 'floral engraving' },
            { icon: '🐉', zh: '龍形設計', en: 'dragon motif' }
        ],
        bracelet: [
            { icon: '⚡', zh: '能量發光', en: 'energy glow, luminous' },
            { icon: '🔗', zh: '精緻鎖鏈', en: 'delicate chain link' },
            { icon: '💎', zh: '寶石鑲嵌', en: 'gem inlaid' },
            { icon: '🌿', zh: '自然材質', en: 'natural material, organic' },
            { icon: '📡', zh: '科技感', en: 'high-tech, digital display' },
            { icon: '🔮', zh: '魔法符文', en: 'magic rune inscribed' }
        ],
        glove: [
            { icon: '⚡', zh: '能量紋路', en: 'energy line pattern' },
            { icon: '🔥', zh: '火焰特效', en: 'fire effect, burning' },
            { icon: '❄️', zh: '冰霜結晶', en: 'frost crystals, icy' },
            { icon: '🦾', zh: '機械增強', en: 'mechanical enhancement' },
            { icon: '🖤', zh: '暗黑材質', en: 'dark material, shadow' },
            { icon: '✨', zh: '發光刺繡', en: 'luminous embroidery' }
        ],
        weapon: [
            { icon: '⚡', zh: '附魔光芒', en: 'enchanted glow' },
            { icon: '🔥', zh: '火焰附魔', en: 'fire enchantment, flaming' },
            { icon: '❄️', zh: '冰霜附魔', en: 'frost enchantment, frozen' },
            { icon: '💜', zh: '暗影附魔', en: 'shadow enchantment, dark aura' },
            { icon: '✨', zh: '神聖光芒', en: 'holy glow, divine' },
            { icon: '🩸', zh: '帶血', en: 'bloodied, blood-stained' }
        ],
        tool: [
            { icon: '✨', zh: '魔法發光', en: 'magical glow' },
            { icon: '📜', zh: '古老樣式', en: 'ancient style, antique' },
            { icon: '⚙️', zh: '精密工藝', en: 'intricate craftsmanship' },
            { icon: '🌿', zh: '自然元素', en: 'nature element, vine covered' },
            { icon: '💎', zh: '寶石裝飾', en: 'gem decoration' },
            { icon: '🔮', zh: '附魔', en: 'enchanted, magic-infused' }
        ],
        tech: [
            { icon: '📊', zh: '全息投影', en: 'holographic display' },
            { icon: '💡', zh: 'LED 發光', en: 'LED illuminated' },
            { icon: '⚡', zh: '能量脈衝', en: 'energy pulse' },
            { icon: '🔵', zh: '藍光效果', en: 'blue light glow' },
            { icon: '🌐', zh: '數位介面', en: 'digital interface' },
            { icon: '🔧', zh: '機械零件', en: 'mechanical parts, gears' }
        ],
        magic: [
            { icon: '🌈', zh: '彩虹光譜', en: 'rainbow spectrum, multicolor' },
            { icon: '⭐', zh: '星辰特效', en: 'stellar effect, stardust' },
            { icon: '🌀', zh: '漩渦效果', en: 'swirling vortex' },
            { icon: '💫', zh: '閃爍粒子', en: 'sparkling particles' },
            { icon: '🖤', zh: '暗黑腐蝕', en: 'dark corruption' },
            { icon: '💛', zh: '神聖淨化', en: 'holy purification' }
        ],
        guard: [
            { icon: '⚡', zh: '電弧效果', en: 'electric arc effect' },
            { icon: '🔮', zh: '魔法強化', en: 'magically reinforced' },
            { icon: '🔥', zh: '火焰紋飾', en: 'flame pattern' },
            { icon: '❄️', zh: '冰霜覆蓋', en: 'frost covered' },
            { icon: '🖤', zh: '暗影籠罩', en: 'shadow shrouded' },
            { icon: '✨', zh: '聖光加持', en: 'holy light blessed' }
        ],
        concept: [
            { icon: '💫', zh: '粒子消散', en: 'particle dissolving' },
            { icon: '🌈', zh: '色彩流轉', en: 'color flowing, chromatic' },
            { icon: '⏳', zh: '時間扭曲', en: 'time distortion' },
            { icon: '🌌', zh: '星空映射', en: 'starfield reflection' },
            { icon: '🔥', zh: '灼熱光芒', en: 'burning glow' },
            { icon: '🖤', zh: '虛無質感', en: 'void texture, emptiness' }
        ]
    };

    return { CATEGORIES, ITEMS, HOT_ITEMS, BONUS_TRAITS };
})();
