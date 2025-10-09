// src/lib/Auth.ts

const TOKEN_KEY = 'authToken';

export const AuthService = {
    // Menyimpan token ke Local Storage
    setToken: (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    // Mengambil token dari Local Storage
    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    // Menghapus token (Logout)
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
        }
    },

    // Mengecek status login
    isLoggedIn: (): boolean => {
        return !!AuthService.getToken();
    }
};