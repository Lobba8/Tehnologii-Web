/**
 * Storage Manager - Gestionare localStorage și sessionStorage
 * ACEST COD VĂ ESTE FURNIZAT - NU TREBUIE MODIFICAT
 */
const StorageManager = {
    setLocal: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Eroare localStorage:', e);
            return false;
        }
    },

    getLocal: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return localStorage.getItem(key);
        }
    },

    removeLocal: function(key) {
        localStorage.removeItem(key);
    },

    setSession: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Eroare sessionStorage:', e);
            return false;
        }
    },

    getSession: function(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return sessionStorage.getItem(key);
        }
    },

    removeSession: function(key) {
        sessionStorage.removeItem(key);
    },

    clearSession: function() {
        sessionStorage.clear();
    },

    clearLocal: function() {
        localStorage.clear();
    },

    getAllLocal: function() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = this.getLocal(key);
        }
        return data;
    },

    getAllSession: function() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = this.getSession(key);
        }
        return data;
    }
};

window.StorageManager = StorageManager;
