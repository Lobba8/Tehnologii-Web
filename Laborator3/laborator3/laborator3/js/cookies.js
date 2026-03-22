/**
 * Cookie Manager - Funcții utilitare pentru gestionarea cookie-urilor
 * ACEST COD VĂ ESTE FURNIZAT - NU TREBUIE MODIFICAT
 */
const CookieManager = {
    set: function(name, value, days = 365, path = '/') {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
        console.log(`Cookie setat: ${name}=${value}`);
    },

    get: function(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    },

    delete: function(name) {
        this.set(name, '', -1);
        console.log(`Cookie șters: ${name}`);
    },

    getAll: function() {
        const cookies = {};
        if (document.cookie) {
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name) {
                    cookies[name] = decodeURIComponent(value || '');
                }
            });
        }
        return cookies;
    },

    deleteAll: function() {
        const cookies = this.getAll();
        for (const name in cookies) {
            this.delete(name);
        }
        console.log('Toate cookie-urile au fost șterse');
    },

    exists: function(name) {
        return this.get(name) !== null;
    }
};

window.CookieManager = CookieManager;
