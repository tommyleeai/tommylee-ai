# 職業預覽圖 Prompt 紀錄

> 此文件記錄每個職業的 **圖片生成 prompt** 和 **對應的 options-data.js value**。
> 兩者的描述核心必須一致，確保預覽圖與實際 prompt 視覺匹配。

## 映射規則

- **圖片 prompt**：`Transform this woman into [職業描述]. Keep the EXACT same face...`（給 Grok API 用）
- **value**：去掉 "Transform" 指令，只保留職業的風格中立描述（給 prompt 生成用）

---

## 1. 學生 (student)
- **圖片 prompt**: `Transform this woman into a student wearing a Japanese school uniform (seifuku) with a sailor collar, pleated skirt, school bag. Keep the EXACT same face, hair, and facial features. School hallway background.`
- **value**: `student, Japanese school uniform, sailor collar, pleated skirt, school bag, school hallway background`

## 2. 教師 (teacher)
- **圖片 prompt**: `Transform this woman into a teacher wearing professional attire with glasses, holding a textbook, standing near a whiteboard. Keep the EXACT same face, hair, and facial features. Classroom background.`
- **value**: `teacher, professional attire, glasses, textbook, whiteboard, classroom background`

## 3. 幼稚園老師 (kindergarten)
- **圖片 prompt**: `Transform this woman into a kindergarten teacher wearing a colorful apron over casual clothes, warm gentle smile, surrounded by toys. Keep the EXACT same face, hair, and facial features. Colorful playroom background.`
- **value**: `kindergarten teacher, colorful apron, warm gentle smile, surrounded by toys, colorful playroom background`

## 4. 護士 (nurse)
- **圖片 prompt**: `Transform this woman into a nurse wearing a white nurse uniform with a nurse cap, stethoscope around neck. Keep the EXACT same face, hair, and facial features. Hospital corridor background.`
- **value**: `nurse, white nurse uniform, nurse cap, stethoscope, hospital corridor background`

## 5. 醫生 (doctor)
- **圖片 prompt**: `Transform this woman into a doctor wearing a white lab coat, stethoscope, professional medical attire. Keep the EXACT same face, hair, and facial features. Hospital office background.`
- **value**: `doctor, white lab coat, stethoscope, professional medical attire, hospital office background`

## 6. 藥劑師 (pharmacist)
- **圖片 prompt**: `Transform this woman into a pharmacist wearing a white lab coat, handling medicine bottles on pharmacy shelves. Keep the EXACT same face, hair, and facial features. Pharmacy background.`
- **value**: `pharmacist, white lab coat, medicine bottles, pharmacy shelves, pharmacy background`

## 7. 警察 (police)
- **圖片 prompt**: `Transform this woman into a police officer wearing a dark blue police uniform with badge, cap, and radio. Keep the EXACT same face, hair, and facial features. Police station background.`
- **value**: `police officer, dark blue police uniform, badge, cap, radio, police station background`

## 8. 消防員 (firefighter)
- **圖片 prompt**: `Transform this woman into a firefighter wearing a yellow/tan firefighter jacket and helmet, holding a fire hose. Keep the EXACT same face, hair, and facial features. Fire station background.`
- **value**: `firefighter, yellow firefighter jacket, helmet, fire hose, fire station background`

## 9. 軍人 (soldier)
- **圖片 prompt**: `Transform this woman into a soldier wearing military camouflage uniform, beret, and dog tags. Keep the EXACT same face, hair, and facial features. Military base background.`
- **value**: `soldier, military camouflage uniform, beret, dog tags, military base background`

## 10. 特種兵 (special_forces)
- **圖片 prompt**: `Transform this woman into a special forces operator wearing tactical black gear, night vision goggles on helmet, body armor. Keep the EXACT same face, hair, and facial features. Dark tactical background.`
- **value**: `special forces operator, tactical black gear, night vision goggles, helmet, body armor, dark tactical background`

## 11. 空姐 (flight_attendant)
- **圖片 prompt**: `Transform this woman into a flight attendant wearing a navy blue airline uniform with neckerchief, wings pin badge, elegant posture. Keep the EXACT same face, hair, and facial features. Aircraft cabin background.`
- **value**: `flight attendant, navy blue airline uniform, neckerchief, wings pin badge, elegant posture, aircraft cabin background`

## 12. 機長 (pilot)
- **圖片 prompt**: `Transform this woman into an airline pilot wearing a white pilot shirt with epaulettes, captain hat, aviator sunglasses on collar. Keep the EXACT same face, hair, and facial features. Cockpit background.`
- **value**: `airline pilot, white pilot shirt, epaulettes, captain hat, aviator sunglasses, cockpit background`

## 13. 太空人 (astronaut)
- **圖片 prompt**: `Transform this woman into an astronaut wearing a white NASA-style spacesuit, helmet held under arm. Keep the EXACT same face, hair, and facial features. Space station background with Earth visible.`
- **value**: `astronaut, white NASA-style spacesuit, helmet held under arm, space station background, Earth visible`

## 14. 秘書 (secretary)
- **圖片 prompt**: `Transform this woman into a secretary wearing a formal blouse and pencil skirt, holding a clipboard, professional look. Keep the EXACT same face, hair, and facial features. Modern office background.`
- **value**: `secretary, formal blouse, pencil skirt, clipboard, professional look, modern office background`

