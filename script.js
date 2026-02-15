document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const promptData = {
        hair: {
            title: { en: "Hair Style", zh: "髮型 (Hair Style)" },
            options: [
                { label: "Long Hair", zh: "長髮", value: "long hair", image: "assets/previews/hair_long_hair.png" },
                { label: "Short Hair", zh: "短髮", value: "short hair", image: "assets/previews/hair_short_hair.png" },
                { label: "Ponytail", zh: "馬尾", value: "ponytail", image: "assets/previews/hair_ponytail.png" },
                { label: "High Ponytail", zh: "高緊馬尾", value: "high ponytail", image: "assets/previews/hair_high_ponytail.png" },
                { label: "Low Ponytail", zh: "中長直低馬尾", value: "low ponytail, medium length", image: "assets/previews/hair_low_ponytail.png" },
                { label: "Twintails", zh: "雙馬尾", value: "twintails", image: "assets/previews/hair_twintails.png" },
                { label: "Low Twintails", zh: "低雙馬尾", value: "low twintails", image: "assets/previews/hair_low_twintails.png" },
                { label: "High Twintails", zh: "高雙馬尾", value: "high twintails", image: "assets/previews/hair_high_twintails.png" },
                { label: "Bangs", zh: "瀏海", value: "bangs", image: "assets/previews/hair_bangs.png" },
                { label: "Blunt Bangs", zh: "齊瀏海", value: "blunt bangs", image: "assets/previews/hair_blunt_bangs.png" },
                { label: "Black Long Straight", zh: "黑長直", value: "black long straight hair", image: "assets/previews/hair_black_long_straight_hair.png" },
                { label: "Low Bun", zh: "低髮髻", value: "low hair bun", image: "assets/previews/hair_low_bun.png" },
                { label: "Hime Cut", zh: "姬髮式", value: "hime cut", image: "assets/previews/hair_hime_cut.png" },
                { label: "Double Buns", zh: "立體雙丸子頭", value: "double buns", image: "assets/previews/hair_double_buns.png" },
                { label: "Side Part", zh: "側分", value: "side part", image: "assets/previews/hair_side_part.png" },
                { label: "Center Part", zh: "中分", value: "center part", image: "assets/previews/hair_center_part.png" },
                { label: "Messy Curls", zh: "法式微亂捲", value: "messy curly hair", image: "assets/previews/hair_messy_perm.png" },
                { label: "Wolf Cut", zh: "狼尾層次剪", value: "wolf cut", image: "assets/previews/hair_wolf_cut.png" },
                { label: "Pixie Cut", zh: "精靈短髮", value: "pixie cut", image: "assets/previews/hair_pixie_cut.png" },
                { label: "Bald", zh: "光頭", value: "bald", image: "assets/previews/hair_bald.png" },
                { label: "Afro", zh: "爆炸頭", value: "afro", image: "assets/previews/hair_afro.png" },
                { label: "Single Braid", zh: "單麻花辮", value: "single braid", image: "assets/previews/hair_single_braid.png" },
                { label: "Braids", zh: "辮子", value: "braids", image: "assets/previews/hair_braids.png" },
                { label: "Buzz Cut", zh: "極短寸頭", value: "buzz cut", image: "assets/previews/hair_buzz_cut.png" },
                { label: "Blonde Hair", zh: "金髮", value: "blonde hair", image: "assets/previews/hair_blonde_hair.png" },
                { label: "Airy Bob", zh: "空氣感短鮑伯頭", value: "airy bob cut", image: "assets/previews/hair_bob_cut.png" },
                { label: "Wavy Long Hair", zh: "柔亮大波浪長髮", value: "wavy long hair", image: "assets/previews/hair_wavy_long_hair.png" },
                { label: "Bob with Bangs", zh: "齊劉海短髮妹妹頭", value: "bob cut with blunt bangs", image: "assets/previews/hair_bob_cut_blunt_bangs.png" }
            ]
        },
        clothing: {
            title: { en: "Clothing", zh: "服裝 (Clothing)" },
            options: [
                // 1. School Uniforms (Most Popular)
                { label: "School Uniform (Sailor)", zh: "學校制服 (水手服)", value: "school uniform, sailor", image: "assets/previews/clothing_school_sailor.png" },
                { label: "School Uniform (Blazer)", zh: "學校制服 (西裝)", value: "school uniform, blazer", image: "assets/previews/clothing_school_blazer.png" },
                { label: "Gym Suit", zh: "體育服", value: "gym suit, buruma", image: "assets/previews/clothing_gym_suit.png" },
                { label: "School Swimsuit", zh: "學校泳裝", value: "school swimsuit, sukumizu", image: "assets/previews/clothing_school_swimsuit.png" },

                // 2. Cosplay / Occupation
                { label: "Maid", zh: "女僕裝", value: "maid outfit", image: "assets/previews/clothing_maid.png" },
                { label: "Nurse", zh: "護士服", value: "nurse uniform", image: "assets/previews/clothing_nurse.png" },
                { label: "Miko", zh: "巫女服", value: "miko outfit, shrine maiden", image: "assets/previews/clothing_miko.png" },
                { label: "Cheongsam", zh: "旗袍", value: "cheongsam, qipao, china dress", image: "assets/previews/clothing_cheongsam.png" },
                { label: "Police", zh: "警察制服", value: "police uniform", image: "assets/previews/clothing_police.png" },
                { label: "Office Lady", zh: "OL套裝", value: "office lady, business suit", image: "assets/previews/clothing_office_lady.png" },
                { label: "Flight Attendant", zh: "空服員", value: "flight attendant uniform", image: "assets/previews/clothing_flight_attendant.png" },
                { label: "Chef", zh: "廚師服", value: "chef uniform", image: "assets/previews/clothing_chef.png" },

                // 3. Cultural & Traditional (New)
                { label: "Kimono", zh: "和服", value: "kimono", image: "assets/previews/clothing_kimono.png" },
                { label: "Yukata", zh: "浴衣", value: "yukata", image: "assets/previews/clothing_yukata.png" },
                { label: "Hanfu", zh: "漢服", value: "hanfu, chinese traditional clothing", image: "assets/previews/clothing_hanfu.png" },
                { label: "Hanbok", zh: "韓服", value: "hanbok, korean traditional clothing", image: "assets/previews/clothing_hanbok.png" },

                // 4. Casual / Daily
                { label: "T-shirt", zh: "T恤", value: "t-shirt", image: "assets/previews/clothing_tshirt.png" },
                { label: "Hoodie", zh: "連帽衫", value: "hoodie", image: "assets/previews/clothing_hoodie.png" },
                { label: "Sweater", zh: "毛衣", value: "sweater", image: "assets/previews/clothing_sweater.png" },
                { label: "Off-shoulder", zh: "露肩上衣", value: "off-shoulder top", image: "assets/previews/clothing_off_shoulder.png" },
                { label: "Sundress", zh: "連身裙", value: "sundress", image: "assets/previews/clothing_sundress.png" },
                { label: "Skirt", zh: "裙子", value: "skirt", image: "assets/previews/clothing_skirt.png" },
                { label: "Jeans", zh: "牛仔褲", value: "jeans", image: "assets/previews/clothing_jeans.png" },
                { label: "Bikini", zh: "比基尼", value: "bikini", image: "assets/previews/clothing_bikini.png" }
            ]
        },
        animeStyle: {
            title: { en: "Anime Style", zh: "動漫風格 (Anime Style)" },
            options: [
                { label: "Hayao Miyazaki", zh: "宮崎駿 (吉卜力)", value: "studio ghibli style, by hayao miyazaki" },
                { label: "Makoto Shinkai", zh: "新海誠 (風景光影)", value: "by makoto shinkai" },
                { label: "Akira Toriyama", zh: "鳥山明 (七龍珠)", value: "by akira toriyama, dragon ball style" },
                { label: "Eiichiro Oda", zh: "尾田榮一郎 (海賊王)", value: "by eiichiro oda, one piece style" },
                { label: "Masashi Kishimoto", zh: "岸本齊史 (火影忍者)", value: "by masashi kishimoto, naruto style" },
                { label: "Tite Kubo", zh: "久保帶人 (死神)", value: "by tite kubo, bleach style" },
                { label: "Yoshihiro Togashi", zh: "富堅義博 (獵人)", value: "by yoshihiro togashi, hunter x hunter style" },
                { label: "Takehiko Inoue", zh: "井上雄彥 (灌籃高手)", value: "by takehiko inoue, slam dunk style" },
                { label: "Kentaro Miura", zh: "三浦建太郎 (烙印勇士)", value: "by kentaro miura, berserk style" },
                { label: "Junji Ito", zh: "伊藤潤二 (恐怖漫畫)", value: "by junji ito, horror manga style" },
                { label: "Rumiko Takahashi", zh: "高橋留美子 (犬夜叉)", value: "by rumiko takahashi, 90s anime style" },
                { label: "CLAMP", zh: "CLAMP (庫洛魔法使)", value: "by clamp, cardcaptor sakura style" },
                { label: "Naoko Takeuchi", zh: "武內直子 (美少女戰士)", value: "by naoko takeuchi, sailor moon style" },
                { label: "Hirohiko Araki", zh: "荒木飛呂彥 (JOJO)", value: "by hirohiko araki, jojo style" },
                { label: "Yusuke Murata", zh: "村田雄介 (一拳超人)", value: "by yusuke murata, one punch man style" },
                { label: "Koyoharu Gotouge", zh: "吾峠呼世晴 (鬼滅之刃)", value: "by koyoharu gotouge, demon slayer style" },
                { label: "Tatsuki Fujimoto", zh: "藤本樹 (鏈鋸人)", value: "by tatsuki fujimoto, chainsaw man style" },
                { label: "Gege Akutami", zh: "芥見下下 (咒術迴戰)", value: "by gege akutami, jujutsu kaisen style" },
                { label: "Hiromu Arakawa", zh: "荒川弘 (鋼之鍊金術師)", value: "by hiromu arakawa, fullmetal alchemist style" },
                { label: "Hideaki Anno", zh: "庵野秀明 (EVA)", value: "by hideaki anno, evangelion style" },
                { label: "Osamu Tezuka", zh: "手塚治虫 (原子小金剛)", value: "by osamu tezuka, astro boy style" },
                { label: "Go Nagai", zh: "永井豪 (惡魔人)", value: "by go nagai, retro mecha style" },
                { label: "Leiji Matsumoto", zh: "松本零士 (銀河鐵道999)", value: "by leiji matsumoto, space opera style" },
                { label: "Yoshiyuki Sadamoto", zh: "貞本義行 (EVA人設)", value: "by yoshiyuki sadamoto, evangelion character design" },
                { label: "Masakazu Katsura", zh: "桂正和 (電影少女)", value: "by masakazu katsura" },
                { label: "Tsukasa Hojo", zh: "北條司 (城市獵人)", value: "by tsukasa hojo, city hunter style" },
                { label: "Kyoto Animation", zh: "京都動畫 (京阿尼)", value: "kyoto animation style" },
                { label: "Ufotable", zh: "Ufotable (飛碟社)", value: "ufotable style" }
            ]
        },
        artStyle: {
            title: { en: "Art Style", zh: "藝術風格 (Art Style)" },
            options: [
                { label: "Pencil Sketch", zh: "鉛筆素描", value: "pencil sketch" },
                { label: "Charcoal Sketch", zh: "炭筆素描", value: "charcoal sketch" },
                { label: "Ink Wash Painting", zh: "水墨畫", value: "ink wash painting" },
                { label: "Colored Pencil", zh: "色鉛筆插畫", value: "colored pencil drawing" },
                { label: "Watercolor", zh: "透明水彩", value: "transparent watercolor" },
                { label: "Oil Painting", zh: "油畫", value: "oil painting" },
                { label: "Crayon", zh: "蠟筆畫", value: "crayon drawing" },
                { label: "Ukiyo-e", zh: "浮世繪", value: "ukiyo-e" },
                { label: "Pixel Art", zh: "像素藝術", value: "pixel art" },
                { label: "Graffiti", zh: "街頭塗鴉", value: "graffiti" },
                { label: "Pop Art", zh: "普普藝術", value: "pop art" },
                { label: "Cyberpunk", zh: "賽博龐克", value: "cyberpunk" },
                { label: "Steampunk", zh: "蒸汽龐克", value: "steampunk" },
                { label: "Mucha Style", zh: "慕夏風格", value: "mucha style, art nouveau" },
                { label: "Impressionism", zh: "印象派繪畫", value: "impressionism" },
                { label: "Surrealism", zh: "超現實主義", value: "surrealism" },
                { label: "Origami", zh: "摺紙藝術", value: "origami art" },
                { label: "Paper Cutting", zh: "紙雕藝術", value: "paper cutting art" },
                { label: "Stained Glass", zh: "彩繪玻璃", value: "stained glass" },
                { label: "Mosaic", zh: "馬賽克拼貼", value: "mosaic art" },
                { label: "Clay / Nendoroid", zh: "黏土人", value: "claymation, nendoroid" },
                { label: "Low Poly", zh: "低多邊形", value: "low poly" },
                { label: "Neon Art", zh: "霓虹燈管藝術", value: "neon light art" },
                { label: "Blueprint", zh: "藍圖", value: "blueprint" },
                { label: "Silhouette", zh: "剪影藝術", value: "silhouette" },
                { label: "Woodcut", zh: "木刻版畫", value: "woodcut print" },
                { label: "Manga (B&W)", zh: "日本黑白漫畫", value: "black and white manga" },
                { label: "Film Photography", zh: "底片顆粒感攝影", value: "film photography, film grain" }
            ]
        },
        artist: {
            title: { en: "Artist", zh: "藝術家 (Artist)" },
            options: [
                { label: "Greg Rutkowski", zh: "Greg Rutkowski (Fantasy)", value: "by greg rutkowski" },
                { label: "Alphonse Mucha", zh: "Alphonse Mucha (Art Nouveau)", value: "by alphonse mucha" },
                { label: "Wlop", zh: "Wlop (Digital Art)", value: "by wlop" },
                { label: "Artgerm", zh: "Artgerm (Comic/Digital)", value: "by artgerm" },
                { label: "Ilya Kuvshinov", zh: "Ilya Kuvshinov (Anime)", value: "by ilya kuvshinov" },
                { label: "Rossdraws", zh: "Rossdraws (Digital)", value: "by rossdraws" },
                { label: "Makoto Shinkai", zh: "Makoto Shinkai (Scenery)", value: "by makoto shinkai" },
                { label: "Studio Ghibli", zh: "Studio Ghibli (Anime)", value: "by studio ghibli" },
                { label: "Krenz Cushart", zh: "Krenz Cushart (Anime)", value: "by krenz cushart" },
                { label: "Hyung-tae Kim", zh: "Hyung-tae Kim (Character)", value: "by hyung-tae kim" },
                { label: "Yoshitaka Amano", zh: "Yoshitaka Amano (Fantasy)", value: "by yoshitaka amano" },
                { label: "James Jean", zh: "James Jean (Abstract)", value: "by james jean" },
                { label: "Ruan Jia", zh: "Ruan Jia (Fantasy)", value: "by ruan jia" },
                { label: "Zdzisław Beksiński", zh: "Zdzisław Beksiński (Surrealism)", value: "by zdzisław beksiński" },
                { label: "H.R. Giger", zh: "H.R. Giger (Sci-Fi/Horror)", value: "by h.r. giger" },
                { label: "Takato Yamamoto", zh: "Takato Yamamoto (Ukiyo-e)", value: "by takato yamamoto" },
                { label: "Range Murata", zh: "Range Murata (Anime)", value: "by range murata" },
                { label: "Tiv", zh: "Tiv (Anime)", value: "by tiv" },
                { label: "Kantoku", zh: "Kantoku (Anime)", value: "by kantoku" },
                { label: "Mika Pikazo", zh: "Mika Pikazo (Vibrant)", value: "by mika pikazo" }
            ]
        },
        lighting: {
            title: { en: "Lighting", zh: "光影 (Lighting)" },
            options: [
                { label: "Natural Light", zh: "自然光", value: "natural light" },
                { label: "Cinematic Lighting", zh: "電影光效", value: "cinematic lighting", image: "assets/previews/lighting_cinematic.png" },
                { label: "Soft Lighting", zh: "柔光", value: "soft lighting" },
                { label: "Hard Lighting", zh: "硬光", value: "hard lighting" },
                { label: "Volumetric Lighting", zh: "體積光 (丁達爾效應)", value: "volumetric lighting" },
                { label: "Rembrandt Lighting", zh: "倫勃朗光", value: "rembrandt lighting", image: "assets/previews/lighting_rembrandt.png" },
                { label: "Rim Lighting", zh: "邊緣光", value: "rim lighting" },
                { label: "Backlighting", zh: "逆光", value: "backlighting" },
                { label: "Golden Hour", zh: "黃金時刻", value: "golden hour", image: "assets/previews/lighting_golden_hour.png" },
                { label: "Blue Hour", zh: "藍色時刻", value: "blue hour", image: "assets/previews/lighting_blue_hour.png" },
                { label: "Cyberpunk Lighting", zh: "賽博龐克光", value: "cyberpunk lighting" },
                { label: "Neon Lights", zh: "霓虹燈", value: "neon lights" },
                { label: "Glow", zh: "發光", value: "glow" },
                { label: "Bioluminescence", zh: "生物發光", value: "bioluminescence" }
            ]
        },
        view: {
            title: { en: "View", zh: "視角 (View)" },
            options: [
                { label: "Eye-level Shot", zh: "平視鏡頭", value: "eye-level shot" },
                { label: "High Angle", zh: "高角度/俯拍鏡頭", value: "high angle shot, from above" },
                { label: "Low Angle", zh: "低角度/仰拍鏡頭", value: "low angle shot, from below" },
                { label: "Worm's Eye View", zh: "蟲視角/極低角度鏡頭", value: "worm's eye view" },
                { label: "Bird's Eye View", zh: "鳥瞰視角/俯視鏡頭", value: "bird's eye view" },
                { label: "Top-down View", zh: "正上方俯視鏡頭", value: "top-down view" },
                { label: "Hip Level Shot", zh: "腰部高度鏡頭", value: "hip level shot" },
                { label: "Knee Level Shot", zh: "膝蓋高度鏡頭", value: "knee level shot" },
                { label: "Ground Level Shot", zh: "地面高度鏡頭", value: "ground level shot" },
                { label: "Shoulder Level Shot", zh: "肩部高度鏡頭", value: "shoulder level shot" },
                { label: "Back View", zh: "背面視角", value: "back view" },
                { label: "Three-quarter View", zh: "三分之四視角", value: "three-quarter view" },
                { label: "Dutch Angle", zh: "傾斜鏡頭", value: "dutch angle" },
                { label: "Oblique Angle", zh: "斜角視角", value: "oblique angle" },
                { label: "Overhead Angle", zh: "俯視角度", value: "overhead angle" },
                { label: "Profile Angle", zh: "側面角度", value: "profile angle" },
                { label: "Side Angle", zh: "側角視角", value: "side angle" }
            ]
        },
        shotSize: {
            title: { en: "Shot Size", zh: "鏡頭 (Shot Size)" },
            collapsed: true,
            options: [
                { label: "Extreme Long Shot", zh: "極遠景", value: "extreme long shot" },
                { label: "Long Shot", zh: "遠景", value: "long shot" },
                { label: "Full Shot", zh: "全身鏡頭", value: "full shot" },
                { label: "Medium Wide Shot", zh: "中遠景", value: "medium wide shot" },
                { label: "Cowboy Shot", zh: "牛仔鏡頭", value: "cowboy shot" },
                { label: "Medium Close-up Shot", zh: "中近景", value: "medium close-up shot" },
                { label: "Close-up", zh: "特寫鏡頭", value: "close-up" },
                { label: "Extreme Close-up", zh: "極特寫鏡頭", value: "extreme close-up" }
            ]
        },
        focalLength: {
            title: { en: "Focal Length", zh: "焦段 (Focal Length)" },
            collapsed: true,
            options: [
                { label: "Ultra Wide Angle", zh: "超廣角", value: "ultra wide angle" },
                { label: "Wide Angle", zh: "廣角", value: "wide angle" },
                { label: "Semi-wide / Moderate Wide", zh: "半廣角", value: "semi-wide angle" },
                { label: "Standard Lens", zh: "標準鏡", value: "standard lens" },
                { label: "Medium Telephoto", zh: "中望遠", value: "medium telephoto" },
                { label: "Telephoto", zh: "望遠", value: "telephoto" },
                { label: "Super Telephoto", zh: "超望遠", value: "super telephoto" }
            ]
        },
        aperture: {
            title: { en: "Aperture", zh: "光圈 (Aperture)" },
            collapsed: true,
            options: [
                { label: "Small Aperture", zh: "小光圈", value: "small aperture, f/16, deep depth of field" },
                { label: "Medium Aperture", zh: "中光圈", value: "medium aperture, f/8" },
                { label: "Large Aperture", zh: "大光圈", value: "large aperture, f/1.8, shallow depth of field, bokeh" }
            ]
        },
        quality: {
            title: { en: "Quality", zh: "畫質 (Quality)" },
            collapsed: true,
            options: [
                { label: "Masterpiece", zh: "傑作", value: "masterpiece" },
                { label: "Best Quality", zh: "最佳畫質", value: "best quality" },
                { label: "Highres", zh: "高解析度", value: "highres" },
                { label: "8k", zh: "8K", value: "8k" },
                { label: "4k", zh: "4K", value: "4k" },
                { label: "HDR", zh: "HDR", value: "hdr" },
                { label: "Raw Photo", zh: "RAW 照片", value: "raw photo" },
                { label: "Ultra Detailed", zh: "超精細", value: "ultra detailed" },
                { label: "Extremely Detailed", zh: "極致細節", value: "extremely detailed" }
            ]
        }
    };

    // --- State ---
    const state = {
        selectedTags: new Set(),
        customFields: [],
        customTags: {},
        collapsedCategories: {}, // Added for v4.2 persistence
        categoryOrder: ['hair', 'clothing', 'view', 'shotSize', 'focalLength', 'aperture', 'animeStyle', 'artStyle', 'artist', 'lighting', 'quality'], // Default order
        lang: 'zh',
        format: 'yaml',
        isPreviewLocked: false
    };

    // --- Elements ---
    const categoriesContainer = document.getElementById('categories-container');
    const customFieldsContainer = document.getElementById('custom-fields-container');
    const btnAddCustom = document.getElementById('btn-add-custom');
    const inputSubject = document.getElementById('input-subject');
    const inputDescription = document.getElementById('input-description');
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
            selectedTags: Array.from(state.selectedTags),
            collapsedCategories: state.collapsedCategories, // Save collapsed state
            categoryOrder: state.categoryOrder, // Save order
            inputSubject: inputSubject.value,
            inputDescription: inputDescription.value,
            inputNegative: inputNegative.value
        };
        localStorage.setItem('promptGenState', JSON.stringify(stateToSave));
    }

    function loadState() {
        const saved = localStorage.getItem('promptGenState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state.selectedTags = new Set(parsed.selectedTags || []);
                state.customFields = parsed.customFields || [];
                state.customTags = parsed.customTags || {};
                state.collapsedCategories = parsed.collapsedCategories || {};
                state.categoryOrder = parsed.categoryOrder || ['hair', 'clothing', 'view', 'shotSize', 'focalLength', 'aperture', 'animeStyle', 'artStyle', 'artist', 'lighting', 'quality']; // Load or default
                state.lang = parsed.lang || 'zh';
                state.format = parsed.format || 'yaml';

                inputSubject.value = parsed.inputSubject || '請畫一張圖';
                inputDescription.value = parsed.inputDescription || '';
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

    // --- Functions ---
    function renderCategories() {
        categoriesContainer.innerHTML = '';

        // Iterate using the saved order
        state.categoryOrder.forEach(key => {
            const categoryData = promptData[key];
            if (!categoryData) return;

            const categoryBlock = document.createElement('div');
            categoryBlock.className = 'category-block glass-panel collapsible';
            categoryBlock.setAttribute('draggable', 'true');
            categoryBlock.dataset.categoryKey = key;

            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'collapsible-header';

            // Drag Handle
            const dragHandle = document.createElement('i');
            dragHandle.className = 'fa-solid fa-grip-vertical drag-handle';
            categoryTitle.appendChild(dragHandle);

            // Title Text
            const titleText = document.createElement('span');
            titleText.innerHTML = state.lang === 'zh' ? categoryData.title.zh : categoryData.title.en;
            categoryTitle.appendChild(titleText);

            // Icon
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-chevron-down toggle-icon';
            categoryTitle.appendChild(document.createTextNode(' ')); // Space
            categoryTitle.appendChild(icon);

            // Summary Span
            const summarySpan = document.createElement('span');
            summarySpan.className = 'selected-summary';
            categoryTitle.appendChild(summarySpan);

            // Content wrapper for collapsing
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'collapsible-content';

            // Determine initial state
            const isCollapsed = state.collapsedCategories[key] !== undefined ? state.collapsedCategories[key] : categoryData.collapsed;

            if (isCollapsed) {
                contentWrapper.classList.add('collapsed');
                categoryTitle.querySelector('.toggle-icon').classList.add('rotated');
            }

            // Click listener
            categoryTitle.addEventListener('click', (e) => {
                if (e.target.closest('.drag-handle')) return;

                const wasCollapsed = contentWrapper.classList.contains('collapsed');
                contentWrapper.classList.toggle('collapsed');
                categoryTitle.querySelector('.toggle-icon').classList.toggle('rotated');

                state.collapsedCategories[key] = !wasCollapsed;
                saveState();
            });

            // --- Drag and Drop Events ---
            // Default to not draggable
            categoryBlock.setAttribute('draggable', 'false');

            // Only make draggable when hovering the handle
            dragHandle.addEventListener('mouseenter', () => {
                categoryBlock.setAttribute('draggable', 'true');
            });

            dragHandle.addEventListener('mouseleave', () => {
                categoryBlock.setAttribute('draggable', 'false');
            });

            // Mobile touch support (tap to enable)
            dragHandle.addEventListener('touchstart', () => {
                categoryBlock.setAttribute('draggable', 'true');
            });

            categoryBlock.addEventListener('dragstart', (e) => {
                categoryBlock.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', key);
            });

            // Reset draggable to false after drag ends
            categoryBlock.addEventListener('dragend', () => {
                categoryBlock.classList.remove('dragging');
                document.querySelectorAll('.category-block').forEach(block => block.classList.remove('drag-over'));
            });



            categoryBlock.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                e.dataTransfer.dropEffect = 'move';
                categoryBlock.classList.add('drag-over');
            });

            categoryBlock.addEventListener('dragleave', (e) => {
                // Only remove class if we are strictly leaving the block, not entering a child
                if (!categoryBlock.contains(e.relatedTarget)) {
                    categoryBlock.classList.remove('drag-over');
                }
            });

            categoryBlock.addEventListener('drop', (e) => {
                e.preventDefault();
                categoryBlock.classList.remove('drag-over');
                const draggedKey = e.dataTransfer.getData('text/plain');
                const targetKey = key;

                if (draggedKey && draggedKey !== targetKey) {
                    const oldIndex = state.categoryOrder.indexOf(draggedKey);
                    const newIndex = state.categoryOrder.indexOf(targetKey);

                    if (oldIndex > -1 && newIndex > -1) {
                        // Move element in array
                        state.categoryOrder.splice(oldIndex, 1);
                        state.categoryOrder.splice(newIndex, 0, draggedKey);

                        saveState();
                        renderCategories(); // Re-render to reflect new order
                    }
                }
            });

            categoryBlock.appendChild(categoryTitle);
            categoryBlock.appendChild(contentWrapper);

            // Container for tags and input
            var targetContainer = contentWrapper;

            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'tags-container';

            categoryData.options.forEach(option => {
                const tagChip = document.createElement('div');
                tagChip.className = 'tag-chip';
                tagChip.dataset.category = key;
                tagChip.dataset.value = option.value;
                tagChip.dataset.image = option.image || '';

                const labelText = state.lang === 'zh' ? (option.zh || option.label) : option.label;
                tagChip.textContent = labelText;

                const uniqueId = `${key}:${option.value}`;
                if (state.selectedTags.has(uniqueId)) {
                    tagChip.classList.add('active');
                }

                tagChip.addEventListener('click', () => {
                    toggleTag(key, option.value, tagChip);
                });

                // Preview Hover
                tagChip.addEventListener('mouseenter', () => {
                    if (option.image) {
                        showPreview(option.image, labelText);
                    }
                });

                tagChip.addEventListener('mouseleave', () => {
                    updateLockedPreview();
                });

                tagsContainer.appendChild(tagChip);
            });

            // Custom tag input
            const customInput = document.createElement('input');
            customInput.type = 'text';
            customInput.className = 'custom-tag-input';
            let categoryLabel = state.lang === 'zh' ? categoryData.title.zh : categoryData.title.en;
            if (key === 'hair') {
                categoryLabel = state.lang === 'zh' ? '髮色 (Hair Color)' : 'Hair Color';
            }
            customInput.placeholder = (state.lang === 'zh' ? '自訂...' : 'Custom...') + ` (${categoryLabel})`;

            customInput.value = state.customTags[key] || '';

            customInput.addEventListener('input', (e) => {
                state.customTags[key] = e.target.value.trim();
                updateCategorySummary(key); // Update summary on custom input
                generatePrompt();
            });

            targetContainer.appendChild(tagsContainer);
            targetContainer.appendChild(customInput);
            categoriesContainer.appendChild(categoryBlock);

            // Initial Summary Update
            updateCategorySummary(key, summarySpan);
        });
    }

    function updateCategorySummary(category, spanElement) {
        if (!spanElement) {
            // If span not provided, find it
            const block = document.querySelector(`.tag-chip[data-category="${category}"]`)?.closest('.category-block');
            if (block) {
                spanElement = block.querySelector('.selected-summary');
            }
        }

        if (!spanElement) return;

        const selectedLabels = [];

        // Find selected tags for this category
        state.selectedTags.forEach(tagId => {
            if (tagId.startsWith(category + ':')) {
                const value = tagId.split(':')[1];
                // Find label
                const option = promptData[category].options.find(opt => opt.value === value);
                if (option) {
                    const label = state.lang === 'zh' ? (option.zh || option.label) : option.label;
                    // Simplify label (remove extra desc if needed, but per user request "Button Name" is fine)
                    // For "Black Long Straight", label is "黑長直"
                    selectedLabels.push(label);
                }
            }
        });

        // Add custom tag if present
        if (state.customTags[category]) {
            selectedLabels.push(state.customTags[category]);
        }

        if (selectedLabels.length > 0) {
            spanElement.textContent = selectedLabels.join(', ');
        } else {
            spanElement.textContent = '';
        }
    }

    function toggleTag(category, value, chipElement) {
        const uniqueId = `${category}:${value}`;

        // Single Select Logic (except for quality)
        if (category !== 'quality' && !state.selectedTags.has(uniqueId)) {
            // Remove existing selection from state
            for (const tag of state.selectedTags) {
                if (tag.startsWith(category + ':')) {
                    state.selectedTags.delete(tag);
                }
            }
            // Update UI: remove active class from all chips in this category
            const activeChips = document.querySelectorAll(`.tag-chip.active[data-category="${category}"]`);
            activeChips.forEach(chip => chip.classList.remove('active'));
        }

        if (state.selectedTags.has(uniqueId)) {
            state.selectedTags.delete(uniqueId);
            chipElement.classList.remove('active');
        } else {
            state.selectedTags.add(uniqueId);
            chipElement.classList.add('active');
        }

        updateLockedPreview();
        updateCategorySummary(category); // Update summary on toggle
        generatePrompt();
    }

    function renderCustomFields() {
        customFieldsContainer.innerHTML = '';
        state.customFields.forEach((field, index) => {
            const row = document.createElement('div');
            row.className = 'custom-field-row';

            // Checkbox for enable/disable
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'custom-field-checkbox';
            checkbox.checked = field.enabled !== false; // Default to enabled
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

    function generatePromptPlain() {
        const parts = [];

        if (inputSubject.value.trim()) parts.push(inputSubject.value.trim());
        if (inputDescription.value.trim()) parts.push(inputDescription.value.trim());

        // Category Order - Updated to match new UI order
        // Use user-defined order
        const categoryOrder = state.categoryOrder || ['hair', 'clothing', 'view', 'shotSize', 'focalLength', 'aperture', 'animeStyle', 'artStyle', 'artist', 'lighting', 'quality'];

        categoryOrder.forEach(catKey => {
            // Predefined tags
            const selectedInCat = Array.from(state.selectedTags)
                .filter(tag => tag.startsWith(catKey + ':'))
                .map(tag => tag.split(':')[1]);

            if (selectedInCat.length > 0) {
                parts.push(selectedInCat.join(', '));
            }

            // Custom tags
            if (state.customTags[catKey]) {
                parts.push(state.customTags[catKey]);
            }
        });

        // Custom Fields
        state.customFields.forEach(field => {
            if (field.enabled !== false && field.key && field.value) {
                parts.push(`${field.value}`);
            }
        });

        return parts.join(', ');
    }

    function generatePromptYAML() {
        let yaml = '';

        // Subject & Description
        if (inputSubject.value.trim()) yaml += `subject: ${inputSubject.value.trim()}\n`;
        if (inputDescription.value.trim()) yaml += `description: ${inputDescription.value.trim()}\n`;

        // Updated order for consistency
        const categoryMapping = {
            'hair': { key: 'hair', label: 'Hair Style' },
            'clothing': { key: 'clothing', label: 'Clothing' },
            'view': { key: 'view', label: 'View' },
            'shotSize': { key: 'shot_size', label: 'Shot Size' },
            'focalLength': { key: 'focal_length', label: 'Focal Length' },
            'aperture': { key: 'aperture', label: 'Aperture' },
            'animeStyle': { key: 'anime_style', label: 'Anime Style' },
            'artStyle': { key: 'art_style', label: 'Art Style' },
            'artist': { key: 'artist', label: 'Artist' },
            'lighting': { key: 'lighting', label: 'Lighting' },
            'quality': { key: 'quality', label: 'Quality' }
        };

        const categoryOrder = state.categoryOrder || ['hair', 'clothing', 'view', 'shotSize', 'focalLength', 'aperture', 'animeStyle', 'artStyle', 'artist', 'lighting', 'quality'];

        categoryOrder.forEach(catKey => {
            const config = categoryMapping[catKey];
            if (!config) return;

            const selectedResults = [];

            // selected tags
            Array.from(state.selectedTags).filter(t => t.startsWith(catKey + ':')).forEach(t => selectedResults.push(t.split(':')[1]));

            // custom tags
            if (state.customTags[catKey]) selectedResults.push(state.customTags[catKey]);

            if (selectedResults.length > 0) {
                yaml += `${config.key}: ${selectedResults.join(', ')}\n`;
            }
        });

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
        // Find last selected tag with an image
        const activeTags = Array.from(document.querySelectorAll('.tag-chip.active'));
        let lastTagWithImage = null;

        // Reverse to find the latest selection
        for (let i = activeTags.length - 1; i >= 0; i--) {
            if (activeTags[i].dataset.image) {
                lastTagWithImage = activeTags[i];
                break; // Found the most recent one (conceptually)
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
            this.isMuted = false;
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.15; // Global volume
                this.masterGain.connect(this.ctx.destination);
                this.initialized = true;
            } catch (e) {
                console.warn("Web Audio API not supported", e);
            }
        }

        toggleMute() {
            this.isMuted = !this.isMuted;
            if (this.initialized) {
                if (this.isMuted) {
                    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
                } else {
                    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                }
            }
            return this.isMuted;
        }

        // 1. Click/Select: High-tech blip
        playClick() {
            if (this.isMuted || !this.initialized) this.init();
            if (this.isMuted) return;

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
            if (this.isMuted || !this.initialized) return; // Don't auto-init on hover to avoid aggressive audio context start

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

        // 3. Success (Copy): Ascending chime
        playSuccess() {
            if (this.isMuted || !this.initialized) this.init();
            if (this.isMuted) return;

            const t = this.ctx.currentTime;

            // Tone 1
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, t); // C5
            gain1.gain.setValueAtTime(0.3, t);
            gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
            osc1.connect(gain1);
            gain1.connect(this.masterGain);
            osc1.start(t);
            osc1.stop(t + 0.4);

            // Tone 2
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(783.99, t + 0.1); // G5
            gain2.gain.setValueAtTime(0.3, t + 0.1);
            gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
            osc2.connect(gain2);
            gain2.connect(this.masterGain);
            osc2.start(t + 0.1);
            osc2.stop(t + 0.5);
        }

        // 4. Toggle/Expand: Whoosh filter sweep
        playToggle() {
            if (this.isMuted || !this.initialized) this.init();
            if (this.isMuted) return;

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
            if (this.isMuted || !this.initialized) this.init();
            if (this.isMuted) return;

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

    const sfx = new SoundManager();

    // --- Init ---

    // Sound Toggle Button
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const iconSound = btnSoundToggle.querySelector('i');

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
        if (e.target.matches('.tag-chip, button, .collapsible-header, .custom-field-checkbox')) {
            sfx.playHover();
        }
    }, true); // Use capture to ensure we catch it

    btnReset.addEventListener('click', () => {
        sfx.playClick();
        const confirmMessage = state.lang === 'zh'
            ? "確定要重置所有設定嗎？\n\n這將會：\n1. 清空所有已選標籤\n2. 清空主詞與描述\n3. 清空自訂欄位\n\n(折疊狀態將會保留)"
            : "Are you sure you want to reset all settings?\n\nThis will:\n1. Clear all selected tags\n2. Clear subject and description\n3. Clear custom fields\n\n(Collapsed states will be preserved)";

        if (confirm(confirmMessage)) {
            sfx.playDelete(); // Play delete sound on confirm
            state.selectedTags.clear();
            state.customFields = [];
            state.customTags = {};
            inputSubject.value = '請畫一張圖';
            inputDescription.value = '';
            inputNegative.value = '';

            document.querySelectorAll('.tag-chip').forEach(chip => chip.classList.remove('active'));
            document.querySelectorAll('.custom-tag-input').forEach(input => input.value = '');

            state.isPreviewLocked = false;
            hidePreview();
            renderCustomFields();
            renderCategories();

            generatePrompt();
            saveState(); // Ensure reset state is saved
        }
    });

    // Copy Button
    btnCopy.addEventListener('click', () => {
        const textToCopy = outputFinal.dataset.plainText || outputFinal.textContent;
        if (!textToCopy) {
            sfx.playDelete(); // Error/Empty sound (reused delete)
            return;
        }
        sfx.playSuccess(); // Success sound
        navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => btnCopy.innerHTML = originalText, 2000);
    });

    inputSubject.addEventListener('input', () => {
        generatePrompt();
        saveState();
    });

    inputDescription.addEventListener('input', () => {
        generatePrompt();
        saveState();
    });

    inputNegative.addEventListener('input', () => {
        saveState(); // just save, no need to regen positive prompt
    });

    langRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            sfx.playClick();
            state.lang = e.target.value;
            renderCategories();
            renderCustomFields();
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
    renderCategories(); // This will attach the click listeners for chips and toggles (we need to modify renderCategories to play sounds)
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

});
