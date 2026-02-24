// ============================================
// 分享 URL 模組
// 將角色設定存入 Firestore，生成可分享的短連結
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.ShareURL = (function () {
    'use strict';

    const COLLECTION = 'shared_prompts';

    // === 從完整 state 提取可分享的欄位 ===
    function extractShareableState(state) {
        return {
            dimension: state.dimension || 'anime',
            gender: state.gender || 'female',
            age: state.age || 21,
            selections: state.selections || {},
            customInputs: state.customInputs || {},
            bodyAdvanced: state.bodyAdvanced || null,
            hairAdvanced: state.hairAdvanced || null,
            hairMagicPrompts: state.hairMagicPrompts || null,
            raceAdvanced: state.raceAdvanced || null,
            jobAdvanced: state.jobAdvanced || null,
            outfitAdvanced: state.outfitAdvanced || null,
            headwearAdvanced: state.headwearAdvanced || null,
            handItemsAdvanced: state.handItemsAdvanced || null,
            expressionAdvanced: state.expressionAdvanced || null,
            poseAdvanced: state.poseAdvanced || null,
            sceneAdvanced: state.sceneAdvanced || null,
            cameraAdvanced: state.cameraAdvanced || null,
            atmosphereAdvanced: state.atmosphereAdvanced || null,
            heterochromia: state.heterochromia || false,
            inputSubject: state.inputSubject || '',
            inputNegative: state.inputNegative || ''
        };
    }

    // === 生成分享 URL ===
    async function generateShareURL(state, promptText) {
        const db = window.PromptGen.FirebaseInit && window.PromptGen.FirebaseInit.getDb();
        if (!db) {
            console.error('[ShareURL] Firebase 未初始化');
            return null;
        }

        try {
            const shareData = {
                state: extractShareableState(state),
                prompt: (promptText || '').substring(0, 500), // 截短避免過大
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: window.PromptGen.currentUser
                    ? window.PromptGen.currentUser.uid
                    : 'anonymous',
                views: 0
            };

            const docRef = await db.collection(COLLECTION).add(shareData);
            const shortId = docRef.id.substring(0, 7);

            // 更新文件加入 shortId 欄位（用於查詢）
            await docRef.update({ shortId: shortId });

            // 生成完整 URL
            const baseURL = window.location.origin + window.location.pathname;
            const shareURL = baseURL + '?s=' + shortId;

            console.log('[ShareURL] ✅ 分享連結已生成:', shareURL);
            return shareURL;
        } catch (error) {
            console.error('[ShareURL] ❌ 生成分享連結失敗:', error);
            return null;
        }
    }

    // === 從 URL 載入分享的 state ===
    async function loadSharedState() {
        const params = new URLSearchParams(window.location.search);
        const shortId = params.get('s');
        if (!shortId) return null;

        const db = window.PromptGen.FirebaseInit && window.PromptGen.FirebaseInit.getDb();
        if (!db) {
            console.error('[ShareURL] Firebase 未初始化，無法載入分享');
            return null;
        }

        try {
            // 用 shortId 查詢
            const snapshot = await db.collection(COLLECTION)
                .where('shortId', '==', shortId)
                .limit(1)
                .get();

            if (snapshot.empty) {
                console.warn('[ShareURL] 找不到分享 ID:', shortId);
                showToast('❌ 找不到此分享連結，可能已過期或不存在', 'error');
                return null;
            }

            const doc = snapshot.docs[0];
            const data = doc.data();

            // 增加瀏覽次數
            doc.ref.update({
                views: firebase.firestore.FieldValue.increment(1)
            }).catch(() => { /* 忽略更新錯誤 */ });

            console.log('[ShareURL] ✅ 載入分享 state 成功');

            // 清除 URL 中的 ?s= 參數（不影響歷史紀錄）
            const cleanURL = window.location.origin + window.location.pathname;
            window.history.replaceState({}, '', cleanURL);

            return data.state;
        } catch (error) {
            console.error('[ShareURL] ❌ 載入分享失敗:', error);
            showToast('❌ 載入分享連結失敗', 'error');
            return null;
        }
    }

    // === Toast 提示 ===
    function showToast(message, type = 'success') {
        // 移除舊 toast
        const old = document.querySelector('.share-toast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.className = `share-toast share-toast-${type}`;
        toast.innerHTML = message;
        document.body.appendChild(toast);

        // 觸發動畫
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 3 秒後移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // === 分享按鈕 click handler ===
    async function handleShare(getState, getPrompt) {
        const btn = document.getElementById('btn-share');
        if (!btn) return;

        // 防止重複點擊
        btn.disabled = true;
        const origHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 生成中...';

        try {
            const state = getState();
            const prompt = getPrompt();
            const url = await generateShareURL(state, prompt);

            if (url) {
                // 複製到剪貼板
                await navigator.clipboard.writeText(url);
                showToast('✅ 分享連結已複製！直接貼給朋友即可 🔗');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> 已複製！';
                setTimeout(() => {
                    btn.innerHTML = origHTML;
                }, 2000);
            } else {
                showToast('❌ 生成分享連結失敗，請稍後再試', 'error');
                btn.innerHTML = origHTML;
            }
        } catch (error) {
            console.error('[ShareURL] 分享失敗:', error);
            showToast('❌ 分享失敗：' + error.message, 'error');
            btn.innerHTML = origHTML;
        } finally {
            btn.disabled = false;
        }
    }

    // === 初始化 ===
    function init(deps) {
        // deps: { getState, getPrompt, applyState }
        const btn = document.getElementById('btn-share');
        if (btn && deps) {
            btn.addEventListener('click', () => handleShare(deps.getState, deps.getPrompt));
        }
    }

    return {
        init,
        loadSharedState,
        generateShareURL,
        showToast
    };
})();
