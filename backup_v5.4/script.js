document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    // ===== v5.0 TAB DATA =====
    const TABS = [
        { id: 'base', label: '基本', en: 'Basic', icon: 'fa-solid fa-user' },
        { id: 'appearance', label: '外觀', en: 'Appearance', icon: 'fa-solid fa-shirt' },
        { id: 'action', label: '動作', en: 'Action', icon: 'fa-solid fa-bolt' },
        { id: 'style', label: '風格', en: 'Style', icon: 'fa-solid fa-palette' },
        { id: 'environment', label: '環境', en: 'Environment', icon: 'fa-solid fa-cloud-sun' },
        { id: 'camera', label: '攝影', en: 'Camera', icon: 'fa-solid fa-camera' }
    ];

    const RACES = [
        { label: '人類', en: 'Human', value: 'human' },
        { label: '精靈', en: 'Elf', value: 'elf' },
        { label: '天使', en: 'Angel', value: 'angel, wings, halo' },
        { label: '惡魔', en: 'Demon', value: 'demon, horns, wings, tail' },
        { label: '獸人', en: 'Kemonomimi', value: 'furry, kemonomimi, animal ears' },
        { label: '吸血鬼', en: 'Vampire', value: 'vampire, pale skin, red eyes, fangs' },
        { label: '龍人', en: 'Dragon', value: 'dragon girl, dragon horns, tail, scales' },
        { label: '機器人', en: 'Android', value: 'android, robot, mechanical parts' },
        { label: '幽靈', en: 'Ghost', value: 'ghost, translucent, spirit' },
        { label: '人魚', en: 'Mermaid', value: 'mermaid, fish tail, underwater' },
        { label: '妖精', en: 'Fairy', value: 'fairy, small wings, tiny' },
        { label: '半獸人', en: 'Orc', value: 'orc, green skin, tusks' },
        { label: '矮人', en: 'Dwarf', value: 'dwarf, short' },
        { label: '魅魔', en: 'Succubus', value: 'succubus, bat wings, heart tail' },
        { label: '貓娘', en: 'Cat Girl', value: 'cat girl, cat ears, cat tail' },
        { label: '狐娘', en: 'Fox Girl', value: 'fox girl, fox ears, multiple tails' },
        { label: '兔女郎', en: 'Bunny Girl', value: 'bunny girl, rabbit ears' },
        { label: '外星人', en: 'Alien', value: 'alien, extraterrestrial' },
        { label: '史萊姆', en: 'Slime', value: 'slime girl, translucent skin' },
        { label: '殭屍', en: 'Zombie', value: 'zombie, pale, undead' }
    ];

    const JOBS = [
        // Top otaku favorites
        { label: '女僕', en: 'Maid', value: 'maid, maid headdress' },
        { label: '學生', en: 'Student', value: 'student, school uniform' },
        { label: '偶像', en: 'Idol', value: 'idol, stage outfit, microphone' },
        { label: '巫女', en: 'Shrine Maiden', value: 'shrine maiden, miko' },
        { label: '護士', en: 'Nurse', value: 'nurse, hospital' },
        { label: '魔法師', en: 'Mage', value: 'mage, wizard, robe, staff' },
        { label: 'OL', en: 'Office Lady', value: 'office lady, business suit' },
        { label: '公主', en: 'Princess', value: 'princess, tiara, dress' },
        { label: '騎士', en: 'Knight', value: 'knight, armor, sword' },
        { label: '修女', en: 'Nun', value: 'nun, habit' },
        { label: '女王', en: 'Queen', value: 'queen, crown, royalty' },
        { label: '忍者', en: 'Ninja', value: 'ninja, shinobi' },
        { label: '戰士', en: 'Warrior', value: 'warrior, fighting stance' },
        { label: '執事', en: 'Butler', value: 'butler, suit' },
        { label: '弓箭手', en: 'Archer', value: 'archer, holding bow' },
        { label: '魔王', en: 'Demon Lord', value: 'demon lord, dark power' },
        { label: '勇者', en: 'Hero', value: 'hero, legendary sword' },
        { label: '盜賊', en: 'Rogue', value: 'thief, rogue, dagger' },
        { label: '殺手', en: 'Assassin', value: 'assassin, dark clothes' },
        { label: '牧師', en: 'Cleric', value: 'cleric, priest, healer' },
        { label: '警察', en: 'Police', value: 'police officer, uniform' },
        { label: '軍人', en: 'Soldier', value: 'soldier, military' },
        { label: '海盜', en: 'Pirate', value: 'pirate, eyepatch' },
        { label: '廚師', en: 'Chef', value: 'chef, apron' },
        { label: '運動員', en: 'Athlete', value: 'athlete, sportswear' },
        { label: '偵探', en: 'Detective', value: 'detective, magnifying glass' },
        { label: '太空人', en: 'Astronaut', value: 'astronaut, spacesuit' },
        { label: '賽車手', en: 'Racer', value: 'racer, racing suit' },
        { label: '音樂家', en: 'Musician', value: 'musician, instrument' },
        { label: '畫家', en: 'Painter', value: 'painter, beret, palette' },
        // New 20 otaku-favorite additions
        { label: '魔女', en: 'Witch', value: 'witch, hat, broom, magic' },
        { label: 'Coser', en: 'Cosplayer', value: 'cosplayer, costume' },
        { label: '啦啦隊', en: 'Cheerleader', value: 'cheerleader, pom poms, uniform' },
        { label: '賞金獵人', en: 'Bounty Hunter', value: 'bounty hunter, weapons' },
        { label: '吟遊詩人', en: 'Bard', value: 'bard, lute, traveling clothes' },
        { label: '鍊金術師', en: 'Alchemist', value: 'alchemist, potions, flask' },
        { label: '舞者', en: 'Dancer', value: 'dancer, elegant pose' },
        { label: '馴獸師', en: 'Beast Tamer', value: 'beast tamer, whip' },
        { label: '機械師', en: 'Mechanic', value: 'mechanic, wrench, goggles' },
        { label: '空姐', en: 'Flight Attendant', value: 'flight attendant, uniform' },
        { label: '模特兒', en: 'Model', value: 'model, fashion, runway' },
        { label: '花魁', en: 'Oiran', value: 'oiran, ornate kimono, hair ornaments' },
        { label: '劍士', en: 'Swordsman', value: 'swordsman, katana, samurai' },
        { label: '歌姬', en: 'Songstress', value: 'songstress, singing, elegant dress' },
        { label: '傭兵', en: 'Mercenary', value: 'mercenary, battle-worn armor' },
        { label: '調酒師', en: 'Bartender', value: 'bartender, cocktail shaker, vest' },
        { label: '教師', en: 'Teacher', value: 'teacher, glasses, classroom' },
        { label: '圖書館員', en: 'Librarian', value: 'librarian, glasses, books' },
        { label: '占卜師', en: 'Fortune Teller', value: 'fortune teller, crystal ball, mysterious' },
        { label: '獵人', en: 'Hunter', value: 'hunter, crossbow, camouflage' }
    ];

    const HAIRSTYLES_FEMALE = [
        { label: '雙馬尾', en: 'Twin Tails', value: 'twin tails', image: 'assets/previews/hair_twintails.png' },
        { label: '長直髮', en: 'Long Straight', value: 'long straight hair', image: 'assets/previews/hair_long_hair.png' },
        { label: '波波頭', en: 'Bob Cut', value: 'bob cut', image: 'assets/previews/hair_bob_cut.png' },
        { label: '單馬尾', en: 'Ponytail', value: 'ponytail', image: 'assets/previews/hair_ponytail.png' },
        { label: '姬髮式', en: 'Hime Cut', value: 'hime cut', image: 'assets/previews/hair_hime_cut.png' },
        { label: '凌亂短髮', en: 'Messy Short', value: 'messy short hair' },
        { label: '麻花辮', en: 'Braid', value: 'braid', image: 'assets/previews/hair_single_braid.png' },
        { label: '法式編髮', en: 'French Braid', value: 'french braid' },
        { label: '側馬尾', en: 'Side Ponytail', value: 'side ponytail' },
        { label: '丸子頭', en: 'Bun', value: 'bun', image: 'assets/previews/hair_low_bun.png' },
        { label: '雙丸子', en: 'Twin Buns', value: 'twin buns', image: 'assets/previews/hair_double_buns.png' },
        { label: '精靈短髮', en: 'Pixie Cut', value: 'pixie cut', image: 'assets/previews/hair_pixie_cut.png' },
        { label: '波浪長髮', en: 'Wavy Long', value: 'wavy long hair', image: 'assets/previews/hair_wavy_long_hair.png' },
        { label: '捲髮', en: 'Curly', value: 'curly hair' },
        { label: '鑽頭捲', en: 'Drill Hair', value: 'drill hair' },
        { label: '齊瀏海短髮', en: 'Short w/ Bangs', value: 'short hair with bangs', image: 'assets/previews/hair_bob_cut_blunt_bangs.png' },
        { label: '齊瀏海長髮', en: 'Long w/ Bangs', value: 'long hair with bangs', image: 'assets/previews/hair_blunt_bangs.png' },
        { label: '狼尾剪', en: 'Wolf Cut', value: 'wolf cut', image: 'assets/previews/hair_wolf_cut.png' },
        { label: '半丸子頭', en: 'Half Up Bun', value: 'half up bun' },
        { label: '側邊編髮', en: 'Side Braid', value: 'side braid' },
        { label: '皇冠編髮', en: 'Crown Braid', value: 'crown braid' },
        { label: '髒辮', en: 'Dreadlocks', value: 'dreadlocks' },
        { label: '爆炸頭', en: 'Afro', value: 'afro', image: 'assets/previews/hair_afro.png' },
        { label: '龐克莫霍克', en: 'Mohawk', value: 'mohawk' },
        { label: '光頭', en: 'Bald', value: 'bald', image: 'assets/previews/hair_bald.png' },
        { label: '雲朵燙', en: 'Cloud Hair', value: 'cloud hair' },
        { label: '漂浮長髮', en: 'Floating Hair', value: 'floating hair' },
        { label: '不過肩長髮', en: 'Medium Hair', value: 'medium hair' },
        { label: '超長髮', en: 'Very Long', value: 'very long hair' },
        { label: '不對稱短髮', en: 'Asymmetrical', value: 'asymmetrical short hair' }
    ];

    const HAIRSTYLES_MALE = [
        { label: '清爽短髮', en: 'Short Hair', value: 'short hair', image: 'assets/previews/hair_short_hair.png' },
        { label: '寸頭', en: 'Buzz Cut', value: 'buzz cut', image: 'assets/previews/hair_buzz_cut.png' },
        { label: '側削上梳', en: 'Undercut', value: 'undercut' },
        { label: '油頭', en: 'Slicked Back', value: 'slicked back' },
        { label: '飛機頭', en: 'Pompadour', value: 'pompadour' },
        { label: '莫霍克', en: 'Mohawk', value: 'mohawk' },
        { label: '刺蝟頭', en: 'Spiky Hair', value: 'spiky hair' },
        { label: '凌亂碎髮', en: 'Messy Hair', value: 'messy hair' },
        { label: '長髮', en: 'Long Hair', value: 'long hair', image: 'assets/previews/hair_long_hair.png' },
        { label: '馬尾', en: 'Ponytail', value: 'ponytail', image: 'assets/previews/hair_ponytail.png' },
        { label: '丸子頭', en: 'Man Bun', value: 'man bun' },
        { label: '中分', en: 'Curtain Hair', value: 'curtain hair', image: 'assets/previews/hair_center_part.png' },
        { label: '瀏海短髮', en: 'Fringe Hair', value: 'fringe hair' },
        { label: '層次剪裁', en: 'Textured Crop', value: 'textured crop' },
        { label: '漸層推剪', en: 'Fade Cut', value: 'fade cut' },
        { label: '旁分', en: 'Side Part', value: 'side part', image: 'assets/previews/hair_side_part.png' },
        { label: '蘑菇頭', en: 'Bowl Cut', value: 'bowl cut' },
        { label: '爆炸頭', en: 'Afro', value: 'afro', image: 'assets/previews/hair_afro.png' },
        { label: '髒辮', en: 'Dreadlocks', value: 'dreadlocks' },
        { label: '地壟溝辮', en: 'Cornrows', value: 'cornrows' },
        { label: '狼尾', en: 'Mullet', value: 'mullet' },
        { label: '日系微捲', en: 'Shaggy Hair', value: 'shaggy hair' },
        { label: '武士頭', en: 'Samurai Topknot', value: 'samurai topknot' },
        { label: '動漫刺蝟頭', en: 'Anime Hair', value: 'anime protagonist hair' },
        { label: '剛睡醒', en: 'Bedhead', value: 'bedhead' },
        { label: '波浪捲', en: 'Wavy Hair', value: 'wavy hair' },
        { label: '捲髮', en: 'Curly Hair', value: 'curly hair' },
        { label: '層次長髮', en: 'Layered Long', value: 'layered long hair' },
        { label: '光頭', en: 'Bald', value: 'bald', image: 'assets/previews/hair_bald.png' },
        { label: '二分區', en: 'Two-Block', value: 'two-block cut' }
    ];

    const HAIR_COLORS = [
        { label: '銀白', en: 'Silver', value: 'silver hair', color: '#e2e8f0' },
        { label: '金黃', en: 'Blonde', value: 'blonde hair', color: '#fcd34d' },
        { label: '烏黑', en: 'Black', value: 'black hair', color: '#1a202c' },
        { label: '粉紅', en: 'Pink', value: 'pink hair', color: '#f9a8d4' },
        { label: '天藍', en: 'Light Blue', value: 'light blue hair', color: '#93c5fd' },
        { label: '赤紅', en: 'Red', value: 'red hair', color: '#ef4444' },
        { label: '純白', en: 'White', value: 'white hair', color: '#ffffff' },
        { label: '栗棕', en: 'Brown', value: 'brown hair', color: '#8d6e63' },
        { label: '深藍', en: 'Dark Blue', value: 'dark blue hair', color: '#1e3a8a' },
        { label: '翠綠', en: 'Green', value: 'green hair', color: '#22c55e' },
        { label: '深紫', en: 'Purple', value: 'purple hair', color: '#a855f7' },
        { label: '橘色', en: 'Orange', value: 'orange hair', color: '#f97316' },
        { label: '灰色', en: 'Grey', value: 'grey hair', color: '#9ca3af' },
        { label: '白金', en: 'Platinum', value: 'platinum blonde hair', color: '#fef3c7' },
        { label: '金棕', en: 'Golden Brown', value: 'golden brown hair', color: '#b45309' },
        { label: '青色', en: 'Teal', value: 'teal hair', color: '#14b8a6' },
        { label: '多彩', en: 'Multi', value: 'multicolored hair', color: 'linear-gradient(to right, #f9a8d4, #93c5fd)' },
        { label: '彩虹', en: 'Rainbow', value: 'rainbow hair', color: 'linear-gradient(to right, #ef4444, #fcd34d, #22c55e, #3b82f6, #a855f7)' }
    ];

    const EYE_COLORS = [
        { label: '藍色', en: 'Blue', value: 'blue', color: '#3b82f6' },
        { label: '紅色', en: 'Red', value: 'red', color: '#ef4444' },
        { label: '綠色', en: 'Green', value: 'green', color: '#22c55e' },
        { label: '琥珀', en: 'Amber', value: 'amber', color: '#f59e0b' },
        { label: '紫色', en: 'Purple', value: 'purple', color: '#a855f7' },
        { label: '粉紅', en: 'Pink', value: 'pink', color: '#ec4899' },
        { label: '金色', en: 'Gold', value: 'gold', color: '#eab308' },
        { label: '銀灰', en: 'Silver', value: 'silver', color: '#94a3b8' },
        { label: '黑色', en: 'Black', value: 'black', color: '#171717' },
        { label: '棕色', en: 'Brown', value: 'brown', color: '#78350f' },
        { label: '青色', en: 'Teal', value: 'teal', color: '#14b8a6' },
        { label: '橙色', en: 'Orange', value: 'orange', color: '#f97316' },
        { label: '深藍', en: 'Dark Blue', value: 'dark blue', color: '#1e3a8a' },
        { label: '黃色', en: 'Yellow', value: 'yellow', color: '#facc15' },
        { label: '白色', en: 'White', value: 'white', color: '#ffffff' },
        { label: '紫羅蘭', en: 'Violet', value: 'violet', color: '#7c3aed' },
        { label: '水藍', en: 'Aqua', value: 'aqua', color: '#06b6d4' },
        { label: '血紅', en: 'Blood Red', value: 'blood red', color: '#991b1b' },
        { label: '發光', en: 'Glowing', value: 'glowing eyes', color: '#fef3c7' },
        { label: '異色', en: 'Heterochromia', value: 'heterochromia', color: 'linear-gradient(to right, #3b82f6, #ef4444)' }
    ];

    const OUTFITS = [
        { label: '水手服', en: 'Sailor Uniform', value: 'sailor uniform', image: 'assets/previews/clothing_school_sailor.png' },
        { label: '西裝校服', en: 'Blazer Uniform', value: 'blazer school uniform', image: 'assets/previews/clothing_school_blazer.png' },
        { label: '白色洋裝', en: 'White Sundress', value: 'white sundress', image: 'assets/previews/clothing_sundress.png' },
        { label: '巫女服', en: 'Miko Outfit', value: 'miko outfit', image: 'assets/previews/clothing_miko.png' },
        { label: '女僕裝', en: 'Maid', value: 'maid apron', image: 'assets/previews/clothing_maid.png' },
        { label: '運動服', en: 'Gym Clothes', value: 'gym clothes', image: 'assets/previews/clothing_gym_suit.png' },
        { label: '休閒 T恤', en: 'T-shirt', value: 'casual t-shirt', image: 'assets/previews/clothing_tshirt.png' },
        { label: '連帽衫', en: 'Hoodie', value: 'hoodie', image: 'assets/previews/clothing_hoodie.png' },
        { label: '和服', en: 'Kimono', value: 'kimono', image: 'assets/previews/clothing_kimono.png' },
        { label: '浴衣', en: 'Yukata', value: 'yukata', image: 'assets/previews/clothing_yukata.png' },
        { label: '旗袍', en: 'Cheongsam', value: 'chinese dress (qipao)', image: 'assets/previews/clothing_cheongsam.png' },
        { label: '哥德蘿莉', en: 'Gothic Lolita', value: 'gothic lolita dress' },
        { label: '修女服', en: 'Nun Habit', value: 'nun habit' },
        { label: '騎士盔甲', en: 'Knight Armor', value: 'knight armor' },
        { label: '賽博龐克裝', en: 'Cyberpunk', value: 'cyberpunk bodysuit' },
        { label: '忍者服', en: 'Ninja Outfit', value: 'ninja outfit' },
        { label: '魔女袍', en: 'Witch Robe', value: 'witch robe' },
        { label: '比基尼', en: 'Bikini', value: 'bikini', image: 'assets/previews/clothing_bikini.png' },
        { label: '辦公室套裝', en: 'Office Suit', value: 'office lady suit', image: 'assets/previews/clothing_office_lady.png' },
        { label: '護士服', en: 'Nurse', value: 'nurse uniform', image: 'assets/previews/clothing_nurse.png' },
        { label: '警服', en: 'Police', value: 'police uniform', image: 'assets/previews/clothing_police.png' },
        { label: '公主禮服', en: 'Princess Dress', value: 'princess dress' },
        { label: '睡衣', en: 'Pajamas', value: 'pajamas' },
        { label: '漢服', en: 'Hanfu', value: 'hanfu, chinese traditional clothing', image: 'assets/previews/clothing_hanfu.png' },
        { label: '韓服', en: 'Hanbok', value: 'hanbok, korean traditional clothing', image: 'assets/previews/clothing_hanbok.png' },
        { label: '毛衣', en: 'Sweater', value: 'sweater', image: 'assets/previews/clothing_sweater.png' },
        { label: '露肩上衣', en: 'Off-shoulder', value: 'off-shoulder top', image: 'assets/previews/clothing_off_shoulder.png' },
        { label: '裙子', en: 'Skirt', value: 'skirt', image: 'assets/previews/clothing_skirt.png' },
        { label: '牛仔褲', en: 'Jeans', value: 'jeans', image: 'assets/previews/clothing_jeans.png' },
        { label: '兔女郎', en: 'Bunny Suit', value: 'bunny suit' },
        { label: '科技戰甲', en: 'Power Armor', value: 'sci-fi power armor' }
    ];

    const EXPRESSIONS = [
        { label: '傲嬌', en: 'Tsundere', value: 'tsundere, slight smile' },
        { label: '微笑', en: 'Smile', value: 'gentle smile' },
        { label: '害羞', en: 'Shy', value: 'blushing, shy' },
        { label: '高冷', en: 'Cold', value: 'expressionless, cold eyes' },
        { label: '興奮', en: 'Excited', value: 'excited, happy, open mouth' },
        { label: '哭泣', en: 'Crying', value: 'crying, tears' }
    ];

    const MOODS = [
        { label: '平靜', en: 'Calm', value: 'calm' },
        { label: '開心', en: 'Happy', value: 'happy, joyful' },
        { label: '興奮', en: 'Excited', value: 'excited, energetic' },
        { label: '生氣', en: 'Angry', value: 'angry, furious' },
        { label: '害羞', en: 'Shy', value: 'shy, blushing' },
        { label: '悲傷', en: 'Sad', value: 'sad, crying, tears' },
        { label: '驚訝', en: 'Surprised', value: 'surprised, shocked' },
        { label: '困惑', en: 'Confused', value: 'confused, question mark' },
        { label: '自信', en: 'Confident', value: 'confident, smug' },
        { label: '誘惑', en: 'Seductive', value: 'seductive, alluring' },
        { label: '冷漠', en: 'Cold', value: 'indifferent, cold' },
        { label: '認真', en: 'Serious', value: 'serious, determined' },
        { label: '調皮', en: 'Playful', value: 'playful, mischievous' },
        { label: '疲憊', en: 'Tired', value: 'tired, exhausted' },
        { label: '病嬌', en: 'Yandere', value: 'yandere, crazy eyes' },
        { label: '傲嬌', en: 'Tsundere', value: 'tsundere, blushing, angry' },
        { label: '無口', en: 'Kuudere', value: 'kuudere, emotionless' },
        { label: '呆萌', en: 'Clumsy', value: 'clumsy, dizzy' },
        { label: '沉思', en: 'Pensive', value: 'thinking, pensive' },
        { label: '睡意', en: 'Sleepy', value: 'sleepy, yawning' },
        { label: '醉酒', en: 'Drunk', value: 'drunk, flushed face' },
        { label: '瘋狂', en: 'Insane', value: 'insane, psychotic' },
        { label: '神聖', en: 'Divine', value: 'divine, serene' },
        { label: '孤獨', en: 'Lonely', value: 'lonely, alone' },
        { label: '懷舊', en: 'Nostalgic', value: 'nostalgic' },
        { label: '浪漫', en: 'Romantic', value: 'romantic, love' },
        { label: '緊張', en: 'Nervous', value: 'nervous, sweating' },
        { label: '放鬆', en: 'Relaxed', value: 'relaxed, chill' }
    ];

    const ANIME_STYLES = [
        { label: '宮崎駿 (吉卜力)', en: 'Hayao Miyazaki', value: 'studio ghibli style, by hayao miyazaki' },
        { label: '新海誠 (風景光影)', en: 'Makoto Shinkai', value: 'by makoto shinkai' },
        { label: '鳥山明 (七龍珠)', en: 'Akira Toriyama', value: 'by akira toriyama, dragon ball style' },
        { label: '尾田榮一郎 (海賊王)', en: 'Eiichiro Oda', value: 'by eiichiro oda, one piece style' },
        { label: '岸本齊史 (火影忍者)', en: 'Masashi Kishimoto', value: 'by masashi kishimoto, naruto style' },
        { label: '久保帶人 (死神)', en: 'Tite Kubo', value: 'by tite kubo, bleach style' },
        { label: '富堅義博 (獵人)', en: 'Yoshihiro Togashi', value: 'by yoshihiro togashi, hunter x hunter style' },
        { label: '井上雄彥 (灌籃高手)', en: 'Takehiko Inoue', value: 'by takehiko inoue, slam dunk style' },
        { label: '三浦建太郎 (烙印勇士)', en: 'Kentaro Miura', value: 'by kentaro miura, berserk style' },
        { label: '伊藤潤二 (恐怖漫畫)', en: 'Junji Ito', value: 'by junji ito, horror manga style' },
        { label: '高橋留美子 (犬夜叉)', en: 'Rumiko Takahashi', value: 'by rumiko takahashi, 90s anime style' },
        { label: 'CLAMP (庫洛魔法使)', en: 'CLAMP', value: 'by clamp, cardcaptor sakura style' },
        { label: '武內直子 (美少女戰士)', en: 'Naoko Takeuchi', value: 'by naoko takeuchi, sailor moon style' },
        { label: '荒木飛呂彥 (JOJO)', en: 'Hirohiko Araki', value: 'by hirohiko araki, jojo style' },
        { label: '村田雄介 (一拳超人)', en: 'Yusuke Murata', value: 'by yusuke murata, one punch man style' },
        { label: '吾峠呼世晴 (鬼滅之刃)', en: 'Koyoharu Gotouge', value: 'by koyoharu gotouge, demon slayer style' },
        { label: '藤本樹 (鏈鋸人)', en: 'Tatsuki Fujimoto', value: 'by tatsuki fujimoto, chainsaw man style' },
        { label: '芥見下下 (咒術迴戰)', en: 'Gege Akutami', value: 'by gege akutami, jujutsu kaisen style' },
        { label: '荒川弘 (鋼之鍊金術師)', en: 'Hiromu Arakawa', value: 'by hiromu arakawa, fullmetal alchemist style' },
        { label: '庵野秀明 (EVA)', en: 'Hideaki Anno', value: 'by hideaki anno, evangelion style' },
        { label: '手塚治虫 (原子小金剛)', en: 'Osamu Tezuka', value: 'by osamu tezuka, astro boy style' },
        { label: '永井豪 (惡魔人)', en: 'Go Nagai', value: 'by go nagai, retro mecha style' },
        { label: '松本零士 (銀河鐵道999)', en: 'Leiji Matsumoto', value: 'by leiji matsumoto, space opera style' },
        { label: '貞本義行 (EVA人設)', en: 'Yoshiyuki Sadamoto', value: 'by yoshiyuki sadamoto, evangelion character design' },
        { label: '桂正和 (電影少女)', en: 'Masakazu Katsura', value: 'by masakazu katsura' },
        { label: '北條司 (城市獵人)', en: 'Tsukasa Hojo', value: 'by tsukasa hojo, city hunter style' },
        { label: '京都動畫 (京阿尼)', en: 'Kyoto Animation', value: 'kyoto animation style' },
        { label: 'Ufotable (飛碟社)', en: 'Ufotable', value: 'ufotable style' }
    ];

    const ART_STYLES = [
        { label: '京都動畫', en: 'Kyoto Anim.', value: '(kyoto animation style:1.3)' },
        { label: '吉卜力', en: 'Ghibli', value: '(studio ghibli style:1.2)' },
        { label: '新海誠', en: 'Shinkai', value: '(shinkai makoto style:1.2)' },
        { label: '厚塗油畫', en: 'Oil Painting', value: '(oil painting style:1.1), thick impasto' },
        { label: '素描手繪', en: 'Sketch', value: 'sketch, monochrome, pencil drawing' },
        { label: '像素藝術', en: 'Pixel Art', value: 'pixel art, 16-bit' },
        { label: '賽博龐克', en: 'Cyberpunk', value: 'cyberpunk style, neon lights' },
        { label: '蒸氣波', en: 'Vaporwave', value: 'vaporwave style, aesthetics' },
        { label: '水彩畫', en: 'Watercolor', value: 'watercolor medium, soft edges' },
        { label: '水墨畫', en: 'Ink Wash', value: 'ink wash painting, sumi-e' },
        { label: '浮世繪', en: 'Ukiyo-e', value: 'ukiyo-e style, woodblock print' },
        { label: '普普藝術', en: 'Pop Art', value: 'pop art style, vibrant colors' },
        { label: '黑色電影', en: 'Film Noir', value: 'film noir style, high contrast, monochrome' },
        { label: '90年代動漫', en: '90s Anime', value: '1990s (style), retro anime' },
        { label: 'Q版角色', en: 'Chibi', value: 'chibi, super deformed' },
        { label: '寫實風格', en: 'Realistic', value: 'realistic, photorealistic' },
        { label: '半寫實', en: 'Semi-Real', value: 'semi-realistic' },
        { label: '3D 渲染', en: '3D Render', value: '3d render, blender, unreal engine' },
        { label: '黏土動畫', en: 'Claymation', value: 'claymation style' },
        { label: '剪紙藝術', en: 'Papercut', value: 'papercut art, layered paper' },
        { label: '彩繪玻璃', en: 'Stained Glass', value: 'stained glass style' },
        { label: '塗鴉', en: 'Graffiti', value: 'graffiti style, street art' },
        { label: '黑白漫畫', en: 'B&W Manga', value: 'manga style, monochrome' },
        { label: '韓漫條漫', en: 'Webtoon', value: 'webtoon style, full color' },
        { label: '恐怖風格', en: 'Horror', value: 'horror theme, dark atmosphere' },
        { label: '哥德風', en: 'Gothic', value: 'gothic style, dark and elegant' },
        { label: '粉彩哥德', en: 'Pastel Goth', value: 'pastel goth style' },
        { label: '蒸氣龐克', en: 'Steampunk', value: 'steampunk style, gears and brass' }
    ];

    const ARTISTS = [
        { label: 'Greg Rutkowski', en: 'Greg Rutkowski', value: 'by greg rutkowski' },
        { label: 'Alphonse Mucha', en: 'Alphonse Mucha', value: 'by alphonse mucha' },
        { label: 'Wlop', en: 'Wlop', value: 'by wlop' },
        { label: 'Artgerm', en: 'Artgerm', value: 'by artgerm' },
        { label: 'Ilya Kuvshinov', en: 'Ilya Kuvshinov', value: 'by ilya kuvshinov' },
        { label: 'Rossdraws', en: 'Rossdraws', value: 'by rossdraws' },
        { label: 'Krenz Cushart', en: 'Krenz Cushart', value: 'by krenz cushart' },
        { label: 'Hyung-tae Kim', en: 'Hyung-tae Kim', value: 'by hyung-tae kim' },
        { label: 'Yoshitaka Amano', en: 'Yoshitaka Amano', value: 'by yoshitaka amano' },
        { label: 'James Jean', en: 'James Jean', value: 'by james jean' },
        { label: 'Ruan Jia', en: 'Ruan Jia', value: 'by ruan jia' },
        { label: 'Range Murata', en: 'Range Murata', value: 'by range murata' },
        { label: 'Tiv', en: 'Tiv', value: 'by tiv' },
        { label: 'Kantoku', en: 'Kantoku', value: 'by kantoku' },
        { label: 'Mika Pikazo', en: 'Mika Pikazo', value: 'by mika pikazo' }
    ];

    const QUALITY_TAGS = [
        { label: '傑作', en: 'Masterpiece', value: 'masterpiece' },
        { label: '最佳畫質', en: 'Best Quality', value: 'best quality' },
        { label: '高解析度', en: 'Highres', value: 'highres' },
        { label: '8K', en: '8K', value: '8k' },
        { label: '4K', en: '4K', value: '4k' },
        { label: 'HDR', en: 'HDR', value: 'hdr' },
        { label: 'RAW 照片', en: 'Raw Photo', value: 'raw photo' },
        { label: '超精細', en: 'Ultra Detailed', value: 'ultra detailed' },
        { label: '極致細節', en: 'Extremely Detailed', value: 'extremely detailed' }
    ];

    const SCENES = [
        { label: '櫻花校園', en: 'Cherry Blossom School', value: 'cherry blossom, school, sunset' },
        { label: '夢幻星空', en: 'Starry Night', value: 'starry night, galaxy, dreamlike' },
        { label: '午後教室', en: 'Classroom', value: 'classroom, afternoon sun, window' },
        { label: '繁華都市', en: 'City Night', value: 'city street, neon lights, night' },
        { label: '奇幻森林', en: 'Magic Forest', value: 'magical forest, glowing plants' },
        { label: '海邊夕陽', en: 'Beach Sunset', value: 'beach, ocean, sunset' },
        { label: '臥室', en: 'Bedroom', value: 'bedroom, indoor' },
        { label: '圖書館', en: 'Library', value: 'library, books' },
        { label: '咖啡廳', en: 'Cafe', value: 'cafe, coffee shop' },
        { label: '學校頂樓', en: 'School Rooftop', value: 'school rooftop, cloudy sky' },
        { label: '神社', en: 'Shrine', value: 'shinto shrine, traditional' },
        { label: '賽博城市', en: 'Cyberpunk City', value: 'cyberpunk city, skyscrapers' },
        { label: '太空站', en: 'Space Station', value: 'space station, sci-fi' },
        { label: '水下世界', en: 'Underwater', value: 'underwater, coral reef' },
        { label: '沙漠', en: 'Desert', value: 'desert, dunes' },
        { label: '雪山', en: 'Snowy Mountain', value: 'snowy mountain, winter' },
        { label: '花海', en: 'Flower Field', value: 'flower field, spring' },
        { label: '城堡', en: 'Castle', value: 'castle, fantasy' },
        { label: '地下城', en: 'Dungeon', value: 'dungeon, dark' },
        { label: '實驗室', en: 'Laboratory', value: 'laboratory, science' },
        { label: '末日廢墟', en: 'Ruins', value: 'post-apocalyptic ruins' },
        { label: '溫泉', en: 'Hot Spring', value: 'onsen, hot spring' },
        { label: '夏日祭典', en: 'Summer Festival', value: 'summer festival, fireworks' },
        { label: '雨中', en: 'Rain', value: 'rain, umbrella, wet street' },
        { label: '黃金時刻', en: 'Golden Hour', value: 'golden hour, warm lighting' },
        { label: '抽象異界', en: 'Abstract', value: 'abstract dimension, colorful' }
    ];

    const WEATHER = [
        { label: '晴天', en: 'Sunny', value: 'sunny, clear sky' },
        { label: '多雲', en: 'Cloudy', value: 'cloudy' },
        { label: '雨天', en: 'Rain', value: 'raining, wet' },
        { label: '暴雨', en: 'Storm', value: 'heavy rain, storm' },
        { label: '雪天', en: 'Snow', value: 'snowing, winter' },
        { label: '霧氣', en: 'Foggy', value: 'foggy, mist' },
        { label: '風', en: 'Windy', value: 'windy, blowing wind' },
        { label: '雷電', en: 'Lightning', value: 'lightning, thunder' },
        { label: '彩虹', en: 'Rainbow', value: 'rainbow' },
        { label: '極光', en: 'Aurora', value: 'aurora borealis' },
        { label: '流星雨', en: 'Meteor Shower', value: 'meteor shower' },
        { label: '黃昏', en: 'Dusk', value: 'dusk, sunset' },
        { label: '黎明', en: 'Dawn', value: 'dawn, sunrise' },
        { label: '深夜', en: 'Midnight', value: 'midnight, moon' },
        { label: '正午', en: 'Noon', value: 'noon, harsh shadows' },
        { label: '日落', en: 'Sunset', value: 'sunset, golden hour' },
        { label: '藍色時刻', en: 'Blue Hour', value: 'blue hour' }
    ];

    const LIGHTING = [
        { label: '自然光', en: 'Natural', value: 'natural light' },
        { label: '電影光效', en: 'Cinematic', value: 'cinematic lighting', image: 'assets/previews/lighting_cinematic.png' },
        { label: '柔光', en: 'Soft', value: 'soft lighting' },
        { label: '硬光', en: 'Hard', value: 'hard lighting' },
        { label: '體積光', en: 'Volumetric', value: 'volumetric lighting' },
        { label: '倫勃朗光', en: 'Rembrandt', value: 'rembrandt lighting', image: 'assets/previews/lighting_rembrandt.png' },
        { label: '邊緣光', en: 'Rim', value: 'rim lighting' },
        { label: '逆光', en: 'Backlight', value: 'backlighting' },
        { label: '黃金時刻', en: 'Golden Hour', value: 'golden hour', image: 'assets/previews/lighting_golden_hour.png' },
        { label: '藍色時刻', en: 'Blue Hour', value: 'blue hour', image: 'assets/previews/lighting_blue_hour.png' },
        { label: '賽博龐克光', en: 'Cyberpunk', value: 'cyberpunk lighting' },
        { label: '霓虹燈', en: 'Neon', value: 'neon lights' },
        { label: '發光', en: 'Glow', value: 'glow' },
        { label: '生物發光', en: 'Bioluminescence', value: 'bioluminescence' }
    ];

    const CAMERA_ANGLES = [
        { label: '平視', en: 'Eye Level', value: 'eye level' },
        { label: '俯視', en: 'High Angle', value: 'from above, high angle' },
        { label: '仰視', en: 'Low Angle', value: 'from below, low angle' },
        { label: '側面', en: 'Profile', value: 'from side, profile' },
        { label: '背影', en: 'Back View', value: 'from behind, back view' },
        { label: '第一人稱', en: 'POV', value: 'pov' },
        { label: '自拍', en: 'Selfie', value: 'selfie, phone camera' },
        { label: '大特寫', en: 'Extreme Close-up', value: 'extreme close-up' },
        { label: '臉部特寫', en: 'Face Close-up', value: 'face focus, close-up' },
        { label: '半身像', en: 'Upper Body', value: 'upper body, cowboy shot' },
        { label: '全身像', en: 'Full Body', value: 'full body, wide shot' },
        { label: '廣角', en: 'Wide Angle', value: 'wide angle, fisheye' },
        { label: '微距', en: 'Macro', value: 'macro shot' },
        { label: '荷蘭式傾斜', en: 'Dutch Angle', value: 'dutch angle, tilted' },
        { label: '過肩鏡頭', en: 'Over Shoulder', value: 'over the shoulder' },
        { label: '動態視角', en: 'Dynamic', value: 'dynamic angle' },
        { label: '鳥瞰圖', en: "Bird's Eye", value: "bird's eye view" },
        { label: '蟲視圖', en: "Worm's Eye", value: "worm's eye view" },
        { label: '全景', en: 'Panorama', value: 'panorama' },
        { label: '電影鏡頭', en: 'Cinematic', value: 'cinematic angle' }
    ];

    const SHOT_SIZES = [
        { label: '極遠景', en: 'Extreme Long', value: 'extreme long shot' },
        { label: '遠景', en: 'Long Shot', value: 'long shot' },
        { label: '全身鏡頭', en: 'Full Shot', value: 'full shot' },
        { label: '中遠景', en: 'Medium Wide', value: 'medium wide shot' },
        { label: '牛仔鏡頭', en: 'Cowboy Shot', value: 'cowboy shot' },
        { label: '中近景', en: 'Medium Close-up', value: 'medium close-up shot' },
        { label: '特寫鏡頭', en: 'Close-up', value: 'close-up' },
        { label: '極特寫鏡頭', en: 'Extreme Close-up', value: 'extreme close-up' }
    ];

    const FOCAL_LENGTHS = [
        { label: '超廣角', en: 'Ultra Wide', value: 'ultra wide angle' },
        { label: '廣角', en: 'Wide Angle', value: 'wide angle' },
        { label: '半廣角', en: 'Semi-Wide', value: 'semi-wide angle' },
        { label: '標準鏡', en: 'Standard', value: 'standard lens' },
        { label: '中望遠', en: 'Medium Tele', value: 'medium telephoto' },
        { label: '望遠', en: 'Telephoto', value: 'telephoto' },
        { label: '超望遠', en: 'Super Tele', value: 'super telephoto' }
    ];

    const APERTURES = [
        { label: '小光圈', en: 'Small (f/16)', value: 'small aperture, f/16, deep depth of field' },
        { label: '中光圈', en: 'Medium (f/8)', value: 'medium aperture, f/8' },
        { label: '大光圈', en: 'Large (f/1.8)', value: 'large aperture, f/1.8, shallow depth of field, bokeh' }
    ];

    const LENS_EFFECTS = [
        { label: '景深', en: 'Depth of Field', value: 'depth of field, bokeh' },
        { label: '動態模糊', en: 'Motion Blur', value: 'motion blur' },
        { label: '鏡頭光暈', en: 'Lens Flare', value: 'lens flare' },
        { label: '色差', en: 'Chromatic Ab.', value: 'chromatic aberration' },
        { label: '暗角', en: 'Vignette', value: 'vignette' },
        { label: '膠卷顆粒', en: 'Film Grain', value: 'film grain' },
        { label: '柔焦', en: 'Soft Focus', value: 'soft focus' },
        { label: '銳利化', en: 'Sharp Focus', value: 'sharp focus' },
        { label: '過曝', en: 'Overexposure', value: 'overexposure' },
        { label: '低曝', en: 'Underexposure', value: 'underexposure' },
        { label: '高對比', en: 'High Contrast', value: 'high contrast' },
        { label: '低對比', en: 'Low Contrast', value: 'low contrast' },
        { label: '飽和', en: 'Saturated', value: 'saturated' },
        { label: '去飽和', en: 'Desaturated', value: 'desaturated, muted colors' },
        { label: 'HDR', en: 'HDR', value: 'hdr, hyperrealistic' },
        { label: '魚眼', en: 'Fisheye', value: 'fisheye lens' },
        { label: '廣角', en: 'Wide Lens', value: 'wide angle lens' },
        { label: '長焦', en: 'Telephoto', value: 'telephoto lens' },
        { label: '移軸', en: 'Tilt-Shift', value: 'tilt-shift' },
        { label: '拍立得', en: 'Polaroid', value: 'polaroid' }
    ];

    // Body types — Female
    const BODY_TYPES_FEMALE = [
        { label: '巨乳', en: 'Large Breasts', value: 'large breasts' },
        { label: '貧乳', en: 'Flat Chest', value: 'flat chest' },
        { label: '沙漏型', en: 'Hourglass', value: 'hourglass figure' },
        { label: '曲線', en: 'Curvy', value: 'curvy body' },
        { label: '豐滿', en: 'Voluptuous', value: 'voluptuous body' },
        { label: '嬌小', en: 'Petite', value: 'petite body' },
        { label: '苗條', en: 'Slim', value: 'slim body' },
        { label: '纖細', en: 'Slender', value: 'slender body' },
        { label: '蘿莉體型', en: 'Loli', value: 'loli body, small body' },
        { label: '少女體型', en: 'Young Girl', value: 'young girl body' },
        { label: '成熟體型', en: 'Mature', value: 'mature body' },
        { label: '窄腰', en: 'Narrow Waist', value: 'narrow waist' },
        { label: '長腿', en: 'Long Legs', value: 'long legs' },
        { label: '梨形', en: 'Pear-shaped', value: 'pear-shaped body' },
        { label: '翹臀', en: 'Wide Hips', value: 'wide hips' },
        { label: '細腰', en: 'Thin Waist', value: 'thin waist, waist' },
        { label: '美腿', en: 'Beautiful Legs', value: 'beautiful legs, thighs' },
        { label: '鎖骨線', en: 'Collarbone', value: 'visible collarbone' },
        { label: '小蠻腰', en: 'Tiny Waist', value: 'tiny waist' },
        { label: '柔軟', en: 'Soft Body', value: 'soft body' },
        { label: '豐胸細腰', en: 'Busty Slim', value: 'large breasts, slim waist' },
        { label: '標準', en: 'Average', value: 'average body' },
        { label: '高挑', en: 'Tall', value: 'tall body' },
        { label: '運動型', en: 'Athletic', value: 'athletic body' },
        { label: '健美', en: 'Fit', value: 'fit body' },
        { label: '結實', en: 'Toned', value: 'toned body' },
        { label: '修長', en: 'Lean', value: 'lean body' },
        { label: '纖腰', en: 'Willowy', value: 'willowy body, slender waist' },
        { label: '勻稱', en: 'Proportioned', value: 'well-proportioned body' },
        { label: '性感', en: 'Sexy', value: 'sexy body' },
        { label: '優雅', en: 'Elegant', value: 'elegant body, graceful' },
        { label: '嬰兒肥', en: 'Baby Fat', value: 'baby fat, youthful' },
        { label: '厚實', en: 'Thick', value: 'thick body, thick thighs' },
        { label: '纖瘦', en: 'Skinny', value: 'skinny body' },
        { label: '小巧', en: 'Tiny', value: 'tiny body, small frame' },
        { label: '微胖', en: 'Chubby', value: 'chubby body' },
        { label: '圓潤', en: 'Round', value: 'round body' },
        { label: '矮小', en: 'Short', value: 'short body' },
        { label: '圓臉', en: 'Round Face', value: 'round face, chubby cheeks' }
    ];

    // Body types — Male
    const BODY_TYPES_MALE = [
        { label: '肌肉', en: 'Muscular', value: 'muscular body' },
        { label: '精壯', en: 'Ripped', value: 'ripped body' },
        { label: '壯碩', en: 'Buff', value: 'buff body' },
        { label: '倒三角', en: 'V-shaped', value: 'v-shaped body' },
        { label: '寬肩', en: 'Broad Shoulders', value: 'broad shoulders' },
        { label: '正太體型', en: 'Shota', value: 'shota body, small boy body' },
        { label: '魁梧', en: 'Brawny', value: 'brawny body, powerful build' },
        { label: '健壯', en: 'Sturdy', value: 'sturdy body' },
        { label: '高大', en: 'Large', value: 'large body' },
        { label: '標準', en: 'Average', value: 'average body' },
        { label: '高挑', en: 'Tall', value: 'tall body' },
        { label: '運動型', en: 'Athletic', value: 'athletic body' },
        { label: '健美', en: 'Fit', value: 'fit body' },
        { label: '結實', en: 'Toned', value: 'toned body' },
        { label: '修長', en: 'Lean', value: 'lean body' },
        { label: '苗條', en: 'Slim', value: 'slim body' },
        { label: '纖細', en: 'Slender', value: 'slender body' },
        { label: '勻稱', en: 'Proportioned', value: 'well-proportioned body' },
        { label: '嬌小', en: 'Petite', value: 'petite body' },
        { label: '微胖', en: 'Chubby', value: 'chubby body' },
        { label: '豐腴', en: 'Plump', value: 'plump body' },
        { label: '圓潤', en: 'Round', value: 'round body' },
        { label: '纖瘦', en: 'Skinny', value: 'skinny body' },
        { label: '瘦高', en: 'Lanky', value: 'lanky body, tall and thin' },
        { label: '矮小', en: 'Short', value: 'short body' },
        { label: '嬰兒肥', en: 'Baby Fat', value: 'baby fat, youthful' }
    ];

    // Section definitions per tab
    const TAB_SECTIONS = {
        base: [
            { id: 'gender', title: { zh: '性別', en: 'Gender' }, type: 'gender' },
            { id: 'race', title: { zh: '種族', en: 'Race' }, data: RACES, count: 20 },
            { id: 'age', title: { zh: '年齡', en: 'Age' }, type: 'ageSlider' },
            { id: 'job', title: { zh: '職業', en: 'Job / Class' }, data: JOBS, count: 30 },
            { id: 'hairstyle', title: { zh: '髮型', en: 'Hairstyle' }, data: null, count: 30, genderDependent: true },
            { id: 'bodyType', title: { zh: '身材', en: 'Body Type' }, data: null, count: 40, genderDependent: true }
        ],
        appearance: [
            { id: 'hairColor', title: { zh: '髮色', en: 'Hair Color' }, data: HAIR_COLORS, type: 'color' },
            { id: 'eyeColorLeft', title: { zh: '左眼色', en: 'Left Eye' }, data: EYE_COLORS, type: 'eyeColor' },
            { id: 'eyeColorRight', title: { zh: '右眼色', en: 'Right Eye' }, data: EYE_COLORS, type: 'eyeColor' },
            { id: 'outfit', title: { zh: '服裝', en: 'Outfit' }, data: OUTFITS, count: 31 }
        ],
        action: [
            { id: 'expression', title: { zh: '表情', en: 'Expression' }, data: EXPRESSIONS },
            { id: 'mood', title: { zh: '心情', en: 'Mood' }, data: MOODS, count: 28 }
        ],
        style: [
            { id: 'animeStyle', title: { zh: '動漫風格', en: 'Anime Style' }, data: ANIME_STYLES, count: 28 },
            { id: 'artStyle', title: { zh: '藝術風格', en: 'Art Style' }, data: ART_STYLES, count: 28 },
            { id: 'artist', title: { zh: '藝術家', en: 'Artist' }, data: ARTISTS },
            { id: 'quality', title: { zh: '畫質', en: 'Quality' }, data: QUALITY_TAGS }
        ],
        environment: [
            { id: 'scene', title: { zh: '場景', en: 'Scene' }, data: SCENES, count: 26 },
            { id: 'weather', title: { zh: '時間 & 天氣', en: 'Time & Weather' }, data: WEATHER },
            { id: 'lighting', title: { zh: '光影', en: 'Lighting' }, data: LIGHTING }
        ],
        camera: [
            { id: 'cameraAngle', title: { zh: '角度', en: 'Angle' }, data: CAMERA_ANGLES, count: 20 },
            { id: 'shotSize', title: { zh: '鏡頭', en: 'Shot Size' }, data: SHOT_SIZES },
            { id: 'focalLength', title: { zh: '焦段', en: 'Focal Length' }, data: FOCAL_LENGTHS },
            { id: 'aperture', title: { zh: '光圈', en: 'Aperture' }, data: APERTURES },
            { id: 'lensEffect', title: { zh: '鏡頭效果', en: 'Lens Effect' }, data: LENS_EFFECTS, count: 20 }
        ]
    };

    // Legacy compat: promptData is no longer used for rendering; kept empty for backward compat
    const promptData = {};

    // --- State ---
    const state = {
        activeTab: 'base',
        gender: 'female',
        age: 21,
        selections: {},  // { sectionId: value }
        customInputs: {},  // { sectionId: customText }
        customInputVisible: {},  // { sectionId: bool }
        customFields: [],
        lang: 'zh',
        format: 'yaml',
        isPreviewLocked: false,
        highQuality: true
    };

    // All section IDs for iteration
    const ALL_SECTION_IDS = [];
    Object.values(TAB_SECTIONS).forEach(sections => {
        sections.forEach(s => ALL_SECTION_IDS.push(s.id));
    });

    // --- Elements ---
    const categoriesContainer = document.getElementById('categories-container');
    const customFieldsContainer = document.getElementById('custom-fields-container');
    const btnAddCustom = document.getElementById('btn-add-custom');
    const inputSubject = document.getElementById('input-subject');

    const inputNegative = document.getElementById('negative-prompt');
    const outputFinal = document.getElementById('final-prompt');
    const outputNegative = document.getElementById('final-negative');
    const btnReset = document.getElementById('btn-reset');
    const langRadios = document.getElementsByName('lang');
    const formatRadios = document.getElementsByName('format');
    const btnCopy = document.getElementById('btn-copy');

    // Preview elements
    const previewPlaceholder = document.getElementById('preview-placeholder');
    const previewContent = document.getElementById('preview-content');
    const previewImageBox = document.getElementById('preview-image-box');
    const previewLabel = document.getElementById('preview-label');

    // --- Persistence ---
    function saveState() {
        const stateToSave = {
            ...state,
            inputSubject: inputSubject.value,

            inputNegative: inputNegative.value
        };
        localStorage.setItem('promptGenState', JSON.stringify(stateToSave));
    }

    function loadState() {
        const saved = localStorage.getItem('promptGenState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state.activeTab = parsed.activeTab || 'base';
                state.gender = parsed.gender || 'female';
                state.age = parsed.age || 21;
                state.selections = parsed.selections || {};
                state.customInputs = parsed.customInputs || {};
                state.customInputVisible = parsed.customInputVisible || {};
                state.customFields = parsed.customFields || [];
                state.lang = parsed.lang || 'zh';
                state.format = parsed.format || 'yaml';
                state.highQuality = parsed.highQuality !== false;

                inputSubject.value = parsed.inputSubject || '做一張全新的圖';

                inputNegative.value = parsed.inputNegative || '';

                const langRadio = document.querySelector(`input[name="lang"][value="${state.lang}"]`);
                if (langRadio) langRadio.checked = true;

                const formatRadio = document.querySelector(`input[name="format"][value="${state.format}"]`);
                if (formatRadio) formatRadio.checked = true;
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }

    // --- Tab Rendering ---
    function renderTabs() {
        const tabBar = document.getElementById('tab-bar');
        if (!tabBar) return;
        tabBar.innerHTML = '';
        TABS.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = `tab-btn${state.activeTab === tab.id ? ' active' : ''}`;
            btn.dataset.tab = tab.id;
            btn.innerHTML = `<i class="${tab.icon}"></i> ${state.lang === 'zh' ? tab.label : tab.en}`;
            btn.addEventListener('click', () => {
                state.activeTab = tab.id;
                renderTabs();
                renderTabContent();
                saveState();
            });
            tabBar.appendChild(btn);
        });
    }

    function getOptionLabel(option) {
        return state.lang === 'zh' ? option.label : (option.en || option.label);
    }

    function renderTabContent() {
        const tabContent = document.getElementById('tab-content');
        if (!tabContent) return;
        tabContent.innerHTML = '';

        const sections = TAB_SECTIONS[state.activeTab];
        if (!sections) return;

        sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'section-block';

            // Section header with title + custom button
            const header = document.createElement('div');
            header.className = 'section-header';

            const titleEl = document.createElement('h4');
            titleEl.className = 'section-block-title';
            titleEl.textContent = state.lang === 'zh' ? section.title.zh : section.title.en;
            header.appendChild(titleEl);

            // Custom button (skip for gender and age sections)
            if (section.type !== 'gender' && section.type !== 'ageSlider') {
                const customBtn = document.createElement('button');
                customBtn.className = `btn-custom-toggle${state.customInputVisible[section.id] ? ' active' : ''}`;
                customBtn.innerHTML = '<i class="fa-solid fa-pen"></i> ' + (state.lang === 'zh' ? '自訂' : 'Custom');
                customBtn.addEventListener('click', () => {
                    state.customInputVisible[section.id] = !state.customInputVisible[section.id];
                    renderTabContent();
                    saveState();
                });
                header.appendChild(customBtn);
            }

            sectionEl.appendChild(header);

            // === Gender Section ===
            if (section.type === 'gender') {
                const genderToggle = document.createElement('div');
                genderToggle.className = 'gender-toggle gender-toggle-main';
                ['female', 'male'].forEach(g => {
                    const btn = document.createElement('button');
                    btn.className = `gender-btn${state.gender === g ? ' active' : ''}`;
                    btn.textContent = g === 'female'
                        ? (state.lang === 'zh' ? '♀ 女性' : '♀ Female')
                        : (state.lang === 'zh' ? '♂ 男性' : '♂ Male');
                    btn.addEventListener('click', () => {
                        state.gender = g;
                        delete state.selections['hairstyle'];
                        delete state.selections['bodyType'];
                        renderTabContent();
                        generatePrompt();
                        saveState();
                    });
                    genderToggle.appendChild(btn);
                });
                sectionEl.appendChild(genderToggle);
                tabContent.appendChild(sectionEl);
                return; // Skip custom input for gender
            }

            // === Age Slider Section ===
            if (section.type === 'ageSlider') {
                const sliderWrap = document.createElement('div');
                sliderWrap.className = 'age-slider-wrap';

                const ageDisplay = document.createElement('div');
                ageDisplay.className = 'age-display';
                ageDisplay.innerHTML = `<span class="age-number">${state.age}</span><span class="age-unit">${state.lang === 'zh' ? '歲' : 'yrs'}</span>`;

                const sliderContainer = document.createElement('div');
                sliderContainer.className = 'slider-container';

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.className = 'age-slider';
                slider.min = '1';
                slider.max = '100';
                slider.value = state.age;
                slider.style.setProperty('--val', ((state.age - 1) / 99 * 100) + '%');

                const minLabel = document.createElement('span');
                minLabel.className = 'slider-label';
                minLabel.textContent = '1';
                const maxLabel = document.createElement('span');
                maxLabel.className = 'slider-label';
                maxLabel.textContent = '100';

                // Audio context for age slider sound
                let sliderAudioCtx = null;

                slider.addEventListener('input', (e) => {
                    state.age = parseInt(e.target.value);
                    ageDisplay.innerHTML = `<span class="age-number">${state.age}</span><span class="age-unit">${state.lang === 'zh' ? '歲' : 'yrs'}</span>`;
                    slider.style.setProperty('--val', ((state.age - 1) / 99 * 100) + '%');

                    // Play pitch-varying tone
                    try {
                        if (!sliderAudioCtx) sliderAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = sliderAudioCtx.createOscillator();
                        const gain = sliderAudioCtx.createGain();
                        osc.connect(gain);
                        gain.connect(sliderAudioCtx.destination);
                        // Map age 1-100 to freq 200Hz-1200Hz
                        const freq = 200 + ((state.age - 1) / 99) * 1000;
                        osc.frequency.value = freq;
                        osc.type = 'sine';
                        gain.gain.value = 0.08; // Subtle volume
                        osc.start();
                        gain.gain.exponentialRampToValueAtTime(0.001, sliderAudioCtx.currentTime + 0.08);
                        osc.stop(sliderAudioCtx.currentTime + 0.1);
                    } catch (err) { /* Audio not supported */ }

                    generatePrompt();
                    saveState();
                });

                sliderContainer.appendChild(minLabel);
                sliderContainer.appendChild(slider);
                sliderContainer.appendChild(maxLabel);
                sliderWrap.appendChild(ageDisplay);
                sliderWrap.appendChild(sliderContainer);
                sectionEl.appendChild(sliderWrap);
                tabContent.appendChild(sectionEl);
                return; // Skip custom input for age
            }

            // genderDependent sections: no toggle needed here, follows top-level gender

            // Determine data source
            let data = section.data;
            if (section.genderDependent) {
                if (section.id === 'hairstyle') {
                    data = state.gender === 'female' ? HAIRSTYLES_FEMALE : HAIRSTYLES_MALE;
                } else if (section.id === 'bodyType') {
                    data = state.gender === 'female' ? BODY_TYPES_FEMALE : BODY_TYPES_MALE;
                }
            }

            // Render options based on type
            if (section.type === 'color') {
                renderColorSwatches(sectionEl, section, data);
            } else if (section.type === 'eyeColor') {
                renderEyeColors(sectionEl, section, data);
            } else {
                renderTagGrid(sectionEl, section, data);
            }

            // Custom input field (shown when toggled)
            if (state.customInputVisible[section.id]) {
                const customRow = document.createElement('div');
                customRow.className = 'custom-input-row';
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'custom-section-input';
                input.placeholder = state.lang === 'zh' ? '輸入自訂值...' : 'Enter custom value...';
                input.value = state.customInputs[section.id] || '';
                input.addEventListener('input', (e) => {
                    state.customInputs[section.id] = e.target.value.trim();
                    generatePrompt();
                });
                customRow.appendChild(input);

                // Clear custom button
                const clearBtn = document.createElement('button');
                clearBtn.className = 'btn-clear-custom';
                clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                clearBtn.addEventListener('click', () => {
                    state.customInputs[section.id] = '';
                    state.customInputVisible[section.id] = false;
                    renderTabContent();
                    generatePrompt();
                });
                customRow.appendChild(clearBtn);
                sectionEl.appendChild(customRow);
            }

            tabContent.appendChild(sectionEl);
        });
    }

    function renderTagGrid(container, section, data) {
        const grid = document.createElement('div');
        grid.className = 'tag-grid';

        data.forEach(option => {
            const chip = document.createElement('div');
            chip.className = `tag-chip${state.selections[section.id] === option.value ? ' active' : ''}`;
            chip.dataset.section = section.id;
            chip.dataset.value = option.value;
            if (option.image) chip.dataset.image = option.image;
            chip.textContent = getOptionLabel(option);

            chip.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
            });

            // Preview hover
            if (option.image) {
                chip.addEventListener('mouseenter', () => {
                    showPreview(option.image, getOptionLabel(option));
                });
                chip.addEventListener('mouseleave', () => {
                    updateLockedPreview();
                });
            }

            grid.appendChild(chip);
        });

        container.appendChild(grid);
    }

    function renderColorSwatches(container, section, data) {
        const grid = document.createElement('div');
        grid.className = 'color-swatch-grid';

        data.forEach(option => {
            const swatch = document.createElement('button');
            swatch.className = `color-swatch${state.selections[section.id] === option.value ? ' active' : ''}`;
            swatch.title = getOptionLabel(option);
            swatch.dataset.section = section.id;
            swatch.dataset.value = option.value;

            const colorCircle = document.createElement('span');
            colorCircle.className = 'swatch-circle';
            if (option.color.startsWith('linear')) {
                colorCircle.style.background = option.color;
            } else {
                colorCircle.style.backgroundColor = option.color;
            }
            swatch.appendChild(colorCircle);

            const label = document.createElement('span');
            label.className = 'swatch-label';
            label.textContent = getOptionLabel(option);
            swatch.appendChild(label);

            swatch.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
            });

            grid.appendChild(swatch);
        });

        container.appendChild(grid);
    }

    function renderEyeColors(container, section, data) {
        const grid = document.createElement('div');
        grid.className = 'eye-color-grid';

        data.forEach(option => {
            const btn = document.createElement('button');
            btn.className = `eye-color-btn${state.selections[section.id] === option.value ? ' active' : ''}`;
            btn.title = getOptionLabel(option);

            const circle = document.createElement('span');
            circle.className = 'eye-circle';
            if (option.color.startsWith('linear')) {
                circle.style.background = option.color;
            } else {
                circle.style.backgroundColor = option.color;
            }
            btn.appendChild(circle);

            const label = document.createElement('span');
            label.className = 'eye-label';
            label.textContent = getOptionLabel(option);
            btn.appendChild(label);

            btn.addEventListener('click', () => {
                selectOption(section.id, option.value, option);
            });

            grid.appendChild(btn);
        });

        container.appendChild(grid);
    }

    // --- Single Select ---
    function selectOption(sectionId, value, option) {
        // Toggle: if already selected, deselect
        if (state.selections[sectionId] === value) {
            delete state.selections[sectionId];
        } else {
            state.selections[sectionId] = value;
        }

        renderTabContent();
        updateLockedPreview();
        generatePrompt();
    }

    // --- Custom Fields ---
    function renderCustomFields() {
        customFieldsContainer.innerHTML = '';
        state.customFields.forEach((field, index) => {
            const row = document.createElement('div');
            row.className = 'custom-field-row';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'custom-field-checkbox';
            checkbox.checked = field.enabled !== false;
            checkbox.addEventListener('change', (e) => {
                state.customFields[index].enabled = e.target.checked;
                generatePrompt();
            });

            const keyInput = document.createElement('input');
            keyInput.type = 'text';
            keyInput.placeholder = 'Key';
            keyInput.value = field.key;
            keyInput.addEventListener('input', (e) => {
                state.customFields[index].key = e.target.value;
                generatePrompt();
            });

            const valInput = document.createElement('input');
            valInput.type = 'text';
            valInput.placeholder = 'Value';
            valInput.value = field.value;
            valInput.addEventListener('input', (e) => {
                state.customFields[index].value = e.target.value;
                generatePrompt();
            });

            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-delete';
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            delBtn.addEventListener('click', () => {
                state.customFields.splice(index, 1);
                renderCustomFields();
                generatePrompt();
            });

            row.appendChild(checkbox);
            row.appendChild(keyInput);
            row.appendChild(valInput);
            row.appendChild(delBtn);
            customFieldsContainer.appendChild(row);
        });
    }

    // --- Prompt Generation ---
    function generatePromptPlain() {
        const parts = [];

        if (inputSubject.value.trim()) parts.push(inputSubject.value.trim());
        // Gender
        parts.push(state.gender === 'female' ? 'female' : 'male');


        // Age
        if (state.age) parts.push(`${state.age} years old`);

        // Generate order based on tabs
        const sectionOrder = ['race', 'job', 'hairstyle', 'bodyType', 'hairColor', 'eyeColorLeft', 'eyeColorRight',
            'outfit', 'expression', 'mood', 'animeStyle', 'artStyle', 'artist', 'quality',
            'scene', 'weather', 'lighting', 'cameraAngle', 'shotSize', 'focalLength', 'aperture', 'lensEffect'];

        sectionOrder.forEach(secId => {
            const val = state.selections[secId];
            if (val) {
                // Handle eye colors specially
                if (secId === 'eyeColorLeft') {
                    const rightEye = state.selections['eyeColorRight'];
                    if (rightEye && rightEye !== val) {
                        parts.push(`${val} left eye, ${rightEye} right eye`);
                        return; // Skip right eye in normal flow
                    } else {
                        parts.push(`${val} eyes`);
                        return;
                    }
                }
                if (secId === 'eyeColorRight') {
                    // Already handled by left eye
                    const leftEye = state.selections['eyeColorLeft'];
                    if (leftEye) return; // Already emitted
                    parts.push(`${val} eyes`);
                    return;
                }
                parts.push(val);
            }

            // Custom input
            const custom = state.customInputs[secId];
            if (custom) {
                parts.push(custom);
            }
        });

        // Quality tags
        if (state.highQuality) {
            const hasQuality = state.selections['quality'];
            if (!hasQuality) {
                parts.push('masterpiece, best quality');
            }
        }

        // Custom Fields
        state.customFields.forEach(field => {
            if (field.enabled !== false && field.key && field.value) {
                parts.push(field.value);
            }
        });

        return parts.join(', ');
    }

    function generatePromptYAML() {
        let yaml = '';

        yaml += `gender: ${state.gender === 'female' ? 'female' : 'male'}\n`;

        if (inputSubject.value.trim()) yaml += `subject: ${inputSubject.value.trim()}\n`;

        if (state.age) yaml += `age: ${state.age} years old\n`;

        const yamlMap = {
            'race': 'race', 'job': 'job', 'hairstyle': 'hairstyle', 'bodyType': 'body_type',
            'hairColor': 'hair_color',
            'eyeColorLeft': 'left_eye', 'eyeColorRight': 'right_eye', 'outfit': 'outfit',
            'expression': 'expression', 'mood': 'mood', 'animeStyle': 'anime_style',
            'artStyle': 'art_style', 'artist': 'artist', 'quality': 'quality',
            'scene': 'scene', 'weather': 'weather', 'lighting': 'lighting',
            'cameraAngle': 'camera_angle', 'shotSize': 'shot_size', 'focalLength': 'focal_length',
            'aperture': 'aperture', 'lensEffect': 'lens_effect'
        };

        Object.keys(yamlMap).forEach(secId => {
            const parts = [];
            if (state.selections[secId]) parts.push(state.selections[secId]);
            if (state.customInputs[secId]) parts.push(state.customInputs[secId]);
            if (parts.length > 0) {
                yaml += `${yamlMap[secId]}: ${parts.join(', ')}\n`;
            }
        });

        if (state.highQuality && !state.selections['quality']) {
            yaml += `quality: masterpiece, best quality\n`;
        }

        // Custom Fields
        state.customFields.forEach(field => {
            if (field.enabled !== false && field.key && field.value) {
                yaml += `${field.key}: ${field.value}\n`;
            }
        });

        return yaml;
    }

    function applySyntaxHighlighting(yamlText) {
        const lines = yamlText.split('\n');
        const highlightedLines = lines.map(line => {
            const match = line.match(/^(\s*)([a-zA-Z0-9_]+):\s*(.*)$/);
            if (match) {
                const indent = match[1];
                const key = match[2];
                const value = match[3];
                return `${indent}<span style="color: #6B9FE8;">${key}:</span> <span style="color: #D4A574;">${value}</span>`;
            }
            return line;
        });
        return highlightedLines.join('\n');
    }

    function generatePrompt() {
        let promptText;
        if (state.format === 'yaml') {
            promptText = generatePromptYAML();
            outputFinal.innerHTML = applySyntaxHighlighting(promptText);
            outputFinal.dataset.plainText = promptText;
        } else {
            promptText = generatePromptPlain();
            outputFinal.textContent = promptText;
            outputFinal.dataset.plainText = promptText;
        }

        outputNegative.value = inputNegative.value.trim();
        saveState();
    }

    // --- Preview Logic ---
    function showPreview(imageSrc, labelText) {
        if (imageSrc) {
            previewImageBox.style.backgroundImage = `url('${imageSrc}')`;
            previewLabel.textContent = labelText;
            previewPlaceholder.style.display = 'none';
            previewContent.style.display = 'block';
        }
    }

    function hidePreview() {
        previewPlaceholder.style.display = 'flex';
        previewContent.style.display = 'none';
        previewImageBox.style.backgroundImage = 'none';
    }

    function updateLockedPreview() {
        // Find last selected tag with an image in the DOM
        const activeTags = Array.from(document.querySelectorAll('.tag-chip.active'));
        let lastTagWithImage = null;

        for (let i = activeTags.length - 1; i >= 0; i--) {
            if (activeTags[i].dataset.image) {
                lastTagWithImage = activeTags[i];
                break;
            }
        }

        if (lastTagWithImage) {
            state.isPreviewLocked = true;
            showPreview(lastTagWithImage.dataset.image, lastTagWithImage.textContent);
        } else {
            state.isPreviewLocked = false;
            hidePreview();
        }
    }

    // --- Init ---

    // --- Sound Manager (Synthesized Sci-Fi FX) ---
    class SoundManager {
        constructor() {
            this.ctx = null;
            this.masterGain = null;
            this.isMuted = localStorage.getItem('soundMuted') === 'true'; // Load saved mute state
            // Load saved volume (default 23)
            const savedVol = localStorage.getItem('soundVolume');
            this.volume = savedVol !== null ? parseInt(savedVol, 10) : 23;
            this.initialized = false;
        }

        init() {
            if (this.initialized) {
                if (this.ctx && this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
                return;
            }
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
                this.masterGain = this.ctx.createGain();

                // Apply initial volume
                this.updateGain();

                this.masterGain.connect(this.ctx.destination);
                this.initialized = true;
            } catch (e) {
                console.warn("Web Audio API not supported", e);
            }
        }

        // Helper to set master gain based on mute and volume
        updateGain() {
            if (!this.masterGain) return;
            const targetGain = this.isMuted ? 0 : (this.volume / 100);
            this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
        }

        setVolume(val) {
            this.volume = val;
            localStorage.setItem('soundVolume', this.volume);
            if (this.initialized) {
                this.updateGain();
            }
        }

        toggleMute() {
            this.isMuted = !this.isMuted;
            localStorage.setItem('soundMuted', this.isMuted); // Save state

            if (this.initialized) {
                this.updateGain();
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
            }
            return this.isMuted;
        }

        // 1. Click/Select: High-tech blip
        playClick() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, t);
            osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.05);
        }

        // 2. Hover: Very subtle tick
        playHover() {
            // Hover sounds only play if already initialized and running to avoid console warnings
            if (this.isMuted || !this.initialized || (this.ctx && this.ctx.state === 'suspended')) return;

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(2000, t);

            gain.gain.setValueAtTime(0.05, t); // Very quiet
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.02);
        }

        // 3. Success (Copy): Divine Blessing — Organ-like sustained chord
        playSuccess() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const mg = this.masterGain;

            // Organ-like sustained chord (C major: C4, E4, G4, C5)
            [261.6, 329.6, 392, 523.25].forEach(f => {
                // Fundamental tone with slow attack
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.15, t + 0.3);
                gain.gain.linearRampToValueAtTime(0.12, t + 0.8);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
                osc.connect(gain);
                gain.connect(mg);
                osc.start(t);
                osc.stop(t + 1.5);

                // 2nd harmonic (octave up, subtle)
                const osc2 = this.ctx.createOscillator();
                const gain2 = this.ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(f * 2, t + 0.1);
                gain2.gain.setValueAtTime(0.04, t + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
                osc2.connect(gain2);
                gain2.connect(mg);
                osc2.start(t + 0.1);
                osc2.stop(t + 1.3);
            });
        }

        // 4. Toggle/Expand: Whoosh filter sweep
        playToggle() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;

            // White noise buffer
            const bufferSize = this.ctx.sampleRate * 0.2; // 0.2 seconds
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, t);
            filter.frequency.exponentialRampToValueAtTime(2000, t + 0.15); // Sweep up

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            noise.start(t);
        }

        // 5. Delete/Reset: Descending tone
        playDelete() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, t);
            osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);

            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.3);
        }
    }

    // Initialize SoundManager
    const sfx = new SoundManager();

    // Changelog Data
    const changelog = [
        {
            version: "v5.0",
            date: "2026-02-16",
            changes: [
                "🎉 重大改版：全新分頁式 UI（基本/外觀/動作/風格/環境/攝影）",
                "所有選項改為單選模式",
                "每個區塊新增「自訂」按鈕，可輸入自定義值",
                "新增性別切換（男/女髮型自動切換）",
                "新增髮色色票選擇器",
                "新增眼色圓形選擇器（支持異色瞳）",
                "新增種族、職業、場景、天氣等大量選項",
                "新增鏡頭效果（散景、魚眼、霧化等）",
                "提示詞生成邏輯全面更新",
                "保留：音效系統、圖片預覽、設定面板"
            ]
        },
        {
            version: "v4.92",
            date: "2026-02-16 00:13",
            changes: [
                "修正生成結果欄位寬度問題：鎖定寬度、長文字自動換行",
                "移除生成結果捲動條，內容隨行數自然延伸",
                "修正選取動漫風格等長字串選項時版面跳動問題"
            ]
        },
        {
            version: "v4.91",
            date: "2026-02-15 22:10",
            changes: [
                "實作互動式懸停預覽系統 (Hover Previews)",
                "新增預覽容器樣式與動畫效果",
                "滑鼠移開後自動恢復已選取項目之預覽"
            ]
        },
        {
            version: "v4.90",
            date: "2026-02-15 21:08",
            changes: [
                "應用程式圖標 (Logo) 放大兩倍",
                "版面視覺微調"
            ]
        },
        {
            version: "v4.89",
            date: "2026-02-15 21:05",
            changes: [
                "版本歷史紀錄新增時間顯示 (HH:MM)",
                "優化歷史紀錄顯示格式"
            ]
        },
        {
            version: "v4.88",
            date: "2026-02-15 21:00",
            changes: [
                "新增版本歷史紀錄功能 (Version History)",
                "新增頂部歷史紀錄按鈕"
            ]
        },
        {
            version: "v4.87",
            date: "2026-02-15 18:45",
            changes: [
                "設定面板介面緊湊化 (Compact Layout)",
                "優化輸入框與按鈕間距"
            ]
        },
        {
            version: "v4.86",
            date: "2026-02-15 18:40",
            changes: [
                "修正頂部按鈕圖示繼承透明文字的問題"
            ]
        },
        {
            version: "v4.85",
            date: "2026-02-15 18:35",
            changes: [
                "修正滑鼠懸停時圖示消失的問題"
            ]
        },
        {
            version: "v4.84",
            date: "2026-02-15 18:30",
            changes: [
                "修正設定面板無法捲動的問題",
                "新增設定面板卷軸"
            ]
        },
        {
            version: "v4.83",
            date: "2026-02-15 18:20",
            changes: [
                "新增音效音量控制 (Volume Control)",
                "音量設定自動儲存"
            ]
        },
        {
            version: "v4.82",
            date: "2026-02-15 18:10",
            changes: [
                "新增背景圖片上傳功能 (Custom Background)",
                "新增「貼上圖片」功能"
            ]
        },
        {
            version: "v4.80 - v4.81",
            date: "2026-02-15 00:00",
            changes: [
                "設定選項預設為收合狀態",
                "版本號與介面微調"
            ]
        }
    ];

    // Changelog Logic
    const btnHistory = document.getElementById('btn-history');
    const changelogModal = document.getElementById('changelog-modal');
    const btnCloseChangelog = document.getElementById('btn-close-changelog');
    const changelogBody = document.getElementById('changelog-body');

    function renderChangelog() {
        changelogBody.innerHTML = changelog.map(entry => `
            <div class="changelog-entry">
                <div class="changelog-header">
                    <span class="changelog-version">${entry.version}</span>
                    <span class="changelog-date">${entry.date}</span>
                </div>
                <ul class="changelog-list">
                    ${entry.changes.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    if (btnHistory && changelogModal) {
        btnHistory.addEventListener('click', () => {
            sfx.playClick();
            renderChangelog();
            changelogModal.classList.add('active');
        });

        const closeChangelog = () => {
            sfx.playClick();
            changelogModal.classList.remove('active');
        };

        btnCloseChangelog.addEventListener('click', closeChangelog);
        changelogModal.addEventListener('click', (e) => {
            if (e.target === changelogModal) closeChangelog();
        });
    }

    // --- Init ---

    // Sound Toggle Button
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const iconSound = btnSoundToggle.querySelector('i');

    // Initialize button state based on saved setting
    if (sfx.isMuted) {
        iconSound.className = 'fa-solid fa-volume-xmark';
        btnSoundToggle.classList.add('muted');
    }

    // Attempt to initialize audio context immediately (Best effort)
    // Browsers may block this until user interaction, but high-engagement sites might allow it.
    try {
        sfx.init();
    } catch (e) {
        console.log("Auto-init prevented by browser policy");
    }

    // Initialize audio context on first user interaction (Fallback)
    // Listened for multiple event types to catch any valid user gesture
    ['click', 'mousedown', 'keydown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, () => {
            if (!sfx.initialized || (sfx.ctx && sfx.ctx.state === 'suspended')) sfx.init();
        }, { once: true });
    });

    // Also listen for mouseover as a potential trigger (though strict browsers may ignore this)
    document.addEventListener('mouseover', () => {
        if (!sfx.initialized || (sfx.ctx && sfx.ctx.state === 'suspended')) sfx.init();
    }, { once: true });

    btnSoundToggle.addEventListener('click', () => {
        sfx.init(); // Ensure context is started
        const isMuted = sfx.toggleMute();
        if (isMuted) {
            iconSound.className = 'fa-solid fa-volume-xmark';
            btnSoundToggle.classList.add('muted');
        } else {
            iconSound.className = 'fa-solid fa-volume-high';
            btnSoundToggle.classList.remove('muted');
            sfx.playClick();
        }
    });

    // Event Listeners
    btnAddCustom.addEventListener('click', () => {
        sfx.playClick();
        state.customFields.push({ key: '', value: '', enabled: true });
        renderCustomFields();
        generatePrompt();
    });

    // Attach Hover Sounds globally to interactive elements
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches && e.target.matches('.tag-chip, button, .collapsible-header, .custom-field-checkbox')) {
            sfx.playHover();
        }
    }, true); // Use capture to ensure we catch it

    btnReset.addEventListener('click', () => {
        sfx.playClick();
        const confirmMessage = state.lang === 'zh'
            ? "確定要重置所有設定嗎？\n\n這將會：\n1. 清空所有已選項目\n2. 清空主詞與描述\n3. 清空自訂欄位"
            : "Are you sure you want to reset all settings?\n\nThis will:\n1. Clear all selections\n2. Clear subject and description\n3. Clear custom fields";

        if (confirm(confirmMessage)) {
            sfx.playDelete();
            state.selections = {};
            state.customInputs = {};
            state.customInputVisible = {};
            state.customFields = [];
            inputSubject.value = '做一張全新的圖';

            inputNegative.value = '';

            state.isPreviewLocked = false;
            hidePreview();
            renderCustomFields();
            renderTabs();
            renderTabContent();

            generatePrompt();
            saveState();
        }
    });

    // Copy Button with Auto-Open (v4.7)
    btnCopy.addEventListener('click', () => {
        const textToCopy = outputFinal.dataset.plainText || outputFinal.textContent;
        if (!textToCopy) {
            sfx.playDelete(); // Error/Empty sound (reused delete)
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => btnCopy.innerHTML = originalText, 2000);

        // Load AI sites
        const saved = localStorage.getItem('aiSites');
        const aiSites = saved ? JSON.parse(saved) : [];
        const validSites = aiSites.filter(site => site.name && site.url);

        if (validSites.length === 0) {
            // No sites configured, just play success sound
            sfx.playSuccess();
        } else if (validSites.length === 1) {
            // One site: open directly
            window.open(validSites[0].url, '_blank');
            sfx.playSuccess();
        } else {
            // Multiple sites: show picker
            showSitePicker(validSites);
        }
    });

    inputSubject.addEventListener('input', () => {
        generatePrompt();
        saveState();
    });



    inputNegative.addEventListener('input', () => {
        saveState(); // just save, no need to regen positive prompt
    });

    // --- Translations for Settings ---
    const i18nText = {
        'settings-title': { en: 'AI Website Settings', zh: 'AI 網站設定' },
        'settings-hint': { en: 'Configure up to 5 AI image generation websites. After copying, you can quickly open them.', zh: '設定最多 5 個 AI 繪圖網站。複製後可以快速開啟。' },
        'add-website': { en: 'Add Website', zh: '新增網站' },
        'save': { en: 'Save', zh: '儲存' },
        'choose-website': { en: 'Choose AI Website', zh: '選擇 AI 網站' },
        'appearance-title': { en: 'Appearance', zh: '外觀設定 (Appearance)' },
        'bg-image-label': { en: 'Background Image (Ctrl+V)', zh: '背景圖片 (Ctrl+V 貼上)' },
        'paste-hint': { en: 'Click input and press Ctrl+V to paste image, or upload.', zh: '點擊輸入框並按下 Ctrl+V 元件可直接貼上，或點擊右側按鈕上傳圖片' },
        'opacity-label': { en: 'Opacity', zh: '透明度' },
        'blur-label': { en: 'Blur', zh: '模糊度' },
        'audio-title': { en: 'Audio Settings', zh: '音效設定 (Audio)' },
        'volume-label': { en: 'Volume', zh: '音量' }
    };

    function updateStaticText() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (i18nText[key]) {
                el.innerText = i18nText[key][state.lang] || i18nText[key].en;
            }
        });
    }

    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            sfx.playClick();
            state.lang = e.target.value;
            renderTabs();
            renderTabContent();
            updateStaticText();
            renderCustomFields();
            renderAISites();
            generatePrompt();
        });
    });



    formatRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            sfx.playClick();
            state.format = e.target.value;
            generatePrompt();
        });
    });

    // Initialize
    loadState();
    renderTabs();
    renderTabContent();
    updateStaticText();
    renderCustomFields();
    generatePrompt();

    // Global Click Listener for UI Sounds (Delegation)
    document.addEventListener('click', (e) => {
        // Tag Chip Selection
        if (e.target.closest('.tag-chip')) {
            sfx.playClick();
        }
        // Collapsible Header (Toggle)
        if (e.target.closest('.collapsible-header')) {
            sfx.playToggle();
        }
        // Custom field delete
        if (e.target.closest('.btn-delete')) {
            sfx.playDelete();
        }
    });

    // ========================================
    // Settings Panel & Copy-to-Open (v4.7)
    // ========================================

    const settingsModal = document.getElementById('settings-modal');
    const btnSettings = document.getElementById('btn-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const btnSaveSettings = document.getElementById('btn-save-settings');
    const btnAddSite = document.getElementById('btn-add-site');
    const aiSitesList = document.getElementById('ai-sites-list');
    const sitePicker = document.getElementById('site-picker');
    const sitePickerList = document.getElementById('site-picker-list');

    let aiSitesConfig = [];

    // Load AI sites from localStorage
    function loadAISites() {
        const saved = localStorage.getItem('aiSites');
        aiSitesConfig = saved ? JSON.parse(saved) : [];
        renderAISites();
    }

    // Save AI sites to localStorage
    function saveAISites() {
        localStorage.setItem('aiSites', JSON.stringify(aiSitesConfig));
    }

    // Render AI sites in settings panel
    function renderAISites() {
        aiSitesList.innerHTML = '';
        const phName = state.lang === 'zh' ? '名稱 (如 ChatGPT)' : 'Name (e.g. ChatGPT)';
        const phUrl = state.lang === 'zh' ? '網址 (如 https://...)' : 'URL (e.g. https://...)';

        aiSitesConfig.forEach((site, index) => {
            const row = document.createElement('div');
            row.className = 'site-row';
            row.innerHTML = `
                <input type="text" placeholder="${phName}" value="${site.name || ''}" data-index="${index}" data-field="name">
                <input type="text" placeholder="${phUrl}" value="${site.url || ''}" data-index="${index}" data-field="url">
                <button class="btn-delete-site" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            `;
            aiSitesList.appendChild(row);
        });
    }

    // Open settings modal
    function openSettings() {
        settingsModal.classList.add('active');
        sfx.playClick();
    }

    // Close settings modal
    function closeSettings() {
        settingsModal.classList.remove('active');
        sfx.playClick();
    }

    // Show site picker popup
    function showSitePicker(sites) {
        sitePickerList.innerHTML = '';
        sites.forEach(site => {
            const btn = document.createElement('button');
            btn.className = 'site-picker-btn';
            btn.textContent = site.name;
            btn.addEventListener('click', () => {
                window.open(site.url, '_blank');
                sitePicker.classList.remove('active');
                sfx.playSuccess();
            });
            sitePickerList.appendChild(btn);
        });

        // Position near copy button
        const copyBtn = document.getElementById('btn-copy');
        const rect = copyBtn.getBoundingClientRect();
        sitePicker.style.top = `${rect.bottom + 10}px`;
        sitePicker.style.left = `${rect.left}px`;
        sitePicker.classList.add('active');

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closePicker(e) {
                if (!sitePicker.contains(e.target) && e.target !== copyBtn) {
                    sitePicker.classList.remove('active');
                    document.removeEventListener('click', closePicker);
                }
            });
        }, 100);
    }

    // Event Listeners for Settings
    btnSettings.addEventListener('click', openSettings);
    btnCloseSettings.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettings();
    });

    btnAddSite.addEventListener('click', () => {
        if (aiSitesConfig.length >= 5) {
            alert('Maximum 5 AI websites allowed');
            return;
        }
        aiSitesConfig.push({ name: '', url: '' });
        renderAISites();
        sfx.playClick();
    });

    aiSitesList.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            aiSitesConfig[index][field] = e.target.value;
        }
    });

    aiSitesList.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-site')) {
            const index = parseInt(e.target.closest('.btn-delete-site').dataset.index);
            aiSitesConfig.splice(index, 1);
            renderAISites();
            sfx.playDelete();
        }
    });

    btnSaveSettings.addEventListener('click', () => {
        // Filter out empty entries
        aiSitesConfig = aiSitesConfig.filter(site => site.name.trim() && site.url.trim());
        saveAISites();

        // Save Background Settings
        saveState();

        closeSettings();
        sfx.playSuccess();
    });

    // ========================================
    // Custom Background Logic (v4.7)
    // ========================================
    const bgUrlInput = document.getElementById('bg-url-input');
    const bgOpacitySlider = document.getElementById('bg-opacity-slider');
    const bgBlurSlider = document.getElementById('bg-blur-slider');
    const opacityValueDisplay = document.getElementById('opacity-value');
    const blurValueDisplay = document.getElementById('blur-value');
    const customBg = document.querySelector('.custom-bg');
    const btnUploadBg = document.getElementById('btn-upload-bg');
    const bgFileInput = document.getElementById('bg-file-input');

    function updateBackground() {
        if (!state.background) return;

        // Update CSS
        if (state.background.url) {
            customBg.style.backgroundImage = `url('${state.background.url}')`;
        }
        customBg.style.opacity = state.background.opacity / 100;
        customBg.style.filter = `blur(${state.background.blur}px) grayscale(30%)`;

        // Update Text Displays (Always update these for real-time feedback)
        opacityValueDisplay.textContent = `${state.background.opacity}%`;
        blurValueDisplay.textContent = `${state.background.blur}px`;

        // Update Input Values (Only if NOT active to avoid cursor fighting)
        if (document.activeElement !== bgUrlInput) {
            bgUrlInput.value = state.background.url || '';
        }
        if (document.activeElement !== bgOpacitySlider) {
            bgOpacitySlider.value = state.background.opacity;
        }
        if (document.activeElement !== bgBlurSlider) {
            bgBlurSlider.value = state.background.blur;
        }
    }

    // Event Listeners for Background Settings
    bgUrlInput.addEventListener('input', (e) => {
        state.background.url = e.target.value;
        updateBackground();
    });

    btnUploadBg.addEventListener('click', () => {
        bgFileInput.click();
        sfx.playClick();
    });

    bgFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                // Check size limit (approx 3MB safety net for localStorage)
                if (base64.length > 3 * 1024 * 1024) {
                    alert("Image is too large to save! It will work for this session but won't be saved.");
                }
                state.background.url = base64;
                updateBackground();
                sfx.playSuccess();
            };
            reader.readAsDataURL(file);
        }
    });

    bgOpacitySlider.addEventListener('input', (e) => {
        state.background.opacity = e.target.value;
        updateBackground();
    });

    bgBlurSlider.addEventListener('input', (e) => {
        state.background.blur = e.target.value;
        updateBackground();
    });

    // Volume Slider Logic
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValueDisplay = document.getElementById('volume-value');

    // Set initial value from sfx instance
    volumeSlider.value = sfx.volume;
    volumeValueDisplay.textContent = `${sfx.volume}%`;

    volumeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        sfx.setVolume(val);
        volumeValueDisplay.textContent = `${val}%`;
    });

    // Play test sound when slider is released (change event)
    volumeSlider.addEventListener('change', () => {
        sfx.playClick();
    });

    // Paste to Upload (Ctrl+V)
    bgUrlInput.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image/')) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    // Check size limit (approx 3MB safety net for localStorage)
                    if (base64.length > 3 * 1024 * 1024) {
                        alert("Image is too large to save! It will work for this session but won't be saved.");
                    }
                    state.background.url = base64;
                    updateBackground();
                    sfx.playSuccess();
                };
                reader.readAsDataURL(blob);
                e.preventDefault(); // Prevent pasting the filename
            }
        }
    });

    // Global Paste Listener (When settings modal is open)
    document.addEventListener('paste', (e) => {
        if (!settingsModal.classList.contains('active')) return;
        // If focus is already on input, let the input handler deal with it
        if (document.activeElement === bgUrlInput) return;

        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.includes('image/')) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.background.url = event.target.result;
                    updateBackground();
                    sfx.playSuccess();
                };
                reader.readAsDataURL(blob);
            }
        }
    });

    // Initialize
    loadAISites();
    // Ensure background state exists
    if (!state.background) {
        state.background = {
            url: 'assets/background_v2.jpg',
            opacity: 20,
            blur: 2
        };
    }
    updateBackground();

    // Lock layout width after initial render to prevent content-driven expansion
    requestAnimationFrame(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.maxWidth = mainContent.offsetWidth + 'px';
        }
    });

});
