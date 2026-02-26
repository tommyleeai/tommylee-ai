// ============================================
// 會員登入 UI 模組
// Google 一鍵登入 / One Tap / 登出 / 狀態管理
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.AuthUI = (function () {
    'use strict';

    let currentUser = null;
    let provider = null;

    // Google One Tap Client ID
    const GOOGLE_CLIENT_ID = '925429359201-99iofmorge8tvg9q85bvj7bn9tgdj158.apps.googleusercontent.com';

    // === DOM 元素快取 ===
    function getEls() {
        return {
            loginBtn: document.getElementById('btn-login'),
            userInfo: document.getElementById('user-info'),
            userAvatar: document.getElementById('user-avatar'),
            userName: document.getElementById('user-name'),
            logoutBtn: document.getElementById('btn-logout')
        };
    }

    // === 更新 UI 狀態 ===
    function updateUI(user) {
        const els = getEls();
        if (!els.loginBtn || !els.userInfo) return;

        if (user) {
            // 已登入
            els.loginBtn.style.display = 'none';
            els.userInfo.style.display = 'flex';
            els.userAvatar.src = user.photoURL || 'assets/logo.png';
            els.userAvatar.alt = user.displayName || '使用者';
            els.userName.textContent = user.displayName || '使用者';
            els.userName.title = user.email || '';
        } else {
            // 未登入
            els.loginBtn.style.display = 'flex';
            els.userInfo.style.display = 'none';
        }
    }

    // === Google 登入 ===
    async function signIn() {
        try {
            const auth = window.PromptGen.FirebaseInit.getAuth();
            const result = await auth.signInWithPopup(provider);
            console.log('[Auth] ✅ 登入成功:', result.user.displayName);
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('[Auth] 使用者關閉登入視窗');
                return;
            }
            if (error.code === 'auth/cancelled-popup-request') {
                return; // 重複開啟，忽略
            }
            console.error('[Auth] ❌ 登入失敗:', error);
            alert('登入失敗：' + error.message);
        }
    }

    // === 登出 ===
    async function signOut() {
        try {
            const auth = window.PromptGen.FirebaseInit.getAuth();
            await auth.signOut();
            // 取消 One Tap cooldown，登出後再次進入可以再次顯示
            sessionStorage.removeItem('oneTapDismissed');
            console.log('[Auth] ✅ 已登出');
        } catch (error) {
            console.error('[Auth] ❌ 登出失敗:', error);
        }
    }

    // === Google One Tap：處理 credential 回應 ===
    async function handleOneTapResponse(response) {
        try {
            const auth = window.PromptGen.FirebaseInit.getAuth();
            // 用 Google ID Token 建立 Firebase credential
            const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
            const result = await auth.signInWithCredential(credential);
            console.log('[Auth] ✅ One Tap 登入成功:', result.user.displayName);
        } catch (error) {
            console.error('[Auth] ❌ One Tap 登入失敗:', error);
        }
    }

    // === 初始化 Google One Tap ===
    function initOneTap() {
        // 已登入或 GIS 未載入 → 不顯示
        if (currentUser) return;
        if (typeof google === 'undefined' || !google.accounts) {
            // GIS 還沒載入，延遲重試
            setTimeout(initOneTap, 500);
            return;
        }
        // 本次 session 已被使用者關閉過 → 不再煩他
        if (sessionStorage.getItem('oneTapDismissed')) return;

        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleOneTapResponse,
            auto_select: true,       // 只有一個帳號時自動選取
            cancel_on_tap_outside: true,
            context: 'signin',
            itp_support: true
        });

        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.log('[OneTap] 未顯示:', notification.getNotDisplayedReason());
            }
            if (notification.isDismissedMoment()) {
                console.log('[OneTap] 使用者關閉');
                sessionStorage.setItem('oneTapDismissed', '1');
            }
            if (notification.isSkippedMoment()) {
                console.log('[OneTap] 被跳過:', notification.getSkippedReason());
            }
        });

        console.log('[OneTap] ✅ 已初始化');
    }

    // === 初始化：綁定事件 + 監聽登入狀態 ===
    function init() {
        // 建立 Google Auth Provider（必須在 Firebase SDK 載入後）
        provider = new firebase.auth.GoogleAuthProvider();

        const els = getEls();

        // 綁定登入按鈕
        if (els.loginBtn) {
            els.loginBtn.addEventListener('click', signIn);
        }

        // 綁定登出按鈕
        if (els.logoutBtn) {
            els.logoutBtn.addEventListener('click', signOut);
        }

        // 監聯 Firebase 登入狀態變化
        const auth = window.PromptGen.FirebaseInit.getAuth();
        auth.onAuthStateChanged((user) => {
            currentUser = user;
            window.PromptGen.currentUser = user;
            updateUI(user);

            if (user) {
                console.log(`[Auth] 👤 已登入: ${user.displayName} (${user.email})`);
                // 已登入 → 取消 One Tap
                if (typeof google !== 'undefined' && google.accounts) {
                    google.accounts.id.cancel();
                }
            } else {
                console.log('[Auth] 👻 未登入');
                // 未登入 → 延遲顯示 One Tap（給頁面一點載入時間）
                setTimeout(initOneTap, 1500);
            }
        });
    }

    // === 公開 API ===
    function getCurrentUser() { return currentUser; }
    function isLoggedIn() { return !!currentUser; }

    return { init, getCurrentUser, isLoggedIn, signIn, signOut };
})();