## 15. OL (office_lady)
- **圖片 prompt**: `Transform this woman into an office lady wearing a tailored business suit (blazer + skirt), holding a laptop. Keep the EXACT same face, hair, and facial features. Corporate office background.`
- **value**: `office lady, tailored business suit, blazer, skirt, laptop, corporate office background`

## 16. 會計 (accountant)
- **圖片 prompt**: `Transform this woman into an accountant wearing glasses, formal business attire, with calculator and financial documents on desk. Keep the EXACT same face, hair, and facial features. Office desk background.`
- **value**: `accountant, glasses, formal business attire, calculator, financial documents, office desk background`

## 17. 律師 (lawyer)
- **圖片 prompt**: `Transform this woman into a lawyer wearing a dark tailored suit, holding legal documents, confident pose. Keep the EXACT same face, hair, and facial features. Courtroom or law office background.`
- **value**: `lawyer, dark tailored suit, legal documents, confident pose, courtroom background`

## 18. 記者 (reporter)
- **圖片 prompt**: `Transform this woman into a news reporter wearing professional attire, holding a microphone with press badge, reporting on location. Keep the EXACT same face, hair, and facial features. Outdoor news scene background.`
- **value**: `news reporter, professional attire, microphone, press badge, outdoor news scene background`

## 19. 主播 (news_anchor)
- **圖片 prompt**: `Transform this woman into a TV news anchor wearing elegant professional attire, sitting at a news desk with monitors behind. Keep the EXACT same face, hair, and facial features. News studio background.`
- **value**: `TV news anchor, elegant professional attire, news desk, monitors, news studio background`

## 20. 導演 (director)
- **圖片 prompt**: `Transform this woman into a film director wearing casual stylish clothes, holding a megaphone, next to a film camera. Keep the EXACT same face, hair, and facial features. Film set background.`
- **value**: `film director, casual stylish clothes, megaphone, film camera, film set background`

## 21. 攝影師 (photographer)
- **圖片 prompt**: `Transform this woman into a photographer wearing casual trendy clothes, holding a professional DSLR camera with large lens. Keep the EXACT same face, hair, and facial features. Photography studio background.`
- **value**: `photographer, casual trendy clothes, professional DSLR camera, large lens, photography studio background`

## 22. 圖書館員 (librarian)
- **圖片 prompt**: `Transform this woman into a librarian wearing a cardigan, glasses, surrounded by bookshelves, holding a stack of books. Keep the EXACT same face, hair, and facial features. Library background.`
- **value**: `librarian, cardigan, glasses, bookshelves, stack of books, library background`

## 23. 保全 (security_guard)
- **圖片 prompt**: `Transform this woman into a security guard wearing a dark uniform with badge, utility belt, walkie-talkie. Keep the EXACT same face, hair, and facial features. Building entrance background.`
- **value**: `security guard, dark uniform, badge, utility belt, walkie-talkie, building entrance background`

## 24. 建築師 (architect)
- **圖片 prompt**: `Transform this woman into an architect wearing smart casual attire with a hard hat, holding blueprints and architectural plans. Keep the EXACT same face, hair, and facial features. Construction site or office background.`
- **value**: `architect, smart casual attire, hard hat, blueprints, architectural plans, construction site background`

## 25. 工程師 (engineer)
- **圖片 prompt**: `Transform this woman into an engineer wearing a safety vest and hard hat, holding technical blueprints, at a construction site. Keep the EXACT same face, hair, and facial features. Industrial site background.`
- **value**: `engineer, safety vest, hard hat, technical blueprints, industrial site background`

## 26. 科學家 (scientist)
- **圖片 prompt**: `Transform this woman into a scientist wearing a white lab coat, safety goggles on forehead, holding a beaker with colored liquid. Keep the EXACT same face, hair, and facial features. Laboratory background with equipment.`
- **value**: `scientist, white lab coat, safety goggles, beaker with colored liquid, laboratory background`

## 27. 運動員 (athlete)
- **圖片 prompt**: `Transform this woman into an athlete wearing sporty tank top and shorts, athletic build, holding a medal or trophy. Keep the EXACT same face, hair, and facial features. Stadium or track field background.`
- **value**: `athlete, sporty tank top, shorts, athletic build, medal, stadium background`

## 28. 教練 (coach)
- **圖片 prompt**: `Transform this woman into a sports coach wearing a tracksuit, whistle around neck, holding a clipboard with game strategy. Keep the EXACT same face, hair, and facial features. Sports field background.`
- **value**: `sports coach, tracksuit, whistle, clipboard, game strategy, sports field background`

## 29. 救生員 (lifeguard)
- **圖片 prompt**: `Transform this woman into a lifeguard wearing a red swimsuit/rashguard with LIFEGUARD text, holding a rescue buoy. Keep the EXACT same face, hair, and facial features. Beach/pool background.`
- **value**: `lifeguard, red swimsuit, LIFEGUARD text, rescue buoy, beach background`

## 30. 郵差 (mail_carrier)
- **圖片 prompt**: `Transform this woman into a mail carrier wearing a blue postal uniform, carrying a mail bag full of letters. Keep the EXACT same face, hair, and facial features. Residential street background.`
- **value**: `mail carrier, blue postal uniform, mail bag, letters, residential street background`
