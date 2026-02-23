// ============================================
// Time & Atmosphere Magic Modal — 時間氛圍魔法資料
// 掛載至 window.PromptGen.AtmosphereMagicData
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.AtmosphereMagicData = {

    // ── 時段推桿（5 級）──
    TIME_OF_DAY: [
        { id: 1, label: '日出', en: 'Sunrise', icon: '🌅', value: 'sunrise, dawn, early morning light, golden pink sky' },
        { id: 2, label: '正午', en: 'Noon', icon: '☀️', value: 'noon, midday, bright sunlight, harsh shadows' },
        { id: 3, label: '午後', en: 'Afternoon', icon: '🌤', value: 'afternoon, warm light, soft shadows, late day' },
        { id: 4, label: '日落', en: 'Sunset', icon: '🌇', value: 'sunset, dusk, golden hour, orange sky, evening glow' },
        { id: 5, label: '夜晚', en: 'Night', icon: '🌙', value: 'nighttime, dark, night sky, moonlight, starlight' }
    ],

    // ── 天氣推桿（5 級）──
    WEATHER_OPTIONS: [
        { id: 1, label: '晴天', en: 'Sunny', icon: '☀️', value: 'sunny, clear sky, bright weather' },
        { id: 2, label: '微雨', en: 'Light Rain', icon: '🌦', value: 'light rain, drizzle, gentle rainfall' },
        { id: 3, label: '雪天', en: 'Snowy', icon: '❄️', value: 'snowing, snowfall, winter snow, white landscape' },
        { id: 4, label: '霧天', en: 'Foggy', icon: '🌫', value: 'foggy, thick mist, low visibility, hazy atmosphere' },
        { id: 5, label: '陰天', en: 'Cloudy', icon: '☁️', value: 'cloudy, overcast, grey sky, diffused light' }
    ],

    // ── 分類 Tabs（四層結構）──
    TABS: [
        { id: 'all', label: '全部', en: 'All', icon: '✨' },
        { id: 'recent', label: '最近', en: 'Recent', icon: '🕐' },
        { id: 'hot', label: '熱門', en: 'Hot', icon: '🔥' },
        { id: 'storm', label: '風暴', en: 'Storm', icon: '⛈' },
        { id: 'light', label: '光影', en: 'Light', icon: '🌈' },
        { id: 'rain', label: '降水', en: 'Rain', icon: '💧' },
        { id: 'wind', label: '風系', en: 'Wind', icon: '🌬' },
        { id: 'mist', label: '塵霧', en: 'Mist', icon: '🌫' },
        { id: 'celestial', label: '月星', en: 'Celestial', icon: '🌙' },
        { id: 'seasonal', label: '季節', en: 'Seasonal', icon: '🍂' },
        { id: 'temperature', label: '溫度', en: 'Temp', icon: '🔥' },
        { id: 'fantasy', label: '夢幻', en: 'Fantasy', icon: '✨' }
    ],

    // ── Top 20 熱門特效 ──
    HOT_ITEMS: [
        'lightning_storm', 'aurora_borealis', 'heavy_rain', 'cherry_blossom_fall',
        'meteor_shower', 'full_moon', 'rainbow', 'firefly_glow',
        'strong_wind', 'morning_mist', 'sandstorm', 'blood_moon',
        'snowstorm', 'tyndall', 'falling_leaves', 'heat_haze',
        'magic_particles', 'milky_way', 'tornado', 'volcanic_ash'
    ],

    // ══════════════════════════════════════════════
    // 天象特效（共 100 項，9 大分類）
    // ══════════════════════════════════════════════
    ITEMS: [
        // ══════════════════════════════════════
        // ⛈ 風暴 (storm) — 12 items
        // ══════════════════════════════════════
        { id: 'lightning_storm', label: '雷暴閃電', en: 'Lightning Storm', value: 'lightning storm, thunderbolts, flash of lightning, dramatic sky', category: 'storm' },
        { id: 'tornado', label: '龍捲風', en: 'Tornado', value: 'tornado, twister, whirlwind funnel, debris flying', category: 'storm' },
        { id: 'hurricane', label: '颶風', en: 'Hurricane', value: 'hurricane, cyclone, violent storm, howling winds', category: 'storm' },
        { id: 'thunderstorm', label: '暴風雨', en: 'Thunderstorm', value: 'thunderstorm, heavy rain with thunder, dark storm clouds', category: 'storm' },
        { id: 'thunder_rumble', label: '悶雷滾動', en: 'Rolling Thunder', value: 'rolling thunder, rumbling sky, ominous thunderclouds', category: 'storm' },
        { id: 'lightning_bolt', label: '落雷', en: 'Lightning Bolt', value: 'single lightning bolt, striking ground, electric flash', category: 'storm' },
        { id: 'electric_storm', label: '電暴', en: 'Electric Storm', value: 'electric storm, multiple lightning, plasma discharge, purple sky', category: 'storm' },
        { id: 'typhoon', label: '颱風', en: 'Typhoon', value: 'typhoon, massive storm, swirling clouds, torrential wind and rain', category: 'storm' },
        { id: 'supercell', label: '超級單體風暴', en: 'Supercell', value: 'supercell storm, massive rotating thunderstorm, wall cloud', category: 'storm' },
        { id: 'waterspout', label: '水龍捲', en: 'Waterspout', value: 'waterspout, ocean tornado, water funnel over sea', category: 'storm' },
        { id: 'hailstorm', label: '冰雹暴', en: 'Hailstorm', value: 'hailstorm, large hailstones, ice pellets, destructive storm', category: 'storm' },
        { id: 'storm_eye', label: '暴風眼', en: 'Eye of Storm', value: 'eye of the storm, calm center, swirling clouds around clear sky', category: 'storm' },

        // ══════════════════════════════════════
        // 🌈 光影 (light) — 12 items
        // ══════════════════════════════════════
        { id: 'rainbow', label: '彩虹', en: 'Rainbow', value: 'rainbow, colorful arc in sky, after rain', category: 'light' },
        { id: 'double_rainbow', label: '雙彩虹', en: 'Double Rainbow', value: 'double rainbow, twin arcs, magnificent sky', category: 'light' },
        { id: 'aurora_borealis', label: '極光', en: 'Aurora Borealis', value: 'aurora borealis, northern lights, green purple curtains in sky', category: 'light' },
        { id: 'tyndall', label: '丁達爾效應', en: 'Tyndall Effect', value: 'tyndall effect, god rays, light beams through clouds, crepuscular rays', category: 'light' },
        { id: 'sun_halo', label: '日暈', en: 'Sun Halo', value: 'sun halo, solar halo, circular rainbow around sun', category: 'light' },
        { id: 'moon_halo', label: '月暈', en: 'Moon Halo', value: 'moon halo, lunar halo, ring around moon, night sky', category: 'light' },
        { id: 'sun_pillar', label: '日柱', en: 'Sun Pillar', value: 'sun pillar, vertical beam of light, ice crystal reflection', category: 'light' },
        { id: 'neon_reflection', label: '霓虹反光', en: 'Neon Reflections', value: 'neon reflections on wet surface, colorful light puddles, cyberpunk mood', category: 'light' },
        { id: 'lens_flare', label: '光暈耀斑', en: 'Lens Flare', value: 'lens flare, sun flare, bright light streaks, cinematic', category: 'light' },
        { id: 'light_shaft', label: '光柱穿雲', en: 'Light Shaft', value: 'light shaft through clouds, heavenly beam, dramatic illumination', category: 'light' },
        { id: 'golden_glow', label: '金色光輝', en: 'Golden Glow', value: 'golden glow, warm golden light, ethereal radiance', category: 'light' },
        { id: 'twilight_gradient', label: '暮光漸層', en: 'Twilight Gradient', value: 'twilight gradient sky, blue to orange, beautiful dusk colors', category: 'light' },

        // ══════════════════════════════════════
        // 💧 降水 (rain) — 11 items
        // ══════════════════════════════════════
        { id: 'drizzle', label: '毛毛細雨', en: 'Drizzle', value: 'drizzle, fine rain, gentle mist rain, soft rainfall', category: 'rain' },
        { id: 'heavy_rain', label: '傾盆大雨', en: 'Heavy Rain', value: 'heavy rain, downpour, torrential rain, drenching', category: 'rain' },
        { id: 'freezing_rain', label: '凍雨', en: 'Freezing Rain', value: 'freezing rain, ice rain, sleet, icy precipitation', category: 'rain' },
        { id: 'snowfall', label: '雪花飄落', en: 'Snowfall', value: 'gentle snowfall, snow flakes falling, peaceful winter', category: 'rain' },
        { id: 'snowstorm', label: '暴風雪', en: 'Snowstorm', value: 'snowstorm, blizzard, whiteout, fierce snow and wind', category: 'rain' },
        { id: 'sleet', label: '雨夾雪', en: 'Sleet', value: 'sleet, mixed rain and snow, cold precipitation', category: 'rain' },
        { id: 'rain_on_window', label: '窗上雨滴', en: 'Rain on Window', value: 'rain drops on window glass, water streaks on glass, cozy inside', category: 'rain' },
        { id: 'rain_puddles', label: '雨中水窪', en: 'Rain Puddles', value: 'rain puddles, water reflections on ground, splashing', category: 'rain' },
        { id: 'monsoon', label: '季風暴雨', en: 'Monsoon', value: 'monsoon rain, tropical downpour, endless heavy rainfall', category: 'rain' },
        { id: 'acid_rain', label: '酸雨', en: 'Acid Rain', value: 'acid rain, toxic rainfall, polluted sky, dystopian atmosphere', category: 'rain' },
        { id: 'diamond_dust', label: '鑽石塵', en: 'Diamond Dust', value: 'diamond dust, tiny ice crystals floating in air, sparkling', category: 'rain' },

        // ══════════════════════════════════════
        // 🌬 風系 (wind) — 11 items
        // ══════════════════════════════════════
        { id: 'strong_wind', label: '強烈逆風', en: 'Strong Headwind', value: 'strong headwind, hair blown back, clothes fluttering violently', category: 'wind' },
        { id: 'gentle_breeze', label: '微風輕拂', en: 'Gentle Breeze', value: 'gentle breeze, soft wind, hair gently swaying', category: 'wind' },
        { id: 'dust_devil', label: '飛沙走石', en: 'Dust Devil', value: 'dust devil, swirling dust, small whirlwind, sand particles', category: 'wind' },
        { id: 'hair_flowing', label: '髮絲飄揚', en: 'Hair Flowing', value: 'hair flowing in wind, dynamic hair movement, windswept', category: 'wind' },
        { id: 'sea_breeze', label: '海風', en: 'Sea Breeze', value: 'sea breeze, ocean wind, salty air, coastal wind', category: 'wind' },
        { id: 'gale_force', label: '暴風突襲', en: 'Gale Force', value: 'gale force wind, extremely strong wind, debris flying, bending trees', category: 'wind' },
        { id: 'autumn_wind', label: '秋風蕭瑟', en: 'Autumn Wind', value: 'autumn wind, cold breeze, leaves carried by wind, desolate', category: 'wind' },
        { id: 'whirlwind', label: '旋風', en: 'Whirlwind', value: 'whirlwind, spinning air current, circular wind, vortex', category: 'wind' },
        { id: 'cloth_flutter', label: '衣袂飄飄', en: 'Fabric Flutter', value: 'clothes fluttering in wind, fabric rippling, cape flowing', category: 'wind' },
        { id: 'petal_wind', label: '花瓣隨風', en: 'Petal Wind', value: 'petals carried by wind, flower petals drifting, romantic wind', category: 'wind' },
        { id: 'mountain_wind', label: '山嵐', en: 'Mountain Wind', value: 'mountain wind, alpine breeze, misty mountain air, highland gust', category: 'wind' },

        // ══════════════════════════════════════
        // 🌫 塵霧 (mist) — 10 items
        // ══════════════════════════════════════
        { id: 'sandstorm', label: '沙塵暴', en: 'Sandstorm', value: 'sandstorm, dust storm, sand blowing, desert storm, low visibility', category: 'mist' },
        { id: 'volcanic_ash', label: '火山灰', en: 'Volcanic Ash', value: 'volcanic ash falling, ash clouds, volcanic eruption aftermath', category: 'mist' },
        { id: 'dense_fog', label: '濃霧', en: 'Dense Fog', value: 'dense fog, thick fog, zero visibility, eerie atmosphere', category: 'mist' },
        { id: 'morning_mist', label: '晨霧', en: 'Morning Mist', value: 'morning mist, early fog, dewy haze, peaceful dawn mist', category: 'mist' },
        { id: 'smoke_haze', label: '煙霾', en: 'Smoke Haze', value: 'smoke haze, smog, polluted air, grey atmosphere', category: 'mist' },
        { id: 'steam_vent', label: '蒸氣噴湧', en: 'Steam Vent', value: 'steam venting, hot steam rising, geothermal steam, misty vapor', category: 'mist' },
        { id: 'sea_fog', label: '海霧', en: 'Sea Fog', value: 'sea fog, maritime mist, coastal fog, ocean haze', category: 'mist' },
        { id: 'forest_mist', label: '森林迷霧', en: 'Forest Mist', value: 'forest mist, woodland fog, mystical forest haze, light filtering through', category: 'mist' },
        { id: 'war_smoke', label: '戰場硝煙', en: 'Battlefield Smoke', value: 'battlefield smoke, war haze, gunpowder smoke, dust of battle', category: 'mist' },
        { id: 'incense_smoke', label: '香煙裊裊', en: 'Incense Smoke', value: 'incense smoke, thin wispy smoke, fragrant haze, temple atmosphere', category: 'mist' },

        // ══════════════════════════════════════
        // 🌙 月星 (celestial) — 12 items
        // ══════════════════════════════════════
        { id: 'full_moon', label: '滿月', en: 'Full Moon', value: 'full moon, bright moonlight, large moon in sky', category: 'celestial' },
        { id: 'crescent_moon', label: '新月', en: 'Crescent Moon', value: 'crescent moon, thin moon, new moon, delicate lunar arc', category: 'celestial' },
        { id: 'blood_moon', label: '血月', en: 'Blood Moon', value: 'blood moon, red moon, lunar eclipse, crimson moonlight', category: 'celestial' },
        { id: 'milky_way', label: '銀河', en: 'Milky Way', value: 'milky way, galaxy, countless stars, cosmic river of light', category: 'celestial' },
        { id: 'meteor_shower', label: '流星雨', en: 'Meteor Shower', value: 'meteor shower, shooting stars, streaks of light across sky', category: 'celestial' },
        { id: 'starry_sky', label: '繁星滿天', en: 'Starry Sky', value: 'starry sky, thousands of stars, clear star-filled night', category: 'celestial' },
        { id: 'eclipse', label: '日蝕', en: 'Solar Eclipse', value: 'solar eclipse, sun blocked by moon, corona visible, dramatic sky', category: 'celestial' },
        { id: 'comet', label: '彗星', en: 'Comet', value: 'comet in sky, bright tail, celestial visitor, streaming light', category: 'celestial' },
        { id: 'constellation', label: '星座閃耀', en: 'Constellation', value: 'constellations visible, star patterns, connected stars in sky', category: 'celestial' },
        { id: 'moonbeam', label: '月光灑落', en: 'Moonbeam', value: 'moonbeams, silver moonlight streaming down, lunar illumination', category: 'celestial' },
        { id: 'planet_visible', label: '行星可見', en: 'Visible Planets', value: 'planets visible in sky, jupiter saturn, bright celestial bodies', category: 'celestial' },
        { id: 'zodiac_light', label: '黃道光', en: 'Zodiacal Light', value: 'zodiacal light, faint triangular glow, pre-dawn sky', category: 'celestial' },

        // ══════════════════════════════════════
        // 🍂 季節 (seasonal) — 11 items
        // ══════════════════════════════════════
        { id: 'cherry_blossom_fall', label: '櫻花飄落', en: 'Cherry Blossom', value: 'cherry blossom petals falling, sakura, pink petals drifting', category: 'seasonal' },
        { id: 'falling_leaves', label: '落葉飛舞', en: 'Falling Leaves', value: 'autumn leaves falling, colorful leaves drifting, orange red brown', category: 'seasonal' },
        { id: 'firefly_glow', label: '螢火蟲', en: 'Fireflies', value: 'fireflies, glowing bugs, bioluminescent insects, summer night', category: 'seasonal' },
        { id: 'frost', label: '霜降', en: 'Frost', value: 'frost, ice crystals on surfaces, frozen morning, white frost coating', category: 'seasonal' },
        { id: 'spring_bloom', label: '百花綻放', en: 'Spring Bloom', value: 'spring flowers blooming, colorful blossoms, fresh green shoots', category: 'seasonal' },
        { id: 'summer_heat', label: '盛夏蟬鳴', en: 'Summer Cicadas', value: 'hot summer day, cicada singing, lush green, intense sunlight', category: 'seasonal' },
        { id: 'autumn_sunset', label: '秋日夕照', en: 'Autumn Sunset', value: 'autumn sunset, warm orange light, golden leaves, harvest season', category: 'seasonal' },
        { id: 'winter_frost', label: '冬雪覆蓋', en: 'Winter Cover', value: 'winter snow covering everything, white landscape, bare trees, cold', category: 'seasonal' },
        { id: 'maple_red', label: '紅楓', en: 'Red Maple', value: 'red maple leaves, Japanese autumn, momiji, crimson foliage', category: 'seasonal' },
        { id: 'dandelion_seeds', label: '蒲公英飛絮', en: 'Dandelion Seeds', value: 'dandelion seeds floating, fluffy seeds drifting, gentle wind', category: 'seasonal' },
        { id: 'wisteria_rain', label: '紫藤花雨', en: 'Wisteria Rain', value: 'wisteria flowers hanging, purple flower cascade, fragrant rain', category: 'seasonal' },

        // ══════════════════════════════════════
        // 🔥 溫度 (temperature) — 8 items
        // ══════════════════════════════════════
        { id: 'breath_mist', label: '呼氣白霧', en: 'Breath Mist', value: 'visible breath, cold air, white breath mist, freezing temperature', category: 'temperature' },
        { id: 'heat_haze', label: '熱浪扭曲', en: 'Heat Haze', value: 'heat haze, hot air distortion, shimmering mirage, scorching', category: 'temperature' },
        { id: 'ice_crystal', label: '冰霜結晶', en: 'Ice Crystal', value: 'ice crystals forming, frost patterns, frozen surface detail', category: 'temperature' },
        { id: 'steam_rise', label: '蒸氣上升', en: 'Rising Steam', value: 'steam rising, hot steam, water vapor, warmth visible', category: 'temperature' },
        { id: 'frozen_world', label: '極寒世界', en: 'Frozen World', value: 'extreme cold, frozen everything, icicles, permafrost landscape', category: 'temperature' },
        { id: 'desert_heat', label: '沙漠酷熱', en: 'Desert Heat', value: 'desert heat, scorching sun, heat waves, arid landscape', category: 'temperature' },
        { id: 'melting_ice', label: '冰雪融化', en: 'Melting Ice', value: 'melting ice, thawing snow, water dripping, spring melt', category: 'temperature' },
        { id: 'volcanic_heat', label: '火山熔岩', en: 'Volcanic Lava', value: 'volcanic lava glow, molten rock, extreme heat, magma light', category: 'temperature' },

        // ══════════════════════════════════════
        // ✨ 夢幻 (fantasy) — 13 items
        // ══════════════════════════════════════
        { id: 'magic_particles', label: '魔法粒子', en: 'Magic Particles', value: 'magic particles, floating sparkles, mystical glowing motes', category: 'fantasy' },
        { id: 'space_rift', label: '時空裂縫', en: 'Space Rift', value: 'space-time rift, dimensional crack, portal tear, reality fracture', category: 'fantasy' },
        { id: 'apocalypse_sky', label: '末日天空', en: 'Apocalypse Sky', value: 'apocalyptic sky, burning sky, red clouds, end of world atmosphere', category: 'fantasy' },
        { id: 'light_pillar', label: '光之柱', en: 'Light Pillar', value: 'pillar of light, divine beam, heavenly column, ascending light', category: 'fantasy' },
        { id: 'energy_field', label: '能量場', en: 'Energy Field', value: 'energy field, magical barrier, force field, glowing dome', category: 'fantasy' },
        { id: 'floating_island', label: '浮空島', en: 'Floating Islands', value: 'floating islands in sky, gravity-defying landmasses, fantasy world', category: 'fantasy' },
        { id: 'spirit_wisps', label: '靈魂火焰', en: 'Spirit Wisps', value: 'spirit wisps, ghost fire, will-o-wisp, ethereal floating flames', category: 'fantasy' },
        { id: 'crystal_rain', label: '水晶雨', en: 'Crystal Rain', value: 'crystal rain, gemstone rainfall, sparkling magical precipitation', category: 'fantasy' },
        { id: 'shadow_realm', label: '暗影領域', en: 'Shadow Realm', value: 'shadow realm, dark dimension, consuming darkness, void energy', category: 'fantasy' },
        { id: 'celestial_gate', label: '天界之門', en: 'Celestial Gate', value: 'heavenly gate in sky, divine portal, golden archway in clouds', category: 'fantasy' },
        { id: 'time_stop', label: '時間停止', en: 'Time Stop', value: 'time frozen, suspended particles, frozen raindrops, still moment', category: 'fantasy' },
        { id: 'rune_sky', label: '符文天空', en: 'Rune Sky', value: 'magical runes in sky, glowing symbols, arcane letters floating', category: 'fantasy' },
        { id: 'rainbow_aurora', label: '幻彩極光', en: 'Rainbow Aurora', value: 'rainbow aurora, multicolored sky phenomenon, magical colorful lights', category: 'fantasy' }
    ]
};
