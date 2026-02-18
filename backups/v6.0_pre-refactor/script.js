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
        // ── 經典奇幻 Top 20 ──
        { label: '人類', en: 'Human', value: 'human' },
        { label: '精靈', en: 'Elf', value: 'elf, pointed ears' },
        { label: '天使', en: 'Angel', value: 'angel, white wings, halo' },
        { label: '惡魔', en: 'Demon', value: 'demon, horns, wings, tail' },
        { label: '吸血鬼', en: 'Vampire', value: 'vampire, pale skin, red eyes, fangs' },
        { label: '魅魔', en: 'Succubus', value: 'succubus, bat wings, heart tail' },
        { label: '龍人', en: 'Dragon', value: 'dragon girl, dragon horns, tail, scales' },
        { label: '妖精', en: 'Fairy', value: 'fairy, small wings, tiny body, glowing' },
        { label: '人魚', en: 'Mermaid', value: 'mermaid, fish tail, underwater' },
        { label: '幽靈', en: 'Ghost', value: 'ghost, translucent, spirit, floating' },
        { label: '機器人', en: 'Android', value: 'android, robot, mechanical parts' },
        { label: '獸人', en: 'Kemonomimi', value: 'kemonomimi, animal ears, tail' },
        { label: '矮人', en: 'Dwarf', value: 'dwarf, short, stocky' },
        { label: '半獸人', en: 'Orc', value: 'orc, green skin, tusks' },
        { label: '殭屍', en: 'Zombie', value: 'zombie, pale, undead' },
        { label: '外星人', en: 'Alien', value: 'alien, extraterrestrial' },
        { label: '史萊姆', en: 'Slime', value: 'slime girl, translucent skin' },
        { label: '兔女郎', en: 'Bunny Girl', value: 'bunny girl, rabbit ears' },
        { label: '狐娘', en: 'Fox Girl', value: 'fox girl, fox ears, multiple tails' },
        { label: '貓娘', en: 'Cat Girl', value: 'cat girl, cat ears, cat tail' },
        // ── 獸耳系 (Kemonomimi) ──
        { label: '犬娘', en: 'Dog Girl', value: 'dog girl, dog ears, dog tail, floppy ears' },
        { label: '狼女', en: 'Wolf Girl', value: 'wolf girl, wolf ears, wolf tail, fierce' },
        { label: '虎娘', en: 'Tiger Girl', value: 'tiger girl, tiger ears, tiger tail, striped' },
        { label: '馬娘', en: 'Horse Girl', value: 'horse girl, horse ears, horse tail' },
        { label: '蛇娘', en: 'Snake Girl', value: 'lamia, snake girl, snake tail, scales' },
        { label: '蜘蛛娘', en: 'Spider Girl', value: 'arachne, spider girl, spider legs, web' },
        { label: '鳥人', en: 'Harpy', value: 'harpy, bird wings, feathered arms, talons' },
        { label: '蝙蝠娘', en: 'Bat Girl', value: 'bat girl, bat wings, bat ears, nocturnal' },
        { label: '鼠娘', en: 'Mouse Girl', value: 'mouse girl, mouse ears, small, mouse tail' },
        { label: '羊娘', en: 'Sheep Girl', value: 'sheep girl, sheep horns, fluffy, wool' },
        { label: '鯊魚娘', en: 'Shark Girl', value: 'shark girl, shark tail, sharp teeth, fin' },
        { label: '鹿娘', en: 'Deer Girl', value: 'deer girl, antlers, deer ears, gentle' },
        { label: '熊娘', en: 'Bear Girl', value: 'bear girl, bear ears, strong, fluffy' },
        { label: '獅娘', en: 'Lion Girl', value: 'lion girl, lion ears, mane, lion tail' },
        { label: '松鼠娘', en: 'Squirrel Girl', value: 'squirrel girl, bushy tail, squirrel ears' },
        { label: '孔雀娘', en: 'Peacock Girl', value: 'peacock girl, peacock feathers, elegant' },
        { label: '鶴娘', en: 'Crane Girl', value: 'crane girl, crane wings, white feathers, graceful' },
        { label: '蜥蜴娘', en: 'Lizard Girl', value: 'lizard girl, scales, tail, reptilian' },
        { label: '章魚娘', en: 'Octopus Girl', value: 'octopus girl, tentacles, sea creature' },
        { label: '蜜蜂娘', en: 'Bee Girl', value: 'bee girl, bee wings, antennae, striped' },
        // ── 日本妖怪系 ──
        { label: '九尾狐', en: 'Kitsune', value: 'kitsune, nine tails, fox ears, mystical' },
        { label: '鬼 (日本)', en: 'Oni', value: 'oni, single horn, red skin, fearsome' },
        { label: '天狗', en: 'Tengu', value: 'tengu, crow wings, long nose, mountain spirit' },
        { label: '河童', en: 'Kappa', value: 'kappa, turtle shell, water creature, beak' },
        { label: '雪女', en: 'Yuki-onna', value: 'yuki-onna, ice spirit, pale skin, snow, cold' },
        { label: '化猫', en: 'Bakeneko', value: 'bakeneko, cat spirit, two tails, supernatural cat' },
        { label: '座敷童子', en: 'Zashiki-warashi', value: 'zashiki-warashi, child spirit, kimono, playful ghost' },
        { label: '般若', en: 'Hannya', value: 'hannya, demon mask, horns, jealous spirit' },
        { label: '絡新婦', en: 'Jorogumo', value: 'jorogumo, spider woman, beautiful, web' },
        { label: '天女', en: 'Tennin', value: 'tennin, celestial maiden, feathered robe, flying' },
        { label: '鎌鼬', en: 'Kamaitachi', value: 'kamaitachi, weasel spirit, wind blade, swift' },
        { label: '付喪神', en: 'Tsukumogami', value: 'tsukumogami, object spirit, animated object' },
        { label: '鵺', en: 'Nue', value: 'nue, chimera, monkey head, snake tail, tanuki body' },
        { label: '白面金毛九尾', en: 'Tamamo-no-Mae', value: 'tamamo-no-mae, golden fox, nine tails, divine' },
        { label: '百鬼夜行', en: 'Hyakki Yagyo', value: 'yokai parade, ghostly procession, supernatural' },
        { label: '玉藻前', en: 'Lady Fox Spirit', value: 'fox spirit, golden fur, elegant, mystical shrine maiden' },
        // ── 神話・聖域 ──
        { label: '半神', en: 'Demigod', value: 'demigod, divine aura, godly, heroic' },
        { label: '墮天使', en: 'Fallen Angel', value: 'fallen angel, black wings, broken halo, dark' },
        { label: '女武神', en: 'Valkyrie', value: 'valkyrie, winged helm, norse, warrior maiden' },
        { label: '半人馬', en: 'Centaur', value: 'centaur, horse body, human torso' },
        { label: '美杜莎', en: 'Medusa', value: 'medusa, snake hair, gorgon, petrifying gaze' },
        { label: '獅鷲', en: 'Griffin Rider', value: 'griffin rider, eagle head, lion body, majestic' },
        { label: '鳳凰', en: 'Phoenix', value: 'phoenix girl, fire wings, rebirth, flame feathers' },
        { label: '獨角獸', en: 'Unicorn', value: 'unicorn girl, horn, pure white, magical' },
        { label: '人面獅身', en: 'Sphinx', value: 'sphinx, lion body, human face, riddle, ancient' },
        { label: '塞壬', en: 'Siren', value: 'siren, singing, ocean, enchanting voice, feathered' },
        { label: '米諾陶洛斯', en: 'Minotaur', value: 'minotaur, bull head, labyrinth, muscular' },
        { label: '九頭蛇', en: 'Hydra', value: 'hydra, multiple heads, serpentine, regenerating' },
        { label: '奇美拉', en: 'Chimera', value: 'chimera, lion head, goat body, snake tail' },
        { label: '刻耳柏洛斯', en: 'Cerberus', value: 'cerberus girl, three heads, guard dog, underworld' },
        { label: '天馬', en: 'Pegasus', value: 'pegasus girl, winged horse, flying, majestic' },
        { label: '寧芙', en: 'Nymph', value: 'nymph, nature spirit, beautiful, forest' },
        { label: '薩提爾', en: 'Satyr', value: 'satyr, goat legs, pan flute, woodland' },
        { label: '巨人', en: 'Giant', value: 'giant, colossal, towering, massive' },
        // ── 元素精靈 ──
        { label: '火精靈', en: 'Fire Spirit', value: 'fire spirit, flame body, ember eyes, burning' },
        { label: '水精靈', en: 'Water Spirit', value: 'water spirit, aqua body, flowing, transparent' },
        { label: '風精靈', en: 'Wind Spirit', value: 'wind spirit, air elemental, floating, breezy' },
        { label: '土精靈', en: 'Earth Spirit', value: 'earth spirit, stone skin, crystal, nature' },
        { label: '雷精靈', en: 'Thunder Spirit', value: 'thunder spirit, lightning, electric, sparking' },
        { label: '冰精靈', en: 'Ice Spirit', value: 'ice spirit, frozen, crystal clear, frost' },
        { label: '光精靈', en: 'Light Spirit', value: 'light spirit, radiant, glowing, luminous' },
        { label: '暗精靈', en: 'Dark Spirit', value: 'dark spirit, shadow, void, mysterious darkness' },
        { label: '花精靈', en: 'Flower Spirit', value: 'flower spirit, petal skin, blooming, fragrant' },
        { label: '星精靈', en: 'Star Spirit', value: 'star spirit, stellar, cosmic glow, stardust' },
        // ── 精靈族變種 ──
        { label: '暗黑精靈', en: 'Dark Elf', value: 'dark elf, drow, dark skin, white hair, red eyes' },
        { label: '高等精靈', en: 'High Elf', value: 'high elf, noble, ancient, golden hair, regal' },
        { label: '木精靈', en: 'Wood Elf', value: 'wood elf, forest, green attire, nature bond' },
        { label: '月精靈', en: 'Moon Elf', value: 'moon elf, silver hair, moonlight, ethereal' },
        { label: '海精靈', en: 'Sea Elf', value: 'sea elf, aquatic, blue skin, gills, underwater' },
        { label: '血精靈', en: 'Blood Elf', value: 'blood elf, glowing eyes, arcane, elegant' },
        { label: '太陽精靈', en: 'Sun Elf', value: 'sun elf, golden skin, radiant, solar magic' },
        // ── 不死族 ──
        { label: '骷髏', en: 'Skeleton', value: 'skeleton, bone, undead, hollow eyes' },
        { label: '巫妖', en: 'Lich', value: 'lich, undead mage, phylactery, dark magic' },
        { label: '木乃伊', en: 'Mummy', value: 'mummy, bandaged, ancient, cursed' },
        { label: '死靈', en: 'Wraith', value: 'wraith, shadow undead, incorporeal, dark cloak' },
        { label: '死神', en: 'Grim Reaper', value: 'grim reaper, scythe, black cloak, death' },
        { label: '屍鬼', en: 'Ghoul', value: 'ghoul, undead, feral, flesh eater' },
        { label: '亡靈騎士', en: 'Death Knight', value: 'death knight, black armor, undead warrior, cursed sword' },
        { label: '骸骨龍', en: 'Dracolich', value: 'dracolich, skeletal dragon, undead dragon, dark' },
        // ── 龍族變種 ──
        { label: '古龍', en: 'Elder Dragon', value: 'elder dragon, ancient dragon, wise, massive' },
        { label: '飛龍', en: 'Wyvern', value: 'wyvern, two-legged dragon, wings, fierce' },
        { label: '龍族公主', en: 'Dragon Princess', value: 'dragon princess, dragon horns, royal, scales, elegant' },
        { label: '冰龍', en: 'Ice Dragon', value: 'ice dragon, frost breath, frozen scales, arctic' },
        { label: '火龍', en: 'Fire Dragon', value: 'fire dragon, flame breath, molten scales, volcanic' },
        { label: '東方龍', en: 'Eastern Dragon', value: 'eastern dragon, chinese dragon, serpentine, whiskers, clouds' },
        // ── 惡魔系 ──
        { label: '大惡魔', en: 'Arch Demon', value: 'arch demon, massive wings, burning eyes, infernal' },
        { label: '夢魔', en: 'Nightmare', value: 'nightmare demon, dream eater, sleep, dark mist' },
        { label: '小惡魔', en: 'Imp', value: 'imp, small demon, mischievous, tiny wings' },
        { label: '夜叉', en: 'Yaksha', value: 'yaksha, nature demon, fierce guardian, fangs' },
        { label: '羅剎', en: 'Rakshasa', value: 'rakshasa, shape-shifting demon, tiger claws, illusion' },
        { label: '阿修羅', en: 'Asura', value: 'asura, multiple arms, warrior demon, fierce' },
        { label: '魔王', en: 'Demon Lord', value: 'demon lord, crown, throne, overwhelming power' },
        // ── 天族・神族 ──
        { label: '神族', en: 'Deity', value: 'deity, divine being, golden aura, omnipotent' },
        { label: '精霊', en: 'Spirit', value: 'spirit, ethereal, natural force, transparent' },
        { label: '仙人', en: 'Xian', value: 'xian, immortal, taoist, cloud riding, mystical' },
        { label: '天人', en: 'Celestial', value: 'celestial being, heavenly, divine robes, halo' },
        { label: '神靈', en: 'Kami', value: 'kami, shinto spirit, sacred, divine presence' },
        // ── 植物・自然族 ──
        { label: '花妖', en: 'Flower Yokai', value: 'flower yokai, petal body, blooming, nature spirit' },
        { label: '蘑菇娘', en: 'Mushroom Girl', value: 'mushroom girl, mushroom cap, spore, forest' },
        { label: '曼德拉草', en: 'Mandragora', value: 'mandragora, plant girl, root body, screaming' },
        { label: '樹人', en: 'Treant', value: 'treant, tree person, bark skin, ancient forest' },
        { label: '藤蔓精', en: 'Vine Spirit', value: 'vine spirit, ivy body, thorns, green' },
        { label: '花嫁精靈', en: 'Alraune', value: 'alraune, flower girl, sitting in flower, nectar' },
        // ── 水棲・海洋族 ──
        { label: '海龍', en: 'Sea Dragon', value: 'sea dragon, ocean serpent, aquatic scales, deep sea' },
        { label: '水妖', en: 'Undine', value: 'undine, water nymph, aquatic, flowing hair' },
        { label: '水母娘', en: 'Jellyfish Girl', value: 'jellyfish girl, translucent, tentacles, glowing' },
        { label: '海妖', en: 'Kraken Girl', value: 'kraken girl, tentacles, deep sea, massive' },
        { label: '珊瑚精', en: 'Coral Spirit', value: 'coral spirit, reef body, colorful, ocean' },
        { label: '深海魚人', en: 'Deep One', value: 'deep one, fish person, bioluminescent, abyssal' },
        // ── 機械・科幻系 ──
        { label: '賽博格', en: 'Cyborg', value: 'cyborg, cybernetic, half machine, glowing circuits' },
        { label: '機械天使', en: 'Mecha Angel', value: 'mecha angel, mechanical wings, holy machine, futuristic' },
        { label: '人造人', en: 'Homunculus', value: 'homunculus, artificial being, alchemical, flask born' },
        { label: '虛擬偶像', en: 'Virtual Idol', value: 'virtual idol, digital, hologram, neon, vocaloid-like' },
        { label: '奈米機器人', en: 'Nano Being', value: 'nano being, nanomachine body, shapeshifting, tech' },
        { label: '太空精靈', en: 'Space Elf', value: 'space elf, cosmic, futuristic elf, star ship' },
        // ── 異形・變異 ──
        { label: '影人', en: 'Shadow Person', value: 'shadow person, living shadow, dark silhouette' },
        { label: '多腳種', en: 'Multi-limbed', value: 'multi-armed, extra limbs, multiple arms' },
        { label: '結晶體', en: 'Crystal Being', value: 'crystal being, gem body, prismatic, reflective' },
        { label: '泥偶', en: 'Golem', value: 'golem, stone body, magical construct, rune inscribed' },
        { label: '寄生體', en: 'Parasite Host', value: 'parasitic symbiont, alien growth, merged being' },
        { label: '鏡像', en: 'Mirror Being', value: 'mirror being, reflective skin, doppelganger, silver' },
        // ── 西洋奇幻追加 ──
        { label: '地精', en: 'Goblin', value: 'goblin, small, green, pointy ears, mischievous' },
        { label: '巨魔', en: 'Troll', value: 'troll, regenerating, large, bridge guardian' },
        { label: '變形者', en: 'Shapeshifter', value: 'shapeshifter, morphing, fluid form, disguise' },
        { label: '狼人', en: 'Werewolf', value: 'werewolf, wolf transformation, moonlight, feral' },
        { label: '石像鬼', en: 'Gargoyle', value: 'gargoyle, stone wings, perched, gothic' },
        { label: '食人魔', en: 'Ogre', value: 'ogre, large, brute, club wielding' },
        { label: '拉蜜亞', en: 'Lamia', value: 'lamia, snake lower body, seductive, coiling' },
        { label: '地侏', en: 'Gnome', value: 'gnome, tiny, earth magic, mushroom hat' },
        { label: '夜魔', en: 'Night Hag', value: 'night hag, nightmare, dark magic, crone' },
        { label: '刺客蟲', en: 'Thri-kreen', value: 'insectoid, mantis arms, compound eyes, chitin' },
        // ── 東方神話追加 ──
        { label: '白蛇', en: 'White Serpent', value: 'white snake spirit, elegant, chinese mythology, divine serpent' },
        { label: '嫦娥', en: "Chang'e", value: 'chang-e, moon goddess, moon rabbit, celestial beauty' },
        { label: '龍宮公主', en: 'Dragon Palace Princess', value: 'otohime, dragon palace, underwater princess, sea jewels' },
        { label: '織女', en: 'Weaver Girl', value: 'orihime, weaver princess, starlight, celestial loom' },
        { label: '雷獸', en: 'Raiju', value: 'raiju, thunder beast, lightning creature, electric fur' },
        { label: '麒麟', en: 'Qilin', value: 'qilin, kirin, benevolent beast, scales, antlers, holy' },
        { label: '朱雀', en: 'Vermillion Bird', value: 'vermillion bird, fire phoenix, southern guardian, crimson' },
        { label: '玄武', en: 'Black Tortoise', value: 'genbu, black tortoise, snake-tortoise, northern guardian' },
        { label: '青龍', en: 'Azure Dragon', value: 'seiryu, azure dragon, eastern guardian, blue dragon' },
        { label: '白虎', en: 'White Tiger', value: 'byakko, white tiger, western guardian, fierce' },
        // ── 北歐神話 ──
        { label: '矮人鍛造', en: 'Norse Dwarf', value: 'norse dwarf, blacksmith, rune forger, mountain' },
        { label: '光之精靈', en: 'Light Elf', value: 'ljosalfar, light elf, radiant, alfheim' },
        { label: '暗之精靈', en: 'Dark Elf (Norse)', value: 'dokkalfar, dark elf, underground, svartalfheim' },
        { label: '霜巨人', en: 'Frost Giant', value: 'frost giant, jotun, ice, massive, jotunheim' },
        { label: '火巨人', en: 'Fire Giant', value: 'fire giant, muspel, flame, burning, muspelheim' },
        { label: '世界蛇', en: 'World Serpent', value: 'jormungandr, world serpent, ocean coiling, massive' },
        // ── 混血・亞種 ──
        { label: '半精靈', en: 'Half-Elf', value: 'half-elf, mixed heritage, slightly pointed ears' },
        { label: '半龍人', en: 'Half-Dragon', value: 'half-dragon, partial scales, dragon eye, human form' },
        { label: '半天使', en: 'Nephilim', value: 'nephilim, half angel, partial wings, divine blood' },
        { label: '半惡魔', en: 'Tiefling', value: 'tiefling, small horns, tail, demonic heritage' },
        { label: '半妖', en: 'Half-Yokai', value: 'hanyo, half demon, mixed form, dual nature' },
        { label: '獸化人', en: 'Beastkin', value: 'beastkin, partial animal features, tribal, wild' },
        // ── 幻想生物 ──
        { label: '泰坦', en: 'Titan', value: 'titan, colossal, primordial, overwhelming' },
        { label: '精靈王', en: 'Elf King', value: 'elf king, ancient, crown of leaves, supreme elf' },
        { label: '夢境生物', en: 'Dream Being', value: 'dream creature, surreal, shifting form, illusory' },
        { label: '星界生物', en: 'Astral Being', value: 'astral being, star body, cosmic consciousness, ethereal' },
        { label: '虛空存在', en: 'Void Being', value: 'void being, emptiness, dark matter, cosmic horror' },
        { label: '時間精靈', en: 'Time Spirit', value: 'chrono spirit, time elemental, clockwork, aging and youth' },
        // ── 精神・概念體 ──
        { label: '夢魘化身', en: 'Nightmare Avatar', value: 'nightmare incarnation, fear manifest, horror form' },
        { label: '命運女神', en: 'Fate Goddess', value: 'moira, fate weaver, thread of destiny, oracle' },
        { label: '混沌獸', en: 'Chaos Beast', value: 'chaos beast, shifting, unstable form, entropy' },
        { label: '秩序天使', en: 'Order Angel', value: 'order angel, geometric wings, law incarnate, symmetry' },
        { label: '自然化身', en: 'Nature Avatar', value: 'nature incarnation, gaia, world tree spirit, mother earth' },
        { label: '星辰使者', en: 'Star Messenger', value: 'star messenger, celestial herald, comet trail, cosmic' },
        // ── 動漫特殊系 ──
        { label: '魔法少女', en: 'Magical Girl', value: 'magical girl, transformation, sparkle, wand, ribbon' },
        { label: '式神', en: 'Shikigami', value: 'shikigami, paper talisman, onmyoji servant, spirit familiar' },
        { label: '英靈', en: 'Heroic Spirit', value: 'heroic spirit, legendary warrior, summoned, golden aura' },
        { label: '人偶', en: 'Living Doll', value: 'living doll, ball-jointed doll, porcelain skin, glass eyes' },
        { label: '使魔', en: 'Familiar', value: 'familiar, magical companion, bonded spirit, small creature' },
        { label: '神器擬人', en: 'Weapon Spirit', value: 'weapon spirit, sentient sword, living weapon, humanoid form' },
        // ── 亞人族追加 ──
        { label: '海馬娘', en: 'Seahorse Girl', value: 'seahorse girl, aquatic, curled tail, ocean' },
        { label: '蠍娘', en: 'Scorpion Girl', value: 'scorpion girl, scorpion tail, pincers, desert' },
        { label: '燕娘', en: 'Swallow Girl', value: 'swallow girl, swift wings, agile, sky dancer' },
        { label: '螢火蟲精', en: 'Firefly Spirit', value: 'firefly spirit, bioluminescent, soft glow, night' },
        { label: '珍珠精', en: 'Pearl Spirit', value: 'pearl spirit, lustrous skin, oyster, ocean treasure' },
        { label: '雷鳥', en: 'Thunderbird', value: 'thunderbird girl, storm wings, lightning, native spirit' },
        { label: '迦樓羅', en: 'Garuda', value: 'garuda, golden wings, eagle warrior, divine bird' },
        { label: '天鵝娘', en: 'Swan Girl', value: 'swan girl, white feathers, graceful, lake' },
        { label: '鳳蝶精', en: 'Butterfly Spirit', value: 'butterfly spirit, colorful wings, metamorphosis, pollen' },
        { label: '水晶龍', en: 'Crystal Dragon', value: 'crystal dragon, gem scales, prismatic breath, treasure' },
        { label: '影龍', en: 'Shadow Dragon', value: 'shadow dragon, dark scales, shadow breath, stealth' },
        { label: '風之民', en: 'Sylph', value: 'sylph, wind being, delicate wings, air dancer' },
        { label: '火蜥蜴', en: 'Salamander', value: 'salamander, fire lizard, heat aura, volcanic' },
        { label: '鬼火精', en: 'Will-o-Wisp', value: 'will-o-wisp girl, floating flame, ghost light, marsh' },
        { label: '血族貴族', en: 'Vampire Noble', value: 'vampire noble, aristocratic, blood red eyes, cape, mansion' },
        { label: '陰陽師', en: 'Onmyoji Spirit', value: 'onmyoji spirit, yin yang, talisman, japanese mystic' },
        { label: '戰乙女', en: 'Shield Maiden', value: 'shield maiden, norse warrior, braided hair, fierce' },
        { label: '鎧武者靈', en: 'Armor Spirit', value: 'living armor, haunted armor, samurai ghost, empty helm' },
        { label: '結界師', en: 'Barrier Mage', value: 'barrier mage, mystic shields, rune caster, protective' }
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

    // ── Conflict Rules ──
    const CONFLICT_RULES = [
        // ═══════════════════════════════════════════
        // A. 種族 × 職業 (race × job)
        // ═══════════════════════════════════════════

        // 💀 亡靈系 vs 神聖職業
        { a: 'race', b: 'job', keyword_a: 'lich', keyword_b: 'shrine maiden', reason: '💀 亡靈與神聖力量互斥' },
        { a: 'race', b: 'job', keyword_a: 'lich', keyword_b: 'cleric', reason: '💀 巫妖與治癒魔法互斥' },
        { a: 'race', b: 'job', keyword_a: 'skeleton', keyword_b: 'shrine maiden', reason: '💀 白骨與淨化衝突' },
        { a: 'race', b: 'job', keyword_a: 'skeleton', keyword_b: 'cleric', reason: '💀 骷髏與治癒魔法衝突' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'shrine maiden', reason: '💀 怨靈與聖地衝突' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'cleric', reason: '💀 怨靈與治癒衝突' },
        { a: 'race', b: 'job', keyword_a: 'ghoul', keyword_b: 'shrine maiden', reason: '💀 屍鬼與神社服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'death knight', keyword_b: 'shrine maiden', reason: '💀 亡靈騎士 vs 神聖服務' },
        { a: 'race', b: 'job', keyword_a: 'death knight', keyword_b: 'cleric', reason: '💀 亡靈騎士 vs 治癒' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'shrine maiden', reason: '🧟 殭屍與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'cleric', reason: '🧟 殭屍與治癒互斥' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'chef', reason: '🧟 殭屍做菜有衛生問題' },
        { a: 'race', b: 'job', keyword_a: 'zombie', keyword_b: 'nurse', reason: '🧟 殭屍當護士有衛生問題' },
        { a: 'race', b: 'job', keyword_a: 'dracolich', keyword_b: 'shrine maiden', reason: '💀 骸骨龍與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'grim reaper', keyword_b: 'shrine maiden', reason: '💀 死神與神聖互斥' },
        { a: 'race', b: 'job', keyword_a: 'grim reaper', keyword_b: 'cleric', reason: '💀 死神與治癒互斥' },
        { a: 'race', b: 'job', keyword_a: 'vampire', keyword_b: 'shrine maiden', reason: '🧛 吸血鬼怕神聖之地' },
        { a: 'race', b: 'job', keyword_a: 'vampire', keyword_b: 'cleric', reason: '🧛 吸血鬼怕治癒之光' },

        // 👻 非實體種族 vs 物理職業
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'knight', reason: '👻 幽靈沒有物理身體，無法穿戴盔甲' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'chef', reason: '👻 幽靈無法處理物理食材' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'mechanic', reason: '👻 幽靈無法握住工具' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'athlete', reason: '👻 非實體存在無法進行物理活動' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'astronaut', reason: '👻 幽靈不需要太空衣' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'police', reason: '👻 幽靈無法佩戴警徽和裝備' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'soldier', reason: '👻 幽靈無法持槍作戰' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'racer', reason: '👻 幽靈無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'ghost', keyword_b: 'pirate', reason: '👻 幽靈無法操舵' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'knight', reason: '👻 非實體怨靈無法穿盔甲' },
        { a: 'race', b: 'job', keyword_a: 'wraith', keyword_b: 'mechanic', reason: '👻 非實體怨靈無法使用工具' },
        { a: 'race', b: 'job', keyword_a: 'will-o-wisp', keyword_b: 'chef', reason: '🔥 鬼火精做菜太危險' },
        { a: 'race', b: 'job', keyword_a: 'will-o-wisp', keyword_b: 'knight', reason: '🔥 火焰無法穿盔甲' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'idol', reason: '🌑 影子無法當舞台表演者' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'model', reason: '🌑 影子無法當模特' },
        { a: 'race', b: 'job', keyword_a: 'shadow person', keyword_b: 'cheerleader', reason: '🌑 影子無法當啦啦隊' },

        // 🐟 水棲種族 vs 陸地職業
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'ninja', reason: '🧜 魚尾無法在陸地奔跑' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'knight', reason: '🧜 沒有腿無法騎馬作戰' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'athlete', reason: '🧜 魚尾無法進行陸地運動' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'racer', reason: '🧜 人魚無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'cheerleader', reason: '🧜 魚尾無法跳啦啦隊' },
        { a: 'race', b: 'job', keyword_a: 'mermaid', keyword_b: 'dancer', reason: '🧜 魚尾無法跳舞' },
        { a: 'race', b: 'job', keyword_a: 'jellyfish', keyword_b: 'knight', reason: '🪼 水母穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'jellyfish', keyword_b: 'athlete', reason: '🪼 水母無法進行陸地運動' },
        { a: 'race', b: 'job', keyword_a: 'sea dragon', keyword_b: 'ninja', reason: '🐉 海龍屬於海洋，無法潛行' },
        { a: 'race', b: 'job', keyword_a: 'sea dragon', keyword_b: 'knight', reason: '🐉 海龍無法穿陸地盔甲' },
        { a: 'race', b: 'job', keyword_a: 'octopus girl', keyword_b: 'knight', reason: '🐙 觸手穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'kraken girl', keyword_b: 'knight', reason: '🐙 觸手穿不了盔甲' },

        // 🧚 微型種族 vs 人類尺寸裝備
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'knight', reason: '🧚 太小穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'astronaut', reason: '🧚 太小穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'soldier', reason: '🧚 太小拿不了武器' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'police', reason: '🧚 太小穿不了制服' },
        { a: 'race', b: 'job', keyword_a: 'fairy', keyword_b: 'mechanic', reason: '🧚 太小操作不了機械' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'knight', reason: '😈 太小穿不了全身甲' },
        { a: 'race', b: 'job', keyword_a: 'imp', keyword_b: 'astronaut', reason: '😈 太小穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'gnome', keyword_b: 'knight', reason: '🍄 太小穿不了盔甲' },
        { a: 'race', b: 'job', keyword_a: 'gnome', keyword_b: 'astronaut', reason: '🍄 太小穿不了太空衣' },

        // 🤖 科技 vs 魔法
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'witch', reason: '🤖 機器人和魔法互斥' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'fortune teller', reason: '🤖 機器人用邏輯，不用神秘學' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'alchemist', reason: '🤖 機器人與煉金術衝突' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'mage', reason: '🤖 機器人無法施展魔法' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'shrine maiden', reason: '🤖 機器人與神聖服務衝突' },
        { a: 'race', b: 'job', keyword_a: 'android', keyword_b: 'cleric', reason: '🤖 機器人無法使用治癒魔法' },
        { a: 'race', b: 'job', keyword_a: 'cyborg', keyword_b: 'witch', reason: '🦾 賽博格與魔法衝突' },
        { a: 'race', b: 'job', keyword_a: 'cyborg', keyword_b: 'fortune teller', reason: '🦾 賽博格與占卜衝突' },
        { a: 'race', b: 'job', keyword_a: 'nano being', keyword_b: 'alchemist', reason: '🔬 奈米科技與煉金術衝突' },
        { a: 'race', b: 'job', keyword_a: 'nano being', keyword_b: 'witch', reason: '🔬 奈米科技與魔法衝突' },

        // 💧 形體不定種族 vs 裝備職業
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'knight', reason: '💧 史萊姆無法穿盔甲持武器' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'astronaut', reason: '💧 史萊姆穿不了太空衣' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'soldier', reason: '💧 史萊姆穿不了軍裝' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'police', reason: '💧 史萊姆穿不了制服' },
        { a: 'race', b: 'job', keyword_a: 'slime', keyword_b: 'racer', reason: '💧 史萊姆無法駕駛' },

        // 🌲 植物種族 vs 動態職業
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'ninja', reason: '🌲 樹人太大無法隱匿' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'dancer', reason: '🌲 樹人無法靈活舞動' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'racer', reason: '🌲 樹人無法駕駛' },
        { a: 'race', b: 'job', keyword_a: 'treant', keyword_b: 'athlete', reason: '🌲 樹人無法進行運動' },

        // 🦁 巨型種族 vs 室內職業
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'maid', reason: '🗿 巨人太大無法在室內做女僕' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'nurse', reason: '🗿 巨人太大無法在醫院工作' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'librarian', reason: '🗿 巨人太大無法在圖書館工作' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'teacher', reason: '🗿 巨人太大無法在教室授課' },
        { a: 'race', b: 'job', keyword_a: 'giant', keyword_b: 'bartender', reason: '🗿 巨人太大無法在吧台工作' },
        { a: 'race', b: 'job', keyword_a: 'titan', keyword_b: 'maid', reason: '🗿 泰坦太大無法在室內服務' },
        { a: 'race', b: 'job', keyword_a: 'minotaur', keyword_b: 'maid', reason: '🐂 米諾陶洛斯太大、破壞力太強' },
        { a: 'race', b: 'job', keyword_a: 'hydra', keyword_b: 'maid', reason: '🐍 九頭蛇無法做女僕' },

        // ═══════════════════════════════════════════
        // B. 種族 × 服裝 (race × outfit)
        // ═══════════════════════════════════════════

        // 👻 非實體 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'knight armor', reason: '👻 幽靈無法穿盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'power armor', reason: '👻 幽靈無法穿科技戰甲' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'police uniform', reason: '👻 幽靈穿不了制服' },
        { a: 'race', b: 'outfit', keyword_a: 'ghost', keyword_b: 'gym clothes', reason: '👻 幽靈不需要運動服' },

        // 💧 史萊姆 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'knight armor', reason: '💧 史萊姆穿不住盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'power armor', reason: '💧 史萊姆穿不住戰甲' },
        { a: 'race', b: 'outfit', keyword_a: 'slime', keyword_b: 'blazer', reason: '💧 史萊姆穿不住校服' },

        // 🧜 人魚 × 需要腿的服裝
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'jeans', reason: '🧜 人魚沒有腿穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'gym clothes', reason: '🧜 人魚穿不了運動服' },
        { a: 'race', b: 'outfit', keyword_a: 'mermaid', keyword_b: 'police uniform', reason: '🧜 人魚穿不了制服' },

        // 🧚 妖精 × 大型服裝
        { a: 'race', b: 'outfit', keyword_a: 'fairy', keyword_b: 'knight armor', reason: '🧚 妖精太小穿不了盔甲' },
        { a: 'race', b: 'outfit', keyword_a: 'fairy', keyword_b: 'power armor', reason: '🧚 妖精太小穿不了戰甲' },

        // 🤖 機器人 × 魔法/傳統服裝
        { a: 'race', b: 'outfit', keyword_a: 'android', keyword_b: 'miko', reason: '🤖 機器人穿巫女服？科技與神聖衝突' },
        { a: 'race', b: 'outfit', keyword_a: 'android', keyword_b: 'witch robe', reason: '🤖 機器人穿魔女袍？科技與魔法衝突' },

        // 🐴 半人馬/蛇女 × 褲裝
        { a: 'race', b: 'outfit', keyword_a: 'centaur', keyword_b: 'jeans', reason: '🐴 半人馬下半身是馬穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'centaur', keyword_b: 'blazer', reason: '🐴 半人馬穿不了完整校服' },
        { a: 'race', b: 'outfit', keyword_a: 'lamia', keyword_b: 'jeans', reason: '🐍 蛇女下半身是蛇穿不了褲子' },
        { a: 'race', b: 'outfit', keyword_a: 'lamia', keyword_b: 'gym clothes', reason: '🐍 蛇女無法穿運動服' },
        { a: 'race', b: 'outfit', keyword_a: 'spider', keyword_b: 'jeans', reason: '🕷️ 蜘蛛娘多腿穿不了褲子' },

        // 🗿 巨人 × 正常尺寸服裝
        { a: 'race', b: 'outfit', keyword_a: 'giant', keyword_b: 'sailor uniform', reason: '🗿 巨人太大穿不了水手服' },
        { a: 'race', b: 'outfit', keyword_a: 'giant', keyword_b: 'blazer', reason: '🗿 巨人太大穿不了校服' },

        // 🔥 火精靈 × 易燃服裝
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'kimono', reason: '🔥 火精靈會燒毀和服' },
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'yukata', reason: '🔥 火精靈會燒毀浴衣' },
        { a: 'race', b: 'outfit', keyword_a: 'fire spirit', keyword_b: 'hanfu', reason: '🔥 火精靈會燒毀漢服' },

        // 🌲 樹人 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'treant', keyword_b: 'sailor uniform', reason: '🌲 樹人穿不了水手服' },
        { a: 'race', b: 'outfit', keyword_a: 'treant', keyword_b: 'knight armor', reason: '🌲 樹的身體穿不了盔甲' },

        // 🪼 水母 × 服裝
        { a: 'race', b: 'outfit', keyword_a: 'jellyfish', keyword_b: 'knight armor', reason: '🪼 水母穿不了盔甲' },

        // ═══════════════════════════════════════════
        // C. 職業 × 服裝 (job × outfit)
        // ═══════════════════════════════════════════
        { a: 'job', b: 'outfit', keyword_a: 'knight', keyword_b: 'bikini', reason: '⚔️ 騎士穿比基尼上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'knight', keyword_b: 'pajamas', reason: '⚔️ 騎士穿睡衣無法戰鬥' },
        { a: 'job', b: 'outfit', keyword_a: 'ninja', keyword_b: 'knight armor', reason: '🥷 忍者穿重甲無法隱匿' },
        { a: 'job', b: 'outfit', keyword_a: 'ninja', keyword_b: 'power armor', reason: '🥷 忍者穿科技戰甲無法潛行' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'kimono', reason: '🚀 太空人穿和服上太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'bikini', reason: '🚀 太空人穿比基尼在太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'astronaut', keyword_b: 'pajamas', reason: '🚀 太空人穿睡衣在太空？' },
        { a: 'job', b: 'outfit', keyword_a: 'soldier', keyword_b: 'pajamas', reason: '🎖️ 軍人穿睡衣上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'soldier', keyword_b: 'bikini', reason: '🎖️ 軍人穿比基尼上戰場？' },
        { a: 'job', b: 'outfit', keyword_a: 'maid', keyword_b: 'knight armor', reason: '🧹 女僕穿盔甲打掃？' },
        { a: 'job', b: 'outfit', keyword_a: 'maid', keyword_b: 'power armor', reason: '🧹 女僕穿科技戰甲打掃？' },
        { a: 'job', b: 'outfit', keyword_a: 'shrine maiden', keyword_b: 'cyberpunk', reason: '⛩️ 巫女穿賽博裝？傳統與科技衝突' },
        { a: 'job', b: 'outfit', keyword_a: 'nun', keyword_b: 'bikini', reason: '✝️ 修女穿比基尼？信仰衝突' },
        { a: 'job', b: 'outfit', keyword_a: 'nun', keyword_b: 'bunny suit', reason: '✝️ 修女穿兔女郎裝？信仰衝突' },

        // ═══════════════════════════════════════════
        // D. 性別相關衝突 (gender-aware, uses 'gender' key)
        // ═══════════════════════════════════════════
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'bunny suit', reason: '🐰 兔女郎裝通常是女性服裝，AI 可能理解錯誤' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'princess dress', reason: '👗 公主禮服是女性服裝，AI 可能理解錯誤' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'sailor uniform', reason: '👧 水手服通常指女性校服款式' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'maid apron', reason: '👧 女僕裝通常是女性服裝' },
        { a: 'gender', b: 'outfit', keyword_a: 'male', keyword_b: 'nurse uniform', reason: '👩‍⚕️ 護士服通常是女性款式' },
        { a: 'gender', b: 'job', keyword_a: 'male', keyword_b: 'oiran', reason: '🎎 花魁是女性職業' },
        { a: 'gender', b: 'job', keyword_a: 'male', keyword_b: 'shrine maiden', reason: '⛩️ 巫女是女性職業' },
        { a: 'gender', b: 'job', keyword_a: 'female', keyword_b: 'butler', reason: '🤵 執事通常是男性職業' }
    ];

    // ── Age Descriptor Prompts ──
    // Complete gender-specific age descriptions for realistic prompt generation
    const AGE_DESCRIPTORS = {
        1: { f: 'a 1-year-old baby infant girl, tiny newborn proportions, very large head relative to body, soft round face with chubby cheeks, big curious eyes, tiny button nose, short stubby limbs, plump baby fat body, drooling', m: 'a 1-year-old baby infant boy, tiny newborn proportions, very large head relative to body, soft round face with chubby cheeks, big curious eyes, tiny button nose, short stubby limbs, plump baby fat body, drooling' },
        2: { f: 'a 2-year-old toddler girl, oversized head-to-body ratio, round chubby face, big bright curious eyes, pudgy arms and legs, baby fat belly, unsteady waddle stance, innocent exploring expression', m: 'a 2-year-old toddler boy, oversized head-to-body ratio, round chubby face, big bright curious eyes, pudgy arms and legs, baby fat belly, unsteady waddle stance, innocent exploring expression' },
        3: { f: 'a 3-year-old young girl, large head proportions, round soft face with baby fat, big expressive eyes, short chubby limbs, toddler body, playful curious demeanor', m: 'a 3-year-old young boy, large head proportions, round soft face with baby fat, big expressive eyes, short chubby limbs, toddler body, playful curious demeanor' },
        4: { f: 'a 4-year-old preschool girl, large head-to-body ratio, round childish face, big innocent eyes, thin arms and legs with baby fat, petite child body, energetic playful posture', m: 'a 4-year-old preschool boy, large head-to-body ratio, round childish face, big innocent eyes, thin arms and legs with baby fat, petite child body, energetic playful posture' },
        5: { f: 'a 5-year-old young girl, slightly large head, round face with remaining baby fat, bright wide eyes, missing front teeth smile, slim short limbs, small childlike frame, kindergarten child proportions', m: 'a 5-year-old young boy, slightly large head, round face with remaining baby fat, bright wide eyes, missing front teeth smile, slim short limbs, small childlike frame, kindergarten child proportions' },
        6: { f: 'a 6-year-old girl, face losing some baby fat, round eyes with innocent gaze, gap-toothed smile, thin childlike limbs, slender child body, school-age child appearance', m: 'a 6-year-old boy, face losing some baby fat, round eyes with innocent gaze, gap-toothed smile, thin childlike limbs, slender child body, school-age child appearance' },
        7: { f: 'a 7-year-old school girl, face becoming more defined but still round and soft, wide curious eyes, skinny arms and legs, flat chest, straight childish body, elementary school first grader proportions', m: 'a 7-year-old school boy, face becoming more defined but still round and soft, wide curious eyes, skinny arms and legs, flat chest, straight childish body, elementary school first grader proportions' },
        8: { f: 'an 8-year-old girl, soft youthful face, bright alert eyes, lean skinny limbs, flat chest, straight silhouette, active confident child posture, elementary school child build', m: 'an 8-year-old boy, soft youthful face, bright alert eyes, lean skinny limbs, flat chest, straight silhouette, active confident child posture, elementary school child build' },
        9: { f: 'a 9-year-old girl, soft face with baby fat fading, bright expressive eyes, lean and lanky limbs, flat chest, slim straight body, growing taller, confident school child demeanor', m: 'a 9-year-old boy, soft face with baby fat fading, bright expressive eyes, lean and lanky limbs, flat chest, slim straight body, growing taller, confident school child demeanor' },
        10: { f: 'a 10-year-old girl child, prepubescent, large head-to-body ratio, round childish face, innocent wide eyes, flat chest, childlike slender limbs, petite child body, no adult curves', m: 'a 10-year-old boy child, prepubescent, large head-to-body ratio, round childish face, innocent wide eyes, flat chest, childlike slender limbs, petite child body, lean build' },
        11: { f: 'an 11-year-old preteen girl, pre-adolescence, face slightly longer and less round, alert intelligent eyes, lean slender frame, very flat chest, still mostly childlike body, lanky limbs, innocent youthful expression', m: 'an 11-year-old preteen boy, pre-adolescence, face slightly longer and less round, alert intelligent eyes, lean slender frame, flat chest, still fully childlike body, lanky thin limbs, innocent youthful expression' },
        12: { f: 'a 12-year-old preteen girl, early adolescent features emerging, face becoming more oval, youthful bright eyes, mostly flat chest, slim pre-teen body, legs growing longer, awkward gangly proportions, transitioning from child to young teen', m: 'a 12-year-old preteen boy, early adolescent features emerging, face becoming more oval and angular, youthful bright eyes, slim pre-teen body with no muscle, legs and arms growing longer, awkward gangly proportions, transitioning from child to young teen' },
        13: { f: 'a 13-year-old young teenage girl, early puberty, youthful oval face, bright teenage eyes, early subtle body development, very modest curves, slim teenage frame, losing childish proportions, middle school student appearance', m: 'a 13-year-old young teenage boy, early puberty, youthful face becoming slightly angular, bright teenage eyes, slim teenage frame with no muscle, narrow shoulders, losing childish proportions, voice cracking, middle school student appearance' },
        14: { f: 'a 14-year-old teenage girl, mid-puberty, youthful oval face with emerging definition, expressive teen eyes, modest early teenage development, slight gentle curves forming, slender teenage body, adolescent proportions', m: 'a 14-year-old teenage boy, mid-puberty, face becoming more angular and defined, expressive teen eyes, jaw widening slightly, slim teenage body, shoulders beginning to broaden, no significant muscle, adolescent proportions' },
        15: { f: 'a 15-year-old teenage girl, more defined youthful face, clear bright eyes, moderate teenage development, gentle natural curves, slim youthful figure, high school entrance age, youthful confident expression', m: 'a 15-year-old teenage boy, face more angular with defined jaw, clear bright eyes, visible Adam\'s apple, shoulders broadening, slim athletic build forming, very light muscle tone, high school entrance age, youthful confident expression' },
        16: { f: 'a 16-year-old teenage girl, youthful maturing face, clear defined features, developing figure with youthful proportions, natural teenage curves, slender waist, high school student build, youthful vibrant energy', m: 'a 16-year-old teenage boy, maturing masculine face, more defined jawline, visible Adam\'s apple, broader shoulders, developing lean athletic build, light muscle definition, high school student build, youthful vibrant energy' },
        17: { f: 'a 17-year-old late teenage girl, nearing physical maturity, youthful face with refined features, nearly mature figure with youthful proportions, natural curves, defined waist, feminine silhouette forming, confident youthful aura', m: 'a 17-year-old late teenage boy, nearing physical maturity, youthful masculine face with strong jawline, broad shoulders, lean muscular build developing, moderate muscle definition, tall and lean, confident youthful aura' },
        18: { f: 'a 18-year-old young adult woman, freshly mature, youthful face with defined features, smooth flawless skin, fully developed youthful figure, defined curves, slim waist, feminine body shape, fresh adult energy, youthful glow', m: 'a 18-year-old young adult man, freshly mature, youthful face with strong defined jaw, smooth skin, broad shoulders, athletic lean build, visible muscle definition, narrow waist, masculine body proportions, fresh adult energy, youthful glow' },
        19: { f: 'a 19-year-old young adult woman, early adulthood, youthful face, expressive mature eyes, fully mature youthful body, balanced feminine proportions, natural curves, slim figure, toned physique, college freshman appearance', m: 'a 19-year-old young adult man, early adulthood, youthful face, expressive mature eyes, broad shoulders, athletic muscular build, toned physique, masculine proportions, college freshman appearance' },
        20: { f: 'a 20-year-old young woman, youthful prime, refined face, bright confident eyes, smooth glowing skin, mature feminine figure, well-proportioned curves, slim toned body, young adult in her prime', m: 'a 20-year-old young man, youthful prime, refined face, bright confident eyes, broad shoulders, lean muscular athletic build, toned arms and chest, young adult in his prime' },
        21: { f: 'a 21-year-old young woman, full youthful maturity, mature face with youthful softness, confident eyes, flawless smooth skin, fully mature womanly figure, balanced proportions, toned slim body, peak of youthful physique', m: 'a 21-year-old young man, full youthful maturity, mature face with youthful edge, confident strong eyes, sharp jawline, fully mature masculine build, broad shoulders, athletic muscular frame, peak of youthful physicality' },
        22: { f: 'a 22-year-old young woman, fully mature adult, face with youthful radiance, mature womanly figure, natural curves, slim toned body, poised posture, young professional aura', m: 'a 22-year-old young man, fully mature adult, face with youthful sharpness, mature athletic build, broad shoulders, developed chest, muscular arms, strong posture, capable young professional aura' },
        23: { f: 'a 23-year-old young woman, early career young adult, fresh face, intelligent expressive eyes, mature feminine body, slim toned figure, poised demeanor, young professional appearance', m: 'a 23-year-old young man, early career young adult, fresh face, intelligent expressive eyes, mature masculine build, athletic physique, toned muscular frame, young professional appearance' },
        24: { f: 'a 24-year-old young woman, youthful adult, warm confident eyes, mature feminine figure, natural curves, toned slim body, graceful movement, established young adult appearance', m: 'a 24-year-old young man, youthful adult prime, warm confident eyes, mature athletic build, broad shoulders, toned muscular body, strong presence, established young adult appearance' },
        25: { f: 'a 25-year-old young woman, peak of youthful physique, captivating confident eyes, luminous flawless skin, ideal mature feminine figure, natural curves, slim toned body, prime young adult, radiant confidence', m: 'a 25-year-old young man, peak of youthful strength, captivating confident eyes, ideal athletic build, broad strong shoulders, muscular chest, powerful arms, prime young adult, commanding presence' },
        26: { f: 'a 26-year-old woman, mature young adult, subtle sophistication, knowing confident eyes, fully mature womanly figure, balanced curves, toned feminine body, sophisticated young woman', m: 'a 26-year-old man, mature young adult, subtle sophistication, knowing confident eyes, fully mature masculine build, powerful shoulders, athletic muscular physique, sophisticated young man' },
        27: { f: 'a 27-year-old woman, established adult, face blending youth and maturity, warm intelligent eyes, mature feminine body, slim toned figure, confident natural poise, professional accomplished woman', m: 'a 27-year-old man, established adult, face blending youth and maturity, warm intelligent eyes, well-built masculine frame, strong broad shoulders, defined muscular physique, professional accomplished man' },
        28: { f: 'a 28-year-old woman, mature adult, face with youthful glow, perceptive eyes, mature womanly body, natural feminine curves, toned slim figure, confident self-assured woman', m: 'a 28-year-old man, prime adult, mature face with strong features, perceptive eyes, powerful masculine build, broad shoulders, muscular chest, athletic strong body, self-assured man' },
        29: { f: 'a 29-year-old woman, refined adult, face with mature composure, deep expressive eyes, fully mature womanly figure, toned slim body, poised presence, accomplished woman at her prime', m: 'a 29-year-old man, refined adult, face with seasoned confidence, deep expressive eyes, peak masculine build, powerful broad shoulders, defined muscular athletic body, accomplished man at his prime' },
        // 30+ use decade ranges
        30: { f: 'a woman in her 30s, mature adult, graceful early aging, wise confident eyes, subtle expression lines near eyes, mature womanly figure, maintained feminine curves, professional mature woman, sophisticated aura', m: 'a man in his 30s, rugged mature adult, masculine face with character, wise confident eyes, very faint crow\'s feet beginning, broad powerful shoulders, solid muscular build, professional mature man, authoritative dependable aura', range: [30, 39] },
        40: { f: 'a woman in her 40s, mature refined adult, visible laugh lines and crow\'s feet, experienced wise eyes, subtle forehead lines, mature womanly body, figure slightly fuller than youth, confident accomplished woman, dignified presence', m: 'a man in his 40s, distinguished mature male, rugged face with visible character lines, crow\'s feet, forehead lines, possible gray-streaked beard or hair, broad powerful build, slightly thicker torso, seasoned and weathered look, distinguished authoritative presence', range: [40, 49] },
        50: { f: 'a woman in her 50s, aging adult, prominent laugh lines and wrinkles, deep wise experienced eyes, visible forehead lines, nasolabial folds, graying hair, fuller softer figure, warm maternal aura, dignified accomplished older woman', m: 'a man in his 50s, distinguished older man, deep wrinkles and character lines, deep wise experienced eyes, heavy crow\'s feet, receding hairline or graying hair, possible gray beard, heavier set body, silver fox appearance, authoritative wise presence', range: [50, 59] },
        60: { f: 'a woman in her 60s, elderly woman, deep wrinkles and age spots, kind wise old eyes, sagging skin around jaw and neck, white or gray hair, aged body, smaller stature, softer rounded figure, grandmother appearance, warm nurturing presence', m: 'a man in his 60s, elderly gentleman, deep wrinkles and creases, wise tired old eyes, prominent age spots, white or gray thinning hair, gray or white beard, narrower shoulders, loss of muscle mass, slightly hunched posture, grandfather appearance, calm dignified presence', range: [60, 69] },
        70: { f: 'a woman in her 70s, elderly aged woman, deeply wrinkled aged face, sunken cheeks, faded tired gentle eyes, very thin white hair, pronounced sagging skin, frail thin body, significantly hunched posture, bony thin limbs, elderly grandmother, fragile appearance', m: 'a man in his 70s, elderly aged man, deeply wrinkled weathered face, sunken cheeks, faded tired gentle eyes, sparse white hair or bald, frail body with significant muscle loss, thin bony limbs, hunched back, elderly grandfather appearance', range: [70, 79] },
        80: { f: 'a woman in her 80s, very elderly old woman, heavily wrinkled aged face, deeply sunken cheeks and eyes, cloudy faded old eyes, wispy thin white hair, very frail small body, skeletal thin limbs, trembling hands, very elderly great-grandmother appearance', m: 'a man in his 80s, very elderly old man, heavily wrinkled weathered face, deeply sunken features, cloudy faded old eyes, mostly bald with sparse white wisps, very frail shrunken body, skeletal thin limbs, trembling hands, very elderly great-grandfather appearance', range: [80, 89] },
        90: { f: 'a woman in her 90s, extremely elderly ancient woman, profoundly wrinkled paper-thin skin, gaunt hollowed face, milky faded ancient eyes, almost no hair remaining, extremely frail tiny body, skeletal fragile frame, centenarian appearance, ancient ethereal presence', m: 'a man in his 90s, extremely elderly ancient man, profoundly wrinkled paper-thin skin, gaunt hollowed face, milky faded ancient eyes, completely bald or few white strands, extremely frail shrunken body, skeletal fragile frame, centenarian appearance, ancient wise presence', range: [90, 100] }
    };

    // Helper: get age descriptor for a given age and gender
    function getAgeDescriptor(age, gender) {
        age = parseInt(age);
        if (!age || age < 1) return null;
        if (AGE_DESCRIPTORS[age] && !AGE_DESCRIPTORS[age].range) {
            return gender === 'male' ? AGE_DESCRIPTORS[age].m : AGE_DESCRIPTORS[age].f;
        }
        for (const key of Object.keys(AGE_DESCRIPTORS)) {
            const entry = AGE_DESCRIPTORS[key];
            if (entry.range && age >= entry.range[0] && age <= entry.range[1]) {
                return gender === 'male' ? entry.m : entry.f;
            }
        }
        const last = AGE_DESCRIPTORS[90];
        return gender === 'male' ? last.m : last.f;
    }

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

    // ── Body Magic Data — Full Demo v2 (7-level slider system with positive/negative/explain) ──
    const BODY_MAGIC_DATA = {
        FEMALE_BUST: {
            1: {
                zh: '🔮 完全無胸 / Doll-flat',
                positive: ['completely flat chest', 'no breasts at all', 'doll-like torso', 'child-like flat body'],
                negative: ['breasts', 'cleavage', 'bust', 'curvy', 'voluptuous', 'busty', 'chest'],
                weight: 1.7, fantasy: true,
                explain: '🔮 <strong>幻想級 — 完全無胸</strong>：如人偶或精靈般完全平坦的胸部。需要極高權重 (1.7) + 全面壓制負向提示詞。適合精靈、仙子、人偶等非人類角色。'
            },
            2: {
                zh: '非常平坦 / Flat Chest',
                positive: ['flat chest', 'very small breasts', 'almost flat'],
                negative: ['big breasts', 'large breasts', 'cleavage', 'voluptuous', 'curvy', 'busty'],
                weight: 1.5, fantasy: false,
                explain: '<strong>非常平坦</strong>：逆勢設定，需要高權重 (1.5) + 大量負向提示詞壓制 AI 預設偏好。建議搭配 young girl body 或 loli proportions。'
            },
            3: {
                zh: '偏小纖細 / Small',
                positive: ['small breasts', 'petite breasts', 'subtle curves', 'slim figure'],
                negative: ['large breasts', 'big breasts', 'voluptuous', 'curvy', 'busty', 'cleavage'],
                weight: 1.35, fantasy: false,
                explain: '<strong>偏小纖細</strong>：較逆勢，權重 (1.35)。建議把 age descriptor 中的 mature womanly figure 改為 youthful slim figure。'
            },
            4: {
                zh: '中等自然 / Medium',
                positive: ['medium breasts', 'natural breasts', 'modest bust'],
                negative: ['huge breasts', 'massive breasts', 'exaggerated proportions'],
                weight: 1.1, fantasy: false,
                explain: '<strong>中等自然</strong>：最接近 AI 預設，只需微調權重 (1.1)。建議去掉 feminine curves 改用 gentle curves。'
            },
            5: {
                zh: '豐滿 / Large',
                positive: ['large breasts', 'full breasts', 'curvy', 'voluptuous figure'],
                negative: ['small breasts', 'flat chest', 'petite breasts'],
                weight: 1.2, fantasy: false,
                explain: '<strong>豐滿</strong>：順勢設定，AI 容易生成。權重 (1.2) 足夠。'
            },
            6: {
                zh: '非常豐滿 / Huge',
                positive: ['huge breasts', 'massive breasts', 'voluptuous', 'busty'],
                negative: [],
                weight: 1.4, fantasy: false,
                explain: '<strong>非常豐滿</strong>：極端豐滿。因已遠超預設，需要較高權重 (1.4) 確保穩定輸出。幾乎不需要負向提示詞。'
            },
            7: {
                zh: '🔮 超乳幻想 / Fantasy Massive',
                positive: ['impossibly huge breasts', 'gigantic breasts', 'breast bigger than head', 'absurdly large bust', 'gravity-defying breasts'],
                negative: ['small breasts', 'flat chest', 'realistic proportions', 'normal breasts'],
                weight: 1.8, fantasy: true,
                explain: '🔮 <strong>幻想級 — 超乳</strong>：完全脫離現實比例的幻想級巨大。需要極高權重 (1.8) + 壓制 realistic proportions。僅適合動漫/幻想風格。'
            }
        },
        MALE_MUSCLE: {
            1: {
                zh: '🔮 骷髏骨感 / Skeletal',
                positive: ['extremely thin', 'skeletal body', 'emaciated', 'visible ribs', 'gaunt frame', 'unnaturally thin'],
                negative: ['muscular', 'buff', 'brawny', 'broad shoulders', 'ripped', 'healthy', 'normal body'],
                weight: 1.7, fantasy: true,
                explain: '🔮 <strong>幻想級 — 骷髏骨感</strong>：如亡靈法師、骷髏般的超自然消瘦。權重 (1.7) + 大量負向提示詞。適合不死族、法師等角色。'
            },
            2: {
                zh: '纖瘦少年 / Slim',
                positive: ['slim body', 'slender body', 'thin frame', 'delicate build'],
                negative: ['muscular', 'buff', 'brawny', 'broad shoulders', 'ripped'],
                weight: 1.3, fantasy: false,
                explain: '<strong>纖瘦少年</strong>：逆勢設定，AI 傾向生成較壯男性。高權重 (1.3) + 負向提示詞壓制肌肉。'
            },
            3: {
                zh: '偏瘦精緻 / Lean',
                positive: ['lean body', 'slim athletic build', 'light muscle tone'],
                negative: ['muscular', 'buff', 'thick', 'brawny'],
                weight: 1.2, fantasy: false,
                explain: '<strong>偏瘦精緻</strong>：中度逆勢，精壯但不過度。權重 (1.2) 搭配控制。'
            },
            4: {
                zh: '標準體型 / Average',
                positive: ['average build', 'normal body', 'moderate build'],
                negative: ['extremely muscular', 'very thin', 'obese'],
                weight: 1.0, fantasy: false,
                explain: '<strong>標準體型</strong>：AI 預設範圍，幾乎不需額外權重。'
            },
            5: {
                zh: '運動壯碩 / Athletic',
                positive: ['athletic body', 'muscular build', 'toned body', 'broad shoulders'],
                negative: ['thin', 'slender', 'skinny', 'delicate'],
                weight: 1.2, fantasy: false,
                explain: '<strong>運動壯碩</strong>：順勢設定，AI 易生成。權重 (1.2) 穩定控制。'
            },
            6: {
                zh: '極度壯碩 / Massive',
                positive: ['extremely muscular', 'huge muscles', 'bodybuilder physique', 'massive frame'],
                negative: ['thin', 'slim', 'slender', 'skinny'],
                weight: 1.4, fantasy: false,
                explain: '<strong>極度壯碩</strong>：極端設定，需高權重 (1.4) 確保極致肌肉表現。'
            },
            7: {
                zh: '🔮 浩克巨獸 / Hulk',
                positive: ['impossibly muscular', 'hulk-like body', 'grotesquely muscular', 'muscles bigger than head', 'superhero physique', 'inhuman muscle mass'],
                negative: ['thin', 'slim', 'slender', 'skinny', 'normal body', 'realistic proportions'],
                weight: 1.8, fantasy: true,
                explain: '🔮 <strong>幻想級 — 浩克巨獸</strong>：超越人類極限的肌肉量，如漫威浩克。需要極高權重 (1.8)。僅適合超級英雄/怪物角色。'
            }
        },
        BUILD: {
            1: { zh: '🔮 紙片人', positive: ['paper-thin body', 'impossibly thin', '2d flat body', 'stick figure proportions'], negative: ['thick', 'chubby', 'round', 'normal body', 'realistic'], weight: 1.6, fantasy: true, explain: '🔮 <strong>幻想級 — 紙片人</strong>：如動漫中極端纖細的非現實體型，或精靈族的超自然纖細。' },
            2: { zh: '纖瘦', positive: ['skinny body', 'very thin'], negative: ['thick', 'chubby', 'round'], weight: 1.2, fantasy: false, explain: '<strong>纖瘦</strong>：明顯偏瘦，權重 (1.2) + 壓制負向。' },
            3: { zh: '苗條', positive: ['slim body', 'slender'], negative: ['thick', 'chubby'], weight: 1.1, fantasy: false, explain: '<strong>苗條</strong>：健康的纖細，微調即可。' },
            4: { zh: '標準', positive: ['average body'], negative: [], weight: 1.0, fantasy: false, explain: '<strong>標準</strong>：AI 預設範圍。' },
            5: { zh: '豐腴', positive: ['plump body', 'soft figure'], negative: ['skinny', 'thin'], weight: 1.2, fantasy: false, explain: '<strong>豐腴</strong>：略帶豐滿感，權重 (1.2)。' },
            6: { zh: '壯碩', positive: ['thick body', 'large frame'], negative: ['thin', 'slim', 'slender'], weight: 1.3, fantasy: false, explain: '<strong>壯碩</strong>：厚實體型，需要較高控制。' },
            7: { zh: '🔮 泰坦', positive: ['titan-sized body', 'colossal frame', 'impossibly massive build', 'mountain-like physique'], negative: ['thin', 'slim', 'normal', 'human-sized', 'realistic'], weight: 1.7, fantasy: true, explain: '🔮 <strong>幻想級 — 泰坦</strong>：如進擊的巨人般的超自然龐大體型。完全脫離人類比例。' }
        },
        HEIGHT: {
            1: { zh: '🔮 蟻人/小精靈', positive: ['miniature body', 'fairy-sized', 'tiny creature', 'palm-sized', 'chibi proportions', 'ant-sized'], negative: ['tall', 'long legs', 'normal height', 'human-sized'], weight: 1.8, fantasy: true, explain: '🔮 <strong>幻想級 — 蟻人/小精靈</strong>：如手掌大小的精靈、仙子或蟻人縮小狀態。需要極高權重 (1.8)。' },
            2: { zh: '嬌小', positive: ['petite body', 'small frame', 'short stature'], negative: ['tall', 'long legs'], weight: 1.3, fantasy: false, explain: '<strong>嬌小</strong>：明顯矮小或像小孩的身高。' },
            3: { zh: '偏矮', positive: ['short body', 'compact build'], negative: ['tall'], weight: 1.15, fantasy: false, explain: '<strong>偏矮</strong>：略矮，微調。' },
            4: { zh: '中等', positive: [], negative: [], weight: 1.0, fantasy: false, explain: '<strong>中等</strong>：正常身高，不需要額外控制。' },
            5: { zh: '偏高', positive: ['tall body', 'long legs'], negative: ['short', 'petite'], weight: 1.15, fantasy: false, explain: '<strong>偏高</strong>：略高，微調。' },
            6: { zh: '高挑', positive: ['very tall', 'long legs', 'elongated proportions'], negative: ['short', 'petite', 'small'], weight: 1.3, fantasy: false, explain: '<strong>高挑</strong>：明顯高挑。' },
            7: { zh: '🔮 巨人族', positive: ['giant', 'towering over buildings', 'colossal height', '3 meters tall', 'gigantic humanoid', 'looking down at tiny people'], negative: ['short', 'petite', 'small', 'normal height', 'human-sized'], weight: 1.8, fantasy: true, explain: '🔮 <strong>幻想級 — 巨人族</strong>：如進擊的巨人般的超自然身高（3公尺以上）。需要極高權重 (1.8) + 特殊構圖提示。' }
        },
        PRESETS: {
            // Female Realistic
            loli: { primary: 2, build: 2, height: 2 },
            petite: { primary: 3, build: 3, height: 2 },
            slim: { primary: 3, build: 3, height: 4 },
            average: { primary: 4, build: 4, height: 4 },
            curvy: { primary: 5, build: 4, height: 4 },
            voluptuous: { primary: 6, build: 5, height: 4 },
            athletic_f: { primary: 4, build: 4, height: 5 },
            // Female Fantasy
            fairy: { primary: 1, build: 1, height: 1 },
            oppai: { primary: 7, build: 4, height: 4 },
            amazon: { primary: 5, build: 6, height: 6 },
            giantess: { primary: 5, build: 6, height: 7 },
            pixie: { primary: 1, build: 1, height: 1 },
            // Male Realistic
            shota: { primary: 2, build: 2, height: 2 },
            slim_m: { primary: 3, build: 3, height: 4 },
            average_m: { primary: 4, build: 4, height: 4 },
            athletic_m: { primary: 5, build: 4, height: 5 },
            muscular: { primary: 6, build: 5, height: 5 },
            // Male Fantasy
            elf_m: { primary: 2, build: 2, height: 5 },
            hulk: { primary: 7, build: 7, height: 6 },
            titan: { primary: 7, build: 7, height: 7 },
            antman: { primary: 4, build: 4, height: 1 },
            skeleton: { primary: 1, build: 1, height: 4 }
        }
    };

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
        highQuality: true,
        bodyAdvanced: null,  // null = off, { primary: 4, build: 4, height: 4 } = on
        ageEnabled: true,    // age toggle
        // Conflict system state
        conflictWarningsEnabled: true,
        conflictAutoResolution: null,  // null | 'ignore' | 'dual' | 'merge'
        conflictResolution: null,
        conflictInfo: null,
        conflictWarningCount: 0
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
            inputNegative: inputNegative.value,
            bodyAdvanced: state.bodyAdvanced,
            ageEnabled: state.ageEnabled
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
                state.bodyAdvanced = parsed.bodyAdvanced || null;
                state.ageEnabled = parsed.ageEnabled !== false;

                // Conflict system state restoration
                state.conflictWarningsEnabled = parsed.conflictWarningsEnabled !== false;
                state.conflictAutoResolution = parsed.conflictAutoResolution || null;
                state.conflictResolution = null; // Always reset on load
                state.conflictInfo = null;
                state.conflictWarningCount = parsed.conflictWarningCount || 0;

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
                        onSelectionChanged();
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
                    // === Body Magic Button in header ===
                    const magicBtn = document.createElement('button');
                    magicBtn.className = 'body-magic-btn';
                    magicBtn.innerHTML = '<i class="fa-solid fa-wand-sparkles"></i> ' +
                        (state.lang === 'zh' ? '🔮 高級魔法師專用' : '🔮 Advanced Magic');
                    magicBtn.addEventListener('click', () => {
                        openBodyMagicModal();
                    });
                    header.insertBefore(magicBtn, header.querySelector('.btn-custom-toggle'));

                    // If bodyAdvanced is active, show summary bar + disabled overlay
                    if (state.bodyAdvanced) {
                        const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                        const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                        const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                        const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];

                        const summaryBar = document.createElement('div');
                        summaryBar.className = 'body-advanced-summary';
                        const pLabel = primaryInfo.zh;
                        const bLabel = buildInfo.zh;
                        const hLabel = heightInfo.zh;

                        const summaryText = document.createElement('span');
                        summaryText.innerHTML = `🔮 ${state.lang === 'zh' ? '進階控制啟用中' : 'Advanced Active'}：${pLabel} / ${bLabel} / ${hLabel}`;

                        const editBtn = document.createElement('button');
                        editBtn.className = 'body-summary-action';
                        editBtn.textContent = state.lang === 'zh' ? '編輯' : 'Edit';
                        editBtn.addEventListener('click', () => openBodyMagicModal());

                        const clearBtn = document.createElement('button');
                        clearBtn.className = 'body-summary-action clear';
                        clearBtn.textContent = state.lang === 'zh' ? '清除' : 'Clear';
                        clearBtn.addEventListener('click', () => {
                            state.bodyAdvanced = null;
                            renderTabContent();
                            generatePrompt();
                            saveState();
                        });

                        summaryBar.appendChild(summaryText);
                        summaryBar.appendChild(editBtn);
                        summaryBar.appendChild(clearBtn);
                        sectionEl.appendChild(summaryBar);
                    }

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

            // If bodyType + bodyAdvanced active, add disabled overlay
            if (section.id === 'bodyType' && state.bodyAdvanced) {
                const tagGrid = sectionEl.querySelector('.tag-grid');
                if (tagGrid) tagGrid.classList.add('body-section-disabled');
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

    // ========================================
    // Body Magic Modal — Full Demo v2 Overlay
    // ========================================
    function openBodyMagicModal() {
        // Remove existing modal if any
        const existing = document.getElementById('body-magic-modal');
        if (existing) existing.remove();

        const currentGender = state.gender;
        const adv = state.bodyAdvanced || { primary: 4, build: 4, height: 4 };

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'body-magic-modal';

        // ── Full Demo v2 CSS (scoped) ──
        overlay.innerHTML = `
        <style>
            #body-magic-modal {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                z-index: 10000; display: flex; align-items: center; justify-content: center;
                background: rgba(0, 0, 0, 0.9);
                animation: bmm-fadeIn 0.5s ease;
                font-family: 'Inter', sans-serif;
            }
            @keyframes bmm-fadeIn { from { opacity: 0; } to { opacity: 1; } }
            #body-magic-modal .bmm-particles {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; overflow: hidden;
            }
            #body-magic-modal .bmm-particle {
                position: absolute; width: 4px; height: 4px; border-radius: 50%;
                background: #fbbf24; opacity: 0; animation: bmm-float 3s ease-in-out infinite;
            }
            @keyframes bmm-float {
                0% { opacity: 0; transform: translateY(100vh) scale(0); }
                50% { opacity: 0.8; }
                100% { opacity: 0; transform: translateY(-20px) scale(1.5); }
            }
            #body-magic-modal .bmm-container {
                position: relative; z-index: 1;
                background: linear-gradient(135deg, #0a0e1a 0%, #1e1b4b 40%, #0f172a 100%);
                border: 2px solid rgba(167, 139, 250, 0.4);
                border-radius: 16px; padding: 24px;
                max-width: 1200px; width: 95vw; max-height: 90vh;
                overflow-y: auto; scrollbar-width: thin;
                box-shadow: 0 0 60px rgba(167, 139, 250, 0.3), 0 0 120px rgba(251, 191, 36, 0.1);
            }
            #body-magic-modal .bmm-title {
                text-align: center; font-size: 1.4rem; font-weight: 700; margin-bottom: 6px;
                background: linear-gradient(135deg, #a78bfa, #60a5fa);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            #body-magic-modal .bmm-subtitle {
                text-align: center; font-size: 0.8rem; color: #64748b; margin-bottom: 20px;
            }
            #body-magic-modal .bmm-layout {
                display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
            }
            @media (max-width: 768px) {
                #body-magic-modal .bmm-layout { grid-template-columns: 1fr; }
            }
            #body-magic-modal .bmm-panel {
                background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px);
                border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 14px; padding: 20px;
            }
            #body-magic-modal .bmm-panel h2 {
                font-size: 1rem; margin-bottom: 16px; color: #a78bfa;
                display: flex; align-items: center; gap: 8px;
            }
            #body-magic-modal .bmm-gender { display: flex; gap: 8px; margin-bottom: 20px; }
            #body-magic-modal .bmm-gender-btn {
                flex: 1; padding: 9px; border: 2px solid transparent;
                border-radius: 10px; background: rgba(51, 65, 85, 0.6);
                color: #94a3b8; font-size: 0.85rem; cursor: pointer; transition: all 0.3s;
            }
            #body-magic-modal .bmm-gender-btn.active {
                border-color: #a78bfa; color: #e2e8f0; background: rgba(167, 139, 250, 0.15);
            }
            #body-magic-modal .bmm-gender-btn:hover { background: rgba(167, 139, 250, 0.1); }
            #body-magic-modal .bmm-feature { margin-bottom: 22px; }
            #body-magic-modal .bmm-feature-header {
                display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;
            }
            #body-magic-modal .bmm-feature-label { font-size: 0.9rem; font-weight: 600; color: #e2e8f0; }
            #body-magic-modal .bmm-feature-value {
                font-size: 0.78rem; color: #a78bfa; padding: 3px 12px;
                background: rgba(167, 139, 250, 0.15); border-radius: 20px;
                font-weight: 500; transition: all 0.3s;
            }
            #body-magic-modal .bmm-feature-value.fantasy {
                color: #fbbf24; background: rgba(251, 191, 36, 0.2);
                border: 1px solid rgba(251, 191, 36, 0.3);
                animation: bmm-glow 2s ease-in-out infinite;
            }
            @keyframes bmm-glow {
                0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.2); }
                50% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
            }
            #body-magic-modal .bmm-scale {
                display: flex; justify-content: space-between; margin-bottom: 5px;
                font-size: 0.6rem; color: #64748b;
            }
            #body-magic-modal .bmm-scale span { text-align: center; flex: 1; }
            #body-magic-modal .bmm-scale .fl { color: #fbbf24; font-weight: 600; font-size: 0.58rem; }
            #body-magic-modal .bmm-slider-wrap { position: relative; }
            #body-magic-modal .bmm-fz {
                position: absolute; top: -2px; height: 12px; border-radius: 4px;
                pointer-events: none; z-index: 0;
            }
            #body-magic-modal .bmm-fz-l {
                left: 0; width: 14.28%;
                background: repeating-linear-gradient(45deg, rgba(251,191,36,0.1), rgba(251,191,36,0.1) 3px, transparent 3px, transparent 6px);
                border: 1px dashed rgba(251,191,36,0.3); border-right: none; border-radius: 4px 0 0 4px;
            }
            #body-magic-modal .bmm-fz-r {
                right: 0; width: 14.28%;
                background: repeating-linear-gradient(45deg, rgba(251,191,36,0.1), rgba(251,191,36,0.1) 3px, transparent 3px, transparent 6px);
                border: 1px dashed rgba(251,191,36,0.3); border-left: none; border-radius: 0 4px 4px 0;
            }
            #body-magic-modal input[type="range"] {
                -webkit-appearance: none; appearance: none; width: 100%; height: 8px;
                border-radius: 4px; outline: none; cursor: pointer; position: relative; z-index: 1;
            }
            #body-magic-modal input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
                background: linear-gradient(135deg, #a78bfa, #7c3aed);
                box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
                cursor: pointer; margin-top: -7px; transition: box-shadow 0.3s;
            }
            #body-magic-modal input[type="range"].in-fantasy::-webkit-slider-thumb {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
            }
            #body-magic-modal input[type="range"]::-webkit-slider-runnable-track {
                height: 8px; border-radius: 4px;
            }
            #body-magic-modal input[type="range"]::-moz-range-thumb {
                width: 22px; height: 22px; border-radius: 50%; border: none;
                background: linear-gradient(135deg, #a78bfa, #7c3aed);
                box-shadow: 0 0 10px rgba(167, 139, 250, 0.5); cursor: pointer;
            }
            #body-magic-modal input[type="range"].in-fantasy::-moz-range-thumb {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
            }
            #body-magic-modal .sl-bust { background: linear-gradient(to right, #3b82f6, #60a5fa, #a78bfa, #f472b6, #ef4444); }
            #body-magic-modal .sl-muscle { background: linear-gradient(to right, #3b82f6, #94a3b8, #60a5fa, #a78bfa, #f97316, #ef4444); }
            #body-magic-modal .sl-height { background: linear-gradient(to right, #3b82f6, #f9a8d4, #94a3b8, #60a5fa, #a78bfa, #ef4444); }
            #body-magic-modal .sl-weight { background: linear-gradient(to right, #3b82f6, #60a5fa, #94a3b8, #a78bfa, #f97316, #ef4444); }
            #body-magic-modal .bmm-output-label {
                font-size: 0.7rem; color: #64748b; text-transform: uppercase;
                letter-spacing: 1px; margin-bottom: 5px;
            }
            #body-magic-modal .bmm-output-text {
                background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(148, 163, 184, 0.1);
                border-radius: 10px; padding: 12px; font-size: 0.8rem; line-height: 1.6;
                color: #cbd5e1; height: 80px; overflow-y: auto; scrollbar-width: thin;
                word-wrap: break-word; white-space: pre-wrap; margin-bottom: 12px;
            }
            #body-magic-modal .bmm-output-text .positive { color: #86efac; }
            #body-magic-modal .bmm-output-text .negative { color: #fca5a5; }
            #body-magic-modal .bmm-output-text .weight { color: #fcd34d; }
            #body-magic-modal .bmm-output-text .tag { color: #93c5fd; }
            #body-magic-modal .bmm-output-text .fantasy-tag { color: #fbbf24; font-weight: 600; }
            #body-magic-modal .bmm-weight-ind { display: flex; align-items: center; gap: 8px; margin-top: 6px; font-size: 0.75rem; }
            #body-magic-modal .bmm-weight-bar { flex: 1; height: 6px; background: rgba(51,65,85,0.5); border-radius: 3px; overflow: hidden; }
            #body-magic-modal .bmm-weight-fill { height: 100%; border-radius: 3px; transition: width 0.3s, background 0.3s; }
            #body-magic-modal .bmm-weight-num { font-weight: 600; min-width: 28px; text-align: right; }
            #body-magic-modal .bmm-fbanner {
                background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1));
                border: 1px solid rgba(251,191,36,0.3); border-radius: 10px;
                padding: 9px 12px; margin-bottom: 12px; font-size: 0.75rem;
                color: #fbbf24; display: flex; align-items: center; gap: 8px;
                visibility: hidden; transition: opacity 0.3s;
                opacity: 0;
            }
            #body-magic-modal .bmm-fbanner.show { visibility: visible; opacity: 1; }
            #body-magic-modal .bmm-fbanner .icon { font-size: 1.1rem; }
            #body-magic-modal .bmm-explain {
                background: rgba(15,23,42,0.6); border: 1px solid rgba(148,163,184,0.1);
                border-radius: 10px; padding: 12px; margin-top: 12px;
                font-size: 0.72rem; line-height: 1.6; color: #94a3b8;
                height: 100px; overflow-y: auto; scrollbar-width: thin;
            }
            #body-magic-modal .bmm-explain strong { color: #e2e8f0; }
            #body-magic-modal .bmm-presets { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
            #body-magic-modal .bmm-preset-btn {
                padding: 5px 10px; border: 1px solid rgba(148,163,184,0.2);
                border-radius: 7px; background: rgba(51,65,85,0.4);
                color: #94a3b8; font-size: 0.7rem; cursor: pointer; transition: all 0.2s;
            }
            #body-magic-modal .bmm-preset-btn:hover {
                border-color: #a78bfa; color: #e2e8f0; background: rgba(167,139,250,0.15);
            }
            #body-magic-modal .bmm-preset-btn.fp {
                border-color: rgba(251,191,36,0.3); color: #fbbf24;
            }
            #body-magic-modal .bmm-preset-btn.fp:hover {
                border-color: #fbbf24; background: rgba(251,191,36,0.15);
            }
            #body-magic-modal .bmm-preset-divider { width: 100%; height: 1px; background: rgba(148,163,184,0.1); margin: 3px 0; }
            #body-magic-modal .bmm-preset-label { width: 100%; font-size: 0.6rem; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
            #body-magic-modal .bmm-actions { display: flex; gap: 12px; margin-top: 18px; }
            #body-magic-modal .bmm-btn-apply {
                flex: 1; padding: 12px; border: none; border-radius: 10px;
                background: linear-gradient(135deg, #a78bfa, #7c3aed);
                color: white; font-size: 1rem; font-weight: 600; cursor: pointer;
                transition: all 0.3s; box-shadow: 0 4px 15px rgba(167,139,250,0.3);
            }
            #body-magic-modal .bmm-btn-apply:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(167,139,250,0.5); }
            #body-magic-modal .bmm-btn-cancel {
                padding: 12px 24px; border: 1px solid rgba(148,163,184,0.3);
                background: transparent; color: #94a3b8; border-radius: 10px;
                font-size: 0.9rem; cursor: pointer; transition: all 0.3s;
            }
            #body-magic-modal .bmm-btn-cancel:hover { border-color: #94a3b8; color: #e2e8f0; }
        </style>

        <div class="bmm-particles" id="bmm-particles"></div>
        <div class="bmm-container">
            <div class="bmm-title">🎛️ 身材控制系統 Demo v2 — 含幻想級別</div>
            <div class="bmm-subtitle">Body Type Weight System — 現實 ↔ 幻想級別 7 段滑桿</div>

            <div class="bmm-layout">
                <!-- LEFT: Controls -->
                <div class="bmm-panel">
                    <h2>⚙️ 控制面板</h2>
                    <div class="bmm-gender">
                        <button class="bmm-gender-btn${currentGender === 'female' ? ' active' : ''}" data-g="female">♀ 女性</button>
                        <button class="bmm-gender-btn${currentGender === 'male' ? ' active' : ''}" data-g="male">♂ 男性</button>
                    </div>

                    <!-- PRIMARY -->
                    <div class="bmm-feature" id="bmm-group-primary">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label" id="bmm-label-primary">${currentGender === 'female' ? '胸部大小 (Bust Size)' : '肌肉量 (Musculature)'}</span>
                            <span class="bmm-feature-value" id="bmm-val-primary"></span>
                        </div>
                        <div class="bmm-scale" id="bmm-scale-primary">
                            ${currentGender === 'female'
                ? '<span class="fl">🔮 無</span><span>平坦</span><span>偏小</span><span>中等</span><span>豐滿</span><span>巨大</span><span class="fl">🔮 超巨</span>'
                : '<span class="fl">🔮 骷髏</span><span>纖瘦</span><span>偏瘦</span><span>標準</span><span>壯碩</span><span>極壯</span><span class="fl">🔮 浩克</span>'}
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-primary" class="${currentGender === 'female' ? 'sl-bust' : 'sl-muscle'}" min="1" max="7" value="${adv.primary}" step="1">
                        </div>
                    </div>

                    <!-- BUILD -->
                    <div class="bmm-feature">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label">體型 (Build)</span>
                            <span class="bmm-feature-value" id="bmm-val-build"></span>
                        </div>
                        <div class="bmm-scale">
                            <span class="fl">🔮 骨感</span><span>纖瘦</span><span>苗條</span><span>標準</span><span>豐腴</span><span>壯碩</span><span class="fl">🔮 泰坦</span>
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-build" class="sl-weight" min="1" max="7" value="${adv.build}" step="1">
                        </div>
                    </div>

                    <!-- HEIGHT -->
                    <div class="bmm-feature">
                        <div class="bmm-feature-header">
                            <span class="bmm-feature-label">身高比例 (Height)</span>
                            <span class="bmm-feature-value" id="bmm-val-height"></span>
                        </div>
                        <div class="bmm-scale">
                            <span class="fl">🔮 蟻人</span><span>嬌小</span><span>偏矮</span><span>中等</span><span>偏高</span><span>高挑</span><span class="fl">🔮 巨人</span>
                        </div>
                        <div class="bmm-slider-wrap">
                            <div class="bmm-fz bmm-fz-l"></div>
                            <div class="bmm-fz bmm-fz-r"></div>
                            <input type="range" id="bmm-sl-height" class="sl-height" min="1" max="7" value="${adv.height}" step="1">
                        </div>
                    </div>

                    <!-- PRESETS -->
                    <div>
                        <div class="bmm-feature-label" style="margin-bottom: 8px; color: #e2e8f0;">快速預設 (Quick Presets)</div>
                        <div class="bmm-presets" id="bmm-preset-f" style="${currentGender === 'female' ? '' : 'display:none'}">
                            <span class="bmm-preset-label">寫實 Realistic</span>
                            <button class="bmm-preset-btn" data-p="loli">蘿莉體型</button>
                            <button class="bmm-preset-btn" data-p="petite">嬌小少女</button>
                            <button class="bmm-preset-btn" data-p="slim">苗條纖細</button>
                            <button class="bmm-preset-btn" data-p="average">標準均勻</button>
                            <button class="bmm-preset-btn" data-p="curvy">曲線性感</button>
                            <button class="bmm-preset-btn" data-p="voluptuous">豐滿誘人</button>
                            <button class="bmm-preset-btn" data-p="athletic_f">運動健美</button>
                            <div class="bmm-preset-divider"></div>
                            <span class="bmm-preset-label">🔮 幻想 Fantasy</span>
                            <button class="bmm-preset-btn fp" data-p="fairy">🧚 精靈仙子</button>
                            <button class="bmm-preset-btn fp" data-p="oppai">🎯 超乳幻想</button>
                            <button class="bmm-preset-btn fp" data-p="amazon">⚔️ 亞馬遜女戰士</button>
                            <button class="bmm-preset-btn fp" data-p="giantess">🏔️ 巨人族女性</button>
                            <button class="bmm-preset-btn fp" data-p="pixie">✨ 小精靈</button>
                        </div>
                        <div class="bmm-presets" id="bmm-preset-m" style="${currentGender === 'male' ? '' : 'display:none'}">
                            <span class="bmm-preset-label">寫實 Realistic</span>
                            <button class="bmm-preset-btn" data-p="shota">正太體型</button>
                            <button class="bmm-preset-btn" data-p="slim_m">纖瘦少年</button>
                            <button class="bmm-preset-btn" data-p="average_m">標準體型</button>
                            <button class="bmm-preset-btn" data-p="athletic_m">運動型</button>
                            <button class="bmm-preset-btn" data-p="muscular">肌肉壯碩</button>
                            <div class="bmm-preset-divider"></div>
                            <span class="bmm-preset-label">🔮 幻想 Fantasy</span>
                            <button class="bmm-preset-btn fp" data-p="elf_m">🧝 精靈族</button>
                            <button class="bmm-preset-btn fp" data-p="hulk">💪 浩克體型</button>
                            <button class="bmm-preset-btn fp" data-p="titan">🏔️ 泰坦巨人</button>
                            <button class="bmm-preset-btn fp" data-p="antman">🐜 蟻人縮小</button>
                            <button class="bmm-preset-btn fp" data-p="skeleton">💀 骷髏法師</button>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Output -->
                <div class="bmm-panel">
                    <h2>📝 生成結果</h2>
                    <div class="bmm-fbanner" id="bmm-fbanner">
                        <span class="icon">🔮</span>
                        <span>已進入<strong>幻想級別</strong>！魔咒包含超現實描述，失敗風險大增！</span>
                    </div>
                    <div class="bmm-output-label">✅ 正向提示詞 (Positive Prompt)</div>
                    <div class="bmm-output-text" id="bmm-out-pos"></div>
                    <div class="bmm-weight-ind">
                        <span style="color: #64748b;">魔法反噬：</span>
                        <div class="bmm-weight-bar"><div class="bmm-weight-fill" id="bmm-wf"></div></div>
                        <span class="bmm-weight-num" id="bmm-wn">1.0</span>
                    </div>
                    <div style="height: 12px;"></div>
                    <div class="bmm-output-label">❌ 反向咒語 (Negative Prompt)</div>
                    <div class="bmm-output-text" id="bmm-out-neg"></div>
                    <div class="bmm-output-label">📋 完整 YAML 輸出</div>
                    <div class="bmm-output-text" id="bmm-out-yaml" style="font-family: 'Consolas', monospace; font-size: 0.75rem;"></div>
                    <div class="bmm-explain" id="bmm-explain"></div>
                </div>
            </div>

            <div class="bmm-actions">
                <button class="bmm-btn-cancel" id="bmm-cancel">❌ 取消</button>
                <button class="bmm-btn-apply" id="bmm-apply">✨ 套用魔法</button>
            </div>
        </div>
        `;

        document.body.appendChild(overlay);

        // ── Particles ──
        const pc = document.getElementById('bmm-particles');
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'bmm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            const colors = ['#fbbf24', '#a78bfa', '#7c3aed', '#f59e0b', '#c084fc'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            pc.appendChild(p);
        }

        // ── Sound ──
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            [800, 1200, 1600, 2000].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = freq; osc.type = 'sine';
                gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
                osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.3);
            });
        } catch (e) { }

        // ── References ──
        const BUST = BODY_MAGIC_DATA.FEMALE_BUST;
        const MUSC = BODY_MAGIC_DATA.MALE_MUSCLE;
        const BLD = BODY_MAGIC_DATA.BUILD;
        const HGT = BODY_MAGIC_DATA.HEIGHT;
        const PRST = BODY_MAGIC_DATA.PRESETS;

        let modalGender = currentGender;
        const slP = document.getElementById('bmm-sl-primary');
        const slB = document.getElementById('bmm-sl-build');
        const slH = document.getElementById('bmm-sl-height');

        function fmtWeighted(tags, weight, isF) {
            if (!tags || tags.length === 0) return '';
            if (weight <= 1.0) return tags.join(', ');
            const cls = isF ? 'fantasy-tag' : 'weight';
            return tags.map(t => '<span class="' + cls + '">(' + t + ':' + weight.toFixed(1) + ')</span>').join(', ');
        }

        function updateModal() {
            const pVal = parseInt(slP.value);
            const bVal = parseInt(slB.value);
            const hVal = parseInt(slH.value);

            const primary = modalGender === 'female' ? BUST[pVal] : MUSC[pVal];
            const build = BLD[bVal];
            const height = HGT[hVal];
            const hasFantasy = primary.fantasy || build.fantasy || height.fantasy;

            // Fantasy banner
            document.getElementById('bmm-fbanner').classList.toggle('show', hasFantasy);

            // Value labels
            const vp = document.getElementById('bmm-val-primary');
            const vb = document.getElementById('bmm-val-build');
            const vh = document.getElementById('bmm-val-height');
            vp.textContent = primary.zh; vp.classList.toggle('fantasy', primary.fantasy);
            vb.textContent = build.zh; vb.classList.toggle('fantasy', build.fantasy);
            vh.textContent = height.zh; vh.classList.toggle('fantasy', height.fantasy);

            // Slider fantasy class
            slP.classList.toggle('in-fantasy', primary.fantasy);
            slB.classList.toggle('in-fantasy', build.fantasy);
            slH.classList.toggle('in-fantasy', height.fantasy);

            // Collect positive / negative
            const pPos = primary.positive || [];
            const bPos = build.positive || [];
            const hPos = height.positive || [];
            const pNeg = primary.negative || [];
            const bNeg = build.negative || [];
            const hNeg = height.negative || [];

            let allPos = [];
            if (pPos.length) allPos.push(fmtWeighted(pPos, primary.weight, primary.fantasy));
            if (bPos.length) allPos.push(fmtWeighted(bPos, build.weight, build.fantasy));
            if (hPos.length) allPos.push(fmtWeighted(hPos, height.weight, height.fantasy));
            const allNeg = [...new Set([...pNeg, ...bNeg, ...hNeg])];

            // Positive output
            document.getElementById('bmm-out-pos').innerHTML = allPos.filter(Boolean).join(', ') || '<span style="color:#64748b">（標準設定，無額外正向提示詞）</span>';

            // Negative output
            document.getElementById('bmm-out-neg').innerHTML = allNeg.length
                ? allNeg.map(t => '<span class="negative">' + t + '</span>').join(', ')
                : '<span style="color:#64748b">（無需負向提示詞）</span>';

            // YAML
            let yaml = '';
            if (pPos.length) {
                const k = modalGender === 'female' ? 'bust' : 'musculature';
                const pf = primary.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">' + k + ':</span> ' + pf + pPos.map(t => primary.weight > 1 ? '(' + t + ':' + primary.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (bPos.length) {
                const pf = build.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">build:</span> ' + pf + bPos.map(t => build.weight > 1 ? '(' + t + ':' + build.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (hPos.length) {
                const pf = height.fantasy ? '🔮 ' : '';
                yaml += '<span class="tag">height:</span> ' + pf + hPos.map(t => height.weight > 1 ? '(' + t + ':' + height.weight.toFixed(1) + ')' : t).join(', ') + '\n';
            }
            if (allNeg.length) yaml += '<span class="negative">negative:</span> ' + allNeg.join(', ');
            document.getElementById('bmm-out-yaml').innerHTML = yaml || '<span style="color:#64748b">body: average body</span>';

            // Weight indicator
            const maxW = Math.max(primary.weight, build.weight, height.weight);
            const pct = Math.min(((maxW - 1.0) / 0.8) * 100, 100);
            const wf = document.getElementById('bmm-wf');
            const wn = document.getElementById('bmm-wn');
            wf.style.width = pct + '%'; wn.textContent = maxW.toFixed(1);
            if (maxW >= 1.6) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444, #dc2626)'; wn.style.color = '#fbbf24'; }
            else if (maxW >= 1.3) { wf.style.background = 'linear-gradient(to right, #fbbf24, #ef4444)'; wn.style.color = '#fca5a5'; }
            else if (maxW >= 1.15) { wf.style.background = 'linear-gradient(to right, #86efac, #fbbf24)'; wn.style.color = '#fcd34d'; }
            else { wf.style.background = '#86efac'; wn.style.color = '#86efac'; }

            // Explanation
            const pExplain = primary.explain || '';
            const bExplain = build.explain || '';
            const hExplain = height.explain || '';
            document.getElementById('bmm-explain').innerHTML =
                '<strong>💡 原理說明：</strong><br>' +
                '▸ <strong>' + (modalGender === 'female' ? '胸部' : '肌肉') + '</strong>：' + pExplain +
                '<br>▸ <strong>體型</strong>：' + bExplain +
                '<br>▸ <strong>身高</strong>：' + hExplain;
        }

        // Track fantasy state to play sound on entry
        let prevFantasyCount = [adv.primary, adv.build, adv.height].filter(v => v === 1 || v === 7).length;

        function playFantasySound() {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                // Warning beeps then ascending sweep
                const notes = [329.63, 329.63, 440, 523.25, 659.25, 880];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = i < 2 ? 'square' : 'triangle';
                    const t = ctx.currentTime + i * 0.09;
                    const vol = i < 2 ? 0.012 : 0.015;
                    gain.gain.setValueAtTime(0, t);
                    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
                    gain.gain.setValueAtTime(vol, t + 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
                    osc.start(t); osc.stop(t + 0.15);
                });
            } catch (e) { }
        }

        updateModal();

        // Slider events with fantasy sound detection
        function onSliderInput() {
            updateModal();
            const curCount = [parseInt(slP.value), parseInt(slB.value), parseInt(slH.value)].filter(v => v === 1 || v === 7).length;
            if (curCount > prevFantasyCount) playFantasySound();
            prevFantasyCount = curCount;
        }
        slP.addEventListener('input', onSliderInput);
        slB.addEventListener('input', onSliderInput);
        slH.addEventListener('input', onSliderInput);

        // Gender toggle
        overlay.querySelectorAll('.bmm-gender-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modalGender = btn.dataset.g;
                overlay.querySelectorAll('.bmm-gender-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('bmm-label-primary').textContent =
                    modalGender === 'female' ? '胸部大小 (Bust Size)' : '肌肉量 (Musculature)';
                document.getElementById('bmm-scale-primary').innerHTML =
                    modalGender === 'female'
                        ? '<span class="fl">🔮 無</span><span>平坦</span><span>偏小</span><span>中等</span><span>豐滿</span><span>巨大</span><span class="fl">🔮 超巨</span>'
                        : '<span class="fl">🔮 骷髏</span><span>纖瘦</span><span>偏瘦</span><span>標準</span><span>壯碩</span><span>極壯</span><span class="fl">🔮 浩克</span>';
                slP.className = modalGender === 'female' ? 'sl-bust' : 'sl-muscle';
                document.getElementById('bmm-preset-f').style.display = modalGender === 'female' ? 'flex' : 'none';
                document.getElementById('bmm-preset-m').style.display = modalGender === 'male' ? 'flex' : 'none';
                updateModal();
            });
        });

        // Presets
        overlay.querySelectorAll('.bmm-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = PRST[btn.dataset.p];
                if (!p) return;
                slP.value = p.primary; slB.value = p.build; slH.value = p.height;
                updateModal();
            });
        });

        // Close helper
        function closeModal() {
            overlay.style.animation = 'bmm-fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 280);
        }

        // Cancel
        document.getElementById('bmm-cancel').addEventListener('click', closeModal);

        // Apply
        document.getElementById('bmm-apply').addEventListener('click', () => {
            state.bodyAdvanced = {
                primary: parseInt(slP.value),
                build: parseInt(slB.value),
                height: parseInt(slH.value)
            };
            state.gender = modalGender;
            delete state.selections['bodyType'];

            // Spell casting sound (ascending arpeggio with shimmer)
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
                notes.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain); gain.connect(ctx.destination);
                    osc.frequency.value = freq;
                    osc.type = i < 3 ? 'triangle' : 'sine';
                    const t = ctx.currentTime + i * 0.08;
                    gain.gain.setValueAtTime(0, t);
                    gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                    osc.start(t); osc.stop(t + 0.4);
                });
                // Shimmer layer
                const shim = ctx.createOscillator();
                const sg = ctx.createGain();
                shim.connect(sg); sg.connect(ctx.destination);
                shim.frequency.value = 2093; shim.type = 'sine';
                sg.gain.setValueAtTime(0.03, ctx.currentTime + 0.4);
                sg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
                shim.start(ctx.currentTime + 0.4); shim.stop(ctx.currentTime + 1.0);
            } catch (e) { }

            overlay.style.animation = 'bmm-fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
                renderTabContent();
                generatePrompt();
                saveState();
            }, 280);
        });

        // Click outside
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

        // ESC
        const escH = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escH); } };
        document.addEventListener('keydown', escH);
    }

    // ========================================
    // Conflict Detection & Enforcement System
    // (Restored from conflict_demo.html v3)
    // ========================================

    function checkAllConflicts() {
        for (const rule of CONFLICT_RULES) {
            // Gender-aware: 'gender' key uses state.gender directly
            const selA = rule.a === 'gender' ? state.gender : state.selections[rule.a];
            const selB = rule.b === 'gender' ? state.gender : state.selections[rule.b];
            if (!selA || !selB) continue;
            if (selA.toLowerCase().includes(rule.keyword_a) && selB.toLowerCase().includes(rule.keyword_b)) {
                // Find labels from data arrays
                let labelA = rule.keyword_a, labelB = rule.keyword_b;
                const findLabel = (data, val) => {
                    if (!data) return val;
                    const item = data.find(d => d.value === val || d.value.toLowerCase().includes(val));
                    return item ? item.label : val;
                };
                const catDataMap = {
                    race: RACES,
                    job: JOBS,
                    outfit: OUTFITS,
                    bodyType: state.gender === 'female' ? BODY_TYPES_FEMALE : BODY_TYPES_MALE,
                    hairstyle: state.gender === 'female' ? HAIRSTYLES_FEMALE : HAIRSTYLES_MALE
                };
                // For gender category, use localized label
                if (rule.a === 'gender') {
                    labelA = state.gender === 'male' ? '男性' : '女性';
                } else if (catDataMap[rule.a]) {
                    labelA = findLabel(catDataMap[rule.a], selA);
                }
                if (rule.b === 'gender') {
                    labelB = state.gender === 'male' ? '男性' : '女性';
                } else if (catDataMap[rule.b]) {
                    labelB = findLabel(catDataMap[rule.b], selB);
                }
                return { rule, labelA, labelB, catA: rule.a, catB: rule.b, reason: rule.reason };
            }
        }
        return null;
    }

    let conflictAlarmOscillators = [];
    let conflictAudioCtx = null;

    function playConflictAlarm() {
        try {
            if (!conflictAudioCtx) conflictAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (conflictAudioCtx.state === 'suspended') conflictAudioCtx.resume();
            const c = conflictAudioCtx, t = c.currentTime;
            const master = c.createGain(); master.gain.value = 0.25; master.connect(c.destination);
            stopConflictAlarm();
            // Impact boom
            const impact = c.createOscillator(); const impG = c.createGain();
            impact.type = 'sine'; impact.frequency.setValueAtTime(100, t);
            impact.frequency.exponentialRampToValueAtTime(25, t + 0.4);
            impG.gain.setValueAtTime(0.7, t); impG.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            impact.connect(impG); impG.connect(master); impact.start(t); impact.stop(t + 0.45);
            // Metal clang
            const clangSize = c.sampleRate * 0.15;
            const clangBuf = c.createBuffer(1, clangSize, c.sampleRate);
            const cd = clangBuf.getChannelData(0);
            for (let i = 0; i < clangSize; i++) cd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clangSize, 2);
            const clang = c.createBufferSource(); clang.buffer = clangBuf;
            const cf = c.createBiquadFilter(); cf.type = 'bandpass'; cf.frequency.value = 2500; cf.Q.value = 5;
            const cg = c.createGain(); cg.gain.value = 0.35;
            clang.connect(cf); cf.connect(cg); cg.connect(master); clang.start(t);
            // Repeating siren
            const dur = 3.0, bLen = 0.12, gap = 0.06, cyc = bLen + gap;
            for (let i = 0; i * cyc < dur; i++) {
                const st = t + 0.2 + i * cyc, freq = i % 2 === 0 ? 880 : 660;
                const s = c.createOscillator(); const sg = c.createGain();
                s.type = 'square'; s.frequency.setValueAtTime(freq, st);
                sg.gain.setValueAtTime(0.18, st); sg.gain.setValueAtTime(0.18, st + bLen * 0.8);
                sg.gain.exponentialRampToValueAtTime(0.001, st + bLen);
                s.connect(sg); sg.connect(master); s.start(st); s.stop(st + bLen + 0.01);
                conflictAlarmOscillators.push(s);
            }
            // Sub-bass pulse
            for (let i = 0; i < 6; i++) {
                const ps = t + 0.2 + i * 0.5;
                const p = c.createOscillator(); const pg = c.createGain();
                p.type = 'sine'; p.frequency.value = 45;
                pg.gain.setValueAtTime(0.3, ps); pg.gain.exponentialRampToValueAtTime(0.001, ps + 0.25);
                p.connect(pg); pg.connect(master); p.start(ps); p.stop(ps + 0.3);
                conflictAlarmOscillators.push(p);
            }
        } catch (e) { }
    }

    function stopConflictAlarm() {
        conflictAlarmOscillators.forEach(o => { try { o.stop(); } catch (e) { } });
        conflictAlarmOscillators = [];
    }

    function playResolveSound() {
        try {
            stopConflictAlarm();
            if (!conflictAudioCtx) return;
            const c = conflictAudioCtx, t = c.currentTime;
            const m = c.createGain(); m.gain.value = 0.15; m.connect(c.destination);
            [659.25, 783.99, 1046.5].forEach((f, i) => {
                const o = c.createOscillator(); const g = c.createGain();
                o.type = 'sine'; o.frequency.value = f;
                g.gain.setValueAtTime(0.2, t + i * 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
                o.connect(g); g.connect(m); o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.35);
            });
        } catch (e) { }
    }

    function showConflictModal(conflict) {
        state.conflictInfo = conflict;
        state.conflictWarningCount++;
        // Remove existing
        const existing = document.getElementById('conflict-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'conflict-overlay';
        overlay.innerHTML = `
<style>
#conflict-overlay { position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center; }
#conflict-overlay .conflict-bg { position:absolute;inset:0;background:rgba(80,0,0,0.6);backdrop-filter:blur(8px);animation:bg-pulse 1s ease-in-out infinite alternate; }
@keyframes bg-pulse { 0%{background:rgba(80,0,0,0.6)} 100%{background:rgba(20,0,0,0.75)} }
#conflict-overlay .conflict-modal { position:relative;width:500px;max-width:92vw;background:linear-gradient(145deg,#1a0a0a 0%,#2a1020 40%,#1a0a1a 100%);border:2px solid #ff2244;border-radius:16px;overflow:hidden;animation:modal-enter 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards,border-glow 2s ease-in-out infinite;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1); }
@keyframes modal-enter { 0%{transform:scale(0.3) rotate(-5deg);opacity:0} 60%{transform:scale(1.05) rotate(0.5deg);opacity:1} 100%{transform:scale(1) rotate(0deg);opacity:1} }
@keyframes border-glow { 0%{border-color:#ff2244;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} 50%{border-color:#ff6644;box-shadow:0 0 40px rgba(255,102,68,0.6),0 0 80px rgba(255,102,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} 100%{border-color:#ff2244;box-shadow:0 0 30px rgba(255,34,68,0.5),0 0 60px rgba(255,34,68,0.3),inset 0 1px 0 rgba(255,255,255,0.1)} }
.conflict-header { background:linear-gradient(135deg,rgba(255,34,68,0.3),rgba(200,0,40,0.2));padding:18px 24px;text-align:center;position:relative;overflow:hidden; }
.conflict-header::before { content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(0,0,0,0.1) 20px,rgba(0,0,0,0.1) 22px);animation:stripe-move 1s linear infinite; }
@keyframes stripe-move { 0%{transform:translateX(0)} 100%{transform:translateX(22px)} }
.conflict-title { font-size:1.3rem;font-weight:900;color:#ff4444;position:relative;text-shadow:0 0 15px rgba(255,68,68,0.5); }
.conflict-subtitle { font-size:0.75rem;color:rgba(255,255,255,0.7);margin-top:4px;position:relative;letter-spacing:2px; }
.conflict-body { padding:20px 24px; }
.conflict-desc { font-size:1.1rem;font-weight:600;line-height:1.7;color:#ddd;margin-bottom:8px;text-align:center;white-space:nowrap; }
.conflict-combo { display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:14px; }
.combo-tag { padding:8px 16px;border-radius:10px;font-weight:700;font-size:0.95rem; }
.combo-race { background:rgba(255,68,68,0.2);border:1px solid #ff4444;color:#ff8888; }
.combo-job { background:rgba(68,136,255,0.2);border:1px solid #4488ff;color:#88bbff; }
.combo-x { font-size:1.4rem;color:#ff4444;font-weight:900;text-shadow:0 0 10px rgba(255,68,68,0.5);animation:x-pulse 0.6s ease-in-out infinite alternate; }
@keyframes x-pulse { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.2);opacity:1} }
.conflict-reason { font-size:0.8rem;color:#aa8888;text-align:center;margin-bottom:16px;font-style:italic; }
.conflict-prompt-label { font-size:0.75rem;color:#888;margin-bottom:8px; }
.conflict-options { display:flex;flex-direction:column;gap:10px; }
.conflict-option { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;cursor:pointer;transition:all 0.25s;text-align:left;font-family:inherit;color:inherit; }
.conflict-option:hover { border-color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.08);transform:translateX(4px); }
.option-title { font-size:0.92rem;font-weight:700;margin-bottom:4px; }
.option-desc { font-size:0.75rem;color:#999;line-height:1.4; }
.option-1 .option-title { color:#ff8844; }
.option-2 .option-title { color:#44aaff; }
.option-3 .option-title { color:#44ff88; }
.conflict-counter { position:absolute;top:12px;right:16px;font-size:0.65rem;color:rgba(255,255,255,0.5);z-index:1; }
.screen-flash { position:fixed;inset:0;background:rgba(255,0,0,0.3);z-index:9998;pointer-events:none;opacity:0; }
.screen-flash.active { animation:flash-hit 0.4s ease-out forwards; }
@keyframes flash-hit { 0%{opacity:1} 100%{opacity:0} }
body.screen-shake { animation:shake-screen 0.4s ease-in-out; }
@keyframes shake-screen { 0%,100%{transform:translate(0)} 10%{transform:translate(-4px,2px)} 20%{transform:translate(4px,-2px)} 30%{transform:translate(-3px,1px)} 40%{transform:translate(3px,-1px)} 50%{transform:translate(-2px,1px)} 60%{transform:translate(2px,0)} 70%{transform:translate(-1px,0)} }
.remember-choice { margin-top:14px;padding:12px 14px;background:rgba(187,134,252,0.06);border:1px solid rgba(187,134,252,0.2);border-radius:8px;display:none; }
.remember-choice.visible { display:flex;align-items:center;gap:10px;animation:fadeSlideIn 0.3s ease forwards; }
@keyframes fadeSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.remember-choice input[type="checkbox"] { width:18px;height:18px;accent-color:#bb86fc;cursor:pointer;flex-shrink:0; }
.remember-choice label { font-size:0.8rem;color:#bb86fc;cursor:pointer;line-height:1.4; }
.remember-choice .hint { font-size:0.7rem;color:#888;margin-top:2px; }
.resolution-toast { position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,0,0,0.85);border:1px solid rgba(187,134,252,0.4);border-radius:12px;padding:14px 24px;color:#ddd;font-size:0.85rem;z-index:10000;opacity:0;transition:all 0.3s ease;max-width:500px;text-align:center; }
.resolution-toast.show { opacity:1;transform:translateX(-50%) translateY(0); }
</style>
<div class="conflict-bg"></div>
<div class="conflict-modal">
    <div class="conflict-header">
        <div class="conflict-title">⚠️ 危險! 魔法錯誤警告!</div>
        <div class="conflict-subtitle">MAGIC CONFLICT DETECTED</div>
        <div class="conflict-counter">第 ${state.conflictWarningCount} 次警告</div>
    </div>
    <div class="conflict-body">
        <div class="conflict-combo">
            <span class="combo-tag combo-race">${conflict.labelA}</span>
            <span class="combo-x">✕</span>
            <span class="combo-tag combo-job">${conflict.labelB}</span>
        </div>
        <div class="conflict-desc">「<strong>${conflict.labelA}</strong>」×「<strong>${conflict.labelB}</strong>」組合偵測到衝突！</div>
        <div class="conflict-reason">${conflict.reason}</div>
        <div class="conflict-prompt-label">請選擇處理方式:</div>
        <div class="conflict-options">
            <button class="conflict-option option-1" id="conflict-opt-ignore">
                <div class="option-title">🔥 忽略警告，繼續執行</div>
                <div class="option-desc">⚠ 可能產生兩個角色的圖片，但保留你的原始設定</div>
            </button>
            <button class="conflict-option option-2" id="conflict-opt-dual">
                <div class="option-title">👥 接受雙人構圖</div>
                <div class="option-desc">系統加入「2characters」提示詞，明確生成雙角色構圖</div>
            </button>
            <button class="conflict-option option-3" id="conflict-opt-merge">
                <div class="option-title">✨ 合併為一體</div>
                <div class="option-desc">系統強調「一個角色同時具有兩種特質」，避免分裂</div>
            </button>
        </div>
        <div class="remember-choice ${state.conflictWarningCount >= 3 ? 'visible' : ''}" id="remember-choice">
            <input type="checkbox" id="remember-checkbox">
            <div>
                <label for="remember-checkbox">以後都用此方式處理，不再顯示警告</label>
                <div class="hint">可在「設定」中隨時重新開啟警告</div>
            </div>
        </div>
    </div>
</div>
        `;
        document.body.appendChild(overlay);

        // Screen flash
        let flash = document.getElementById('screen-flash-conflict');
        if (!flash) { flash = document.createElement('div'); flash.id = 'screen-flash-conflict'; flash.className = 'screen-flash'; document.body.appendChild(flash); }
        flash.classList.remove('active'); void flash.offsetWidth; flash.classList.add('active');

        // Screen shake — remove class after animation to prevent breaking position:fixed
        document.body.classList.remove('screen-shake'); void document.body.offsetWidth; document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 500);

        // Alarm
        playConflictAlarm();

        // Button handlers
        const resolveConflict = (type) => {
            state.conflictResolution = type;
            const rememberCb = document.getElementById('remember-checkbox');
            if (rememberCb && rememberCb.checked) {
                state.conflictAutoResolution = type;
                state.conflictWarningsEnabled = false;
            }
            overlay.remove();
            playResolveSound();
            let toastMsg = '';
            if (type === 'ignore') toastMsg = '🔥 已忽略警告 — 保留原始設定';
            else if (type === 'dual') toastMsg = '👥 已切換為雙人構圖 — 加入 "2characters"';
            else if (type === 'merge') toastMsg = '✨ 已合併為一體 — 強調單一角色';
            if (rememberCb && rememberCb.checked) toastMsg += '\n📌 已記住此選擇';
            showConflictToast(toastMsg);
            generatePrompt();
            saveState();
        };
        document.getElementById('conflict-opt-ignore').addEventListener('click', () => resolveConflict('ignore'));
        document.getElementById('conflict-opt-dual').addEventListener('click', () => resolveConflict('dual'));
        document.getElementById('conflict-opt-merge').addEventListener('click', () => resolveConflict('merge'));
    }

    function showConflictToast(msg) {
        let toast = document.getElementById('conflict-resolution-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'conflict-resolution-toast';
            document.body.appendChild(toast);
        }
        // Use absolute positioning with JS-calculated coords (position:fixed breaks with backdrop-filter/transform parents)
        toast.style.cssText = 'position:absolute;background:rgba(0,0,0,0.85);border:1px solid rgba(187,134,252,0.4);border-radius:12px;padding:14px 24px;color:#ddd;font-size:0.85rem;z-index:10000;max-width:500px;text-align:center;white-space:pre-line;transition:opacity 0.3s ease;pointer-events:none;';
        toast.textContent = msg;
        // Position at bottom-center of viewport
        document.body.appendChild(toast); // ensure it's in body
        const tw = toast.offsetWidth;
        toast.style.left = ((window.innerWidth - tw) / 2) + 'px';
        toast.style.top = (window.scrollY + window.innerHeight - 80) + 'px';
        toast.style.opacity = '1';
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.style.opacity = '0';
        }, 3500);
    }

    function onSelectionChanged() {
        try {
            state.conflictResolution = null;
            const conflict = checkAllConflicts();
            if (conflict) {
                state.conflictInfo = conflict;
                if (!state.conflictWarningsEnabled && state.conflictAutoResolution) {
                    state.conflictResolution = state.conflictAutoResolution;
                    generatePrompt();
                    showConflictToast('⚡ 已自動套用: ' + (state.conflictAutoResolution === 'ignore' ? '🔥 忽略警告' : state.conflictAutoResolution === 'dual' ? '👥 雙人構圖' : '✨ 合併一體'));
                    return;
                }
                showConflictModal(conflict);
            } else {
                state.conflictInfo = null;
                generatePrompt();
            }
        } catch (err) {
            console.warn('Conflict system error:', err);
            generatePrompt();
        }
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
        // Check for conflicts on any conflict-relevant selection
        if (['race', 'job', 'outfit', 'bodyType', 'hairstyle'].includes(sectionId)) {
            onSelectionChanged();
        } else {
            generatePrompt();
        }
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
        if (state.age) {
            const ageDesc = getAgeDescriptor(state.age, state.gender);
            if (ageDesc) {
                parts.push(ageDesc);
            } else {
                parts.push(`${state.age} years old`);
            }
        }

        // Generate order based on tabs
        const sectionOrder = ['race', 'job', 'hairstyle', 'bodyType', 'hairColor', 'eyeColorLeft', 'eyeColorRight',
            'outfit', 'expression', 'mood', 'animeStyle', 'artStyle', 'artist', 'quality',
            'scene', 'weather', 'lighting', 'cameraAngle', 'shotSize', 'focalLength', 'aperture', 'lensEffect'];

        sectionOrder.forEach(secId => {
            // Skip bodyType if bodyAdvanced is active (handled separately)
            if (secId === 'bodyType' && state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
                // Use positive[] arrays from demo v2 format with weights
                if (primaryInfo.positive && primaryInfo.positive.length) {
                    primaryInfo.positive.forEach(tag => parts.push(`(${tag}:${primaryInfo.weight})`));
                }
                if (buildInfo.positive && buildInfo.positive.length) {
                    buildInfo.positive.forEach(tag => parts.push(`(${tag}:${buildInfo.weight})`));
                }
                if (heightInfo.positive && heightInfo.positive.length) {
                    heightInfo.positive.forEach(tag => parts.push(`(${tag}:${heightInfo.weight})`));
                }
                return;
            }
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

        let result = parts.join(', ');

        // Apply conflict resolution to final prompt
        if (state.conflictInfo && state.conflictResolution) {
            if (state.conflictResolution === 'dual') {
                result = '2characters, multiple characters, ' + result;
            } else if (state.conflictResolution === 'merge') {
                const coreA = (state.selections[state.conflictInfo.catA] || '').split(',')[0].trim();
                const coreB = (state.selections[state.conflictInfo.catB] || '').split(',')[0].trim();
                if (coreA && coreB) {
                    result = `(${coreA} ${coreB}:1.3), single character, solo, ` + result;
                }
            }
            // 'ignore' = no modification
        }

        return result;
    }

    function generatePromptYAML() {
        let yaml = '';

        yaml += `gender: ${state.gender === 'female' ? 'female' : 'male'}\n`;

        if (inputSubject.value.trim()) yaml += `subject: ${inputSubject.value.trim()}\n`;

        if (state.age) {
            const ageDesc = getAgeDescriptor(state.age, state.gender);
            if (ageDesc) {
                yaml += `age: ${ageDesc}\n`;
            } else {
                yaml += `age: ${state.age} years old\n`;
            }
        }

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
            // Skip bodyType if bodyAdvanced is active (handled separately)
            if (secId === 'bodyType' && state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
                const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
                const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
                const bodyParts = [];
                if (primaryInfo.positive && primaryInfo.positive.length) {
                    primaryInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${primaryInfo.weight})`));
                }
                if (buildInfo.positive && buildInfo.positive.length) {
                    buildInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${buildInfo.weight})`));
                }
                if (heightInfo.positive && heightInfo.positive.length) {
                    heightInfo.positive.forEach(tag => bodyParts.push(`(${tag}:${heightInfo.weight})`));
                }
                if (bodyParts.length > 0) {
                    yaml += `body_type: ${bodyParts.join(', ')}\n`;
                }
                return;
            }
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

        // Append body magic negative prompts if active
        if (state.bodyAdvanced) {
            const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
            const primaryInfo = primaryData[state.bodyAdvanced.primary || 4];
            const buildInfo = BODY_MAGIC_DATA.BUILD[state.bodyAdvanced.build || 4];
            const heightInfo = BODY_MAGIC_DATA.HEIGHT[state.bodyAdvanced.height || 4];
            const negParts = [];
            if (primaryInfo.negative && primaryInfo.negative.length) negParts.push(...primaryInfo.negative);
            if (buildInfo.negative && buildInfo.negative.length) negParts.push(...buildInfo.negative);
            if (heightInfo.negative && heightInfo.negative.length) negParts.push(...heightInfo.negative);
            if (negParts.length > 0) {
                const existing = outputNegative.value;
                outputNegative.value = existing ? existing + ', ' + negParts.join(', ') : negParts.join(', ');
            }
        }

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
            version: "v6.0",
            date: "2026-02-17",
            changes: [
                "⚙️ 設定面板新增「衝突偵測」區塊：啟用/停用 toggle + 自動處理方式顯示 + 重置按鈕",
                "🔮 設定面板新增「身材控制」區塊：顯示目前套用狀態 + 重置按鈕",
                "🐛 修復 Body Magic「套用魔法」後資料未傳至 Generated Prompt 的問題",
                "🐛 修復 YAML 格式下 bodyAdvanced 資料遺失問題",
                "🐛 修復負向提示詞(Negative Prompt)未包含 Body Magic 反向咒語的問題"
            ]
        },
        {
            version: "v5.9",
            date: "2026-02-17",
            changes: [
                "⚡ 衝突規則大幅擴展：32 條 → 130+ 條，涵蓋 race×job、race×outfit、job×outfit、gender 四大類",
                "👗 新增種族×服裝衝突（幽靈/史萊姆/人魚/妖精/半人馬等 vs 各種服裝）",
                "⚔️ 新增職業×服裝衝突（騎士×比基尼、忍者×重甲、修女×兔裝）",
                "⚧️ 新增性別相關衝突提醒（男×兔女郎、男×花魁、女×執事）",
                "🔧 checkAllConflicts 支援 outfit/bodyType/hairstyle 類別 + gender-aware 邏輯",
                "🔧 selectOption 觸發條件擴展到 5 個類別（race/job/outfit/bodyType/hairstyle）",
                "🔧 gender toggle 切換時也會觸發衝突檢查"
            ]
        },
        {
            version: "v5.8",
            date: "2026-02-17",
            changes: [
                "🛡️ 還原衝突偵測系統：種族×職業衝突警告、動態 modal、三選一解決方案",
                "🎂 還原進階年齡描述詞系統：1-100 歲男女專屬物理描述",
                "🔊 衝突警報音效（爆炸+金屬碰撞+警報）+ 畫面震動/閃爍",
                "💾 修復 loadState 正確恢復衝突系統設定",
                "🐛 加入 try-catch 安全防護與 console 診斷訊息"
            ]
        },
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

    // --- Conflict Detection Settings ---
    const conflictToggle = document.getElementById('setting-conflict-warnings');
    const conflictAutoLabel = document.getElementById('setting-conflict-auto-label');
    const conflictResetBtn = document.getElementById('setting-conflict-reset');

    if (conflictToggle) {
        conflictToggle.addEventListener('change', () => {
            state.conflictWarningsEnabled = conflictToggle.checked;
            saveState();
        });
    }

    if (conflictResetBtn) {
        conflictResetBtn.addEventListener('click', () => {
            state.conflictAutoResolution = null;
            state.conflictWarningsEnabled = true;
            if (conflictToggle) conflictToggle.checked = true;
            updateConflictSettingsUI();
            saveState();
            sfx.playClick();
        });
    }

    function updateConflictSettingsUI() {
        if (conflictToggle) conflictToggle.checked = state.conflictWarningsEnabled;
        if (conflictAutoLabel) {
            const modeMap = { 'ignore': '忽略（繼續生成）', 'dual': '雙角色模式', 'merge': '融合模式' };
            conflictAutoLabel.textContent = state.conflictAutoResolution
                ? modeMap[state.conflictAutoResolution] || state.conflictAutoResolution
                : '未設定（每次詢問）';
        }
    }

    // --- Body Magic Settings ---
    const bodyMagicStatus = document.getElementById('setting-bodymagic-status');
    const bodyMagicResetBtn = document.getElementById('setting-bodymagic-reset');

    if (bodyMagicResetBtn) {
        bodyMagicResetBtn.addEventListener('click', () => {
            state.bodyAdvanced = null;
            renderTabContent();
            generatePrompt();
            saveState();
            updateBodyMagicSettingsUI();
            sfx.playClick();
        });
    }

    function updateBodyMagicSettingsUI() {
        if (bodyMagicStatus) {
            if (state.bodyAdvanced) {
                const primaryData = state.gender === 'female' ? BODY_MAGIC_DATA.FEMALE_BUST : BODY_MAGIC_DATA.MALE_MUSCLE;
                const pInfo = primaryData[state.bodyAdvanced.primary || 4];
                bodyMagicStatus.textContent = `已套用 — ${pInfo ? pInfo.label : '自訂'}`;
                bodyMagicStatus.style.color = '#22c55e';
            } else {
                bodyMagicStatus.textContent = '目前未套用';
                bodyMagicStatus.style.color = '#a855f7';
            }
        }
    }

    // Sync settings UI when settings modal opens
    const origOpenSettings = openSettings;
    openSettings = function () {
        updateConflictSettingsUI();
        updateBodyMagicSettingsUI();
        origOpenSettings();
    };
    btnSettings.removeEventListener('click', origOpenSettings);
    btnSettings.addEventListener('click', openSettings);

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
