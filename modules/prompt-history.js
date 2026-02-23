// ============================================
// Prompt 雲端存檔 & 歷史記錄模組
// Firestore CRUD + 歷史 Modal UI
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.PromptHistory = (function () {
    'use strict';

    const COLLECTION = 'prompts'; // users/{uid}/prompts/{id}
    let modalEl = null;

    // === Firestore 參考 ===
    function getUserPromptRef() {
        const user = window.PromptGen.currentUser;
        if (!user) return null;
        const db = window.PromptGen.FirebaseInit.getDb();
        return db.collection('users').doc(user.uid).collection(COLLECTION);
    }

    // === 存檔 ===
    async function savePrompt() {
        const user = window.PromptGen.currentUser;
        if (!user) {
            alert('請先登入才能存檔！');
            return;
        }

        const finalPrompt = document.getElementById('final-prompt');
        const finalNegative = document.getElementById('final-negative');
        const yaml = finalPrompt ? finalPrompt.textContent.trim() : '';
        if (!yaml) {
            alert('目前沒有生成的提示詞可以存檔！');
            return;
        }

        try {
            const ref = getUserPromptRef();
            // 計算現有數量做編號
            const snapshot = await ref.orderBy('createdAt', 'desc').limit(1).get();
            let count = 1;
            if (!snapshot.empty) {
                const lastName = snapshot.docs[0].data().name || '';
                const match = lastName.match(/#(\d+)/);
                if (match) count = parseInt(match[1]) + 1;
            }

            await ref.add({
                name: `未命名 #${count}`,
                yaml: yaml,
                negative: finalNegative ? finalNegative.value.trim() : '',
                starred: false,
                dimension: getDimensionLabel(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // 存檔成功動畫
            const btn = document.getElementById('btn-save-prompt');
            if (btn) {
                const origHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> 已存檔！';
                btn.classList.add('save-success');
                setTimeout(() => {
                    btn.innerHTML = origHTML;
                    btn.classList.remove('save-success');
                }, 1500);
            }
            console.log('[History] ✅ Prompt 已存檔');
        } catch (error) {
            console.error('[History] ❌ 存檔失敗:', error);
            alert('存檔失敗：' + error.message);
        }
    }

    // === 取得次元標籤 ===
    function getDimensionLabel() {
        const dims = { 'anime': '二次元', 'realistic': '寫實', 'fantasy': '幻想混合', '2.5d': '2.5D' };
        const dimBtns = document.querySelectorAll('.dim-btn.active');
        if (dimBtns.length > 0) {
            const key = dimBtns[0].dataset.dim;
            return dims[key] || key || '未指定';
        }
        return '未指定';
    }

    // === 讀取歷史 ===
    async function getPrompts(starredOnly = false) {
        const ref = getUserPromptRef();
        if (!ref) return [];

        try {
            let query = ref.orderBy('createdAt', 'desc').limit(50);
            const snapshot = await query.get();
            const results = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                if (starredOnly && !data.starred) return;
                results.push({ id: doc.id, ...data });
            });
            return results;
        } catch (error) {
            console.error('[History] ❌ 讀取失敗:', error);
            return [];
        }
    }

    // === 刪除 ===
    async function deletePrompt(id) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).delete();
            console.log('[History] 🗑️ 已刪除:', id);
        } catch (error) {
            console.error('[History] ❌ 刪除失敗:', error);
        }
    }

    // === 切換收藏 ===
    async function toggleStar(id, currentStarred) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).update({ starred: !currentStarred });
        } catch (error) {
            console.error('[History] ❌ 切換收藏失敗:', error);
        }
    }

    // === 重新命名 ===
    async function renamePrompt(id, newName) {
        const ref = getUserPromptRef();
        if (!ref) return;
        try {
            await ref.doc(id).update({ name: newName });
        } catch (error) {
            console.error('[History] ❌ 重新命名失敗:', error);
        }
    }

    // === 載入 prompt 到輸出區 ===
    function loadPrompt(yaml, negative) {
        const finalPrompt = document.getElementById('final-prompt');
        const finalNegative = document.getElementById('final-negative');
        if (finalPrompt) finalPrompt.textContent = yaml;
        if (finalNegative) finalNegative.value = negative || '';
        closeModal();
    }

    // === Modal UI ===
    function openModal() {
        if (!window.PromptGen.currentUser) {
            alert('請先登入才能查看歷史記錄！');
            return;
        }
        if (!modalEl) createModal();
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderList();
    }

    function closeModal() {
        if (modalEl) modalEl.classList.remove('active');
        document.body.style.overflow = '';
    }

    function createModal() {
        modalEl = document.createElement('div');
        modalEl.className = 'history-modal-overlay';
        modalEl.innerHTML = `
            <div class="history-modal">
                <div class="history-modal-header">
                    <h2><i class="fa-solid fa-clock-rotate-left"></i> 歷史記錄</h2>
                    <div class="history-modal-tabs">
                        <button class="hist-tab active" data-filter="all">全部</button>
                        <button class="hist-tab" data-filter="starred">⭐ 收藏</button>
                    </div>
                    <button class="history-modal-close" id="btn-history-close">&times;</button>
                </div>
                <div class="history-modal-body" id="history-list">
                    <div class="history-loading">載入中...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);

        // 關閉
        modalEl.querySelector('#btn-history-close').addEventListener('click', closeModal);
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeModal();
        });

        // Tab 切換
        modalEl.querySelectorAll('.hist-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modalEl.querySelectorAll('.hist-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderList(tab.dataset.filter === 'starred');
            });
        });
    }

    async function renderList(starredOnly = false) {
        const listEl = document.getElementById('history-list');
        if (!listEl) return;
        listEl.innerHTML = '<div class="history-loading"><i class="fa-solid fa-spinner fa-spin"></i> 載入中...</div>';

        const prompts = await getPrompts(starredOnly);

        if (prompts.length === 0) {
            listEl.innerHTML = `<div class="history-empty">
                <i class="fa-solid fa-inbox"></i>
                <p>${starredOnly ? '還沒有收藏的 prompt' : '還沒有存檔的 prompt'}</p>
                <p class="history-empty-hint">生成 prompt 後，點擊「💾 存檔」按鈕即可保存</p>
            </div>`;
            return;
        }

        listEl.innerHTML = prompts.map(p => {
            const date = p.createdAt ? p.createdAt.toDate().toLocaleString('zh-TW') : '未知';
            const preview = (p.yaml || '').substring(0, 120).replace(/\n/g, ' ');
            return `
                <div class="history-item" data-id="${p.id}">
                    <div class="history-item-header">
                        <button class="hist-star ${p.starred ? 'starred' : ''}" data-id="${p.id}" data-starred="${p.starred}" title="收藏">
                            <i class="fa-${p.starred ? 'solid' : 'regular'} fa-star"></i>
                        </button>
                        <span class="hist-name" data-id="${p.id}" title="點擊重新命名">${p.name || '未命名'}</span>
                        <span class="hist-dim">${p.dimension || ''}</span>
                        <span class="hist-date">${date}</span>
                    </div>
                    <div class="history-item-preview">${preview}...</div>
                    <div class="history-item-actions">
                        <button class="hist-load" data-id="${p.id}" title="載入此 prompt">
                            <i class="fa-solid fa-download"></i> 載入
                        </button>
                        <button class="hist-delete" data-id="${p.id}" title="刪除">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // 綁定事件
        listEl.querySelectorAll('.hist-star').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const starred = btn.dataset.starred === 'true';
                await toggleStar(id, starred);
                const activeTab = modalEl.querySelector('.hist-tab.active');
                renderList(activeTab && activeTab.dataset.filter === 'starred');
            });
        });

        listEl.querySelectorAll('.hist-load').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = prompts.find(p => p.id === btn.dataset.id);
                if (item) loadPrompt(item.yaml, item.negative);
            });
        });

        listEl.querySelectorAll('.hist-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('確定要刪除這筆記錄嗎？')) return;
                await deletePrompt(btn.dataset.id);
                const activeTab = modalEl.querySelector('.hist-tab.active');
                renderList(activeTab && activeTab.dataset.filter === 'starred');
            });
        });

        listEl.querySelectorAll('.hist-name').forEach(span => {
            span.addEventListener('click', async () => {
                const newName = prompt('重新命名：', span.textContent);
                if (newName && newName.trim()) {
                    await renamePrompt(span.dataset.id, newName.trim());
                    span.textContent = newName.trim();
                }
            });
        });
    }

    // === 初始化 ===
    function init() {
        // 存檔按鈕
        const saveBtn = document.getElementById('btn-save-prompt');
        if (saveBtn) saveBtn.addEventListener('click', savePrompt);

        // 歷史按鈕
        const histBtn = document.getElementById('btn-history');
        if (histBtn) histBtn.addEventListener('click', openModal);
    }

    return { init, savePrompt, openModal, closeModal };
})();
