// ============================================
// Firebase 初始化模組
// 載入 Firebase SDK 並匯出 auth / db 實例
// ============================================
window.PromptGen = window.PromptGen || {};

window.PromptGen.FirebaseInit = (function () {
    'use strict';

    // Firebase 設定（從 Firebase Console 取得）
    const firebaseConfig = {
        apiKey: "AIzaSyCaeS087aGAeTlr83mKBxeoP3XTj85lZf4",
        authDomain: "tommylee-ai.firebaseapp.com",
        projectId: "tommylee-ai",
        storageBucket: "tommylee-ai.firebasestorage.app",
        messagingSenderId: "925429359201",
        appId: "1:925429359201:web:f95ef585c9ccc516280020"
    };

    let app = null;
    let auth = null;
    let db = null;

    function init() {
        try {
            // 使用 compat 版本的 Firebase SDK（透過 CDN <script> 載入）
            if (typeof firebase === 'undefined') {
                console.error('[Firebase] SDK 未載入，請確認 index.html 中有引入 Firebase CDN');
                return false;
            }

            // 初始化 Firebase App
            app = firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            db = firebase.firestore();

            // 設定語言為繁體中文（登入彈窗會用中文）
            auth.languageCode = 'zh-TW';

            console.log('[Firebase] ✅ 初始化成功');
            return true;
        } catch (error) {
            console.error('[Firebase] ❌ 初始化失敗:', error);
            return false;
        }
    }

    function getAuth() { return auth; }
    function getDb() { return db; }
    function getApp() { return app; }

    return { init, getAuth, getDb, getApp };
})();
