// ============================================
// Modal Registry — 統一管理所有 Modal 開關
// 使用堆疊（stack）結構，ESC 永遠關閉最頂層的 Modal
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.ModalRegistry = (function () {
    'use strict';

    const stack = [];

    /**
     * 註冊一個 Modal 的關閉函式
     * @param {string} id - Modal 識別名稱（方便 debug）
     * @param {Function} closeFn - 關閉該 Modal 的函式
     */
    function register(id, closeFn) {
        // 避免重複註冊同一個 id
        const idx = stack.findIndex(entry => entry.id === id);
        if (idx !== -1) stack.splice(idx, 1);
        stack.push({ id, closeFn });
        console.log(`[ModalRegistry] 📌 註冊: ${id} (stack: ${stack.length})`);
    }

    /**
     * 取消註冊（Modal 關閉時呼叫）
     * @param {string} id - Modal 識別名稱
     */
    function unregister(id) {
        const idx = stack.findIndex(entry => entry.id === id);
        if (idx !== -1) {
            stack.splice(idx, 1);
            console.log(`[ModalRegistry] 🗑️ 取消: ${id} (stack: ${stack.length})`);
        }
    }

    /**
     * 關閉最頂層的 Modal
     * @returns {boolean} 是否有 Modal 被關閉
     */
    function closeTop() {
        if (stack.length === 0) return false;
        const top = stack[stack.length - 1];
        console.log(`[ModalRegistry] ❌ 關閉: ${top.id} (stack: ${stack.length})`);
        try {
            top.closeFn();
        } catch (e) {
            console.warn('[ModalRegistry] 關閉失敗:', e);
        }
        return true;
    }

    /**
     * 目前有沒有任何 Modal 開著
     */
    function hasOpen() {
        return stack.length > 0;
    }

    /**
     * 取得堆疊數量（debug 用）
     */
    function count() {
        return stack.length;
    }

    // 全域 ESC 監聽器（唯一一個！）
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeTop();
        }
    });

    return { register, unregister, closeTop, hasOpen, count };
})();
