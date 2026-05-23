// ---------- Theme ----------

const THEME_KEY = "tracker:theme";
export const themeRepo = {
    get(): "dark" | "light" {
        if(typeof window === 'undefined') return 'dark';
        return (window.localStorage.getItem(THEME_KEY) as 'dark' | 'light') ?? 'dark'
    },
    set(t: 'dark' | 'light'){
        window.localStorage.setItem(THEME_KEY,t)
    }
}