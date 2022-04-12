import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';

export const state = proxy({ isSidenavOpen: false, theme: 'dark' as Theme })

function theme() {
    function setTheme(theme: Theme): void {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }

    function getTheme(): Theme {
        const theme = localStorage.getItem('theme') as Theme;
        if (theme) {
            return theme;
        }
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        return prefersDarkScheme.matches ? 'dark' : 'light';
    }

    subscribeKey(state, 'theme', setTheme);

    state.theme = getTheme();
}

function sidenav() {
    document.body.addEventListener('click', (evt) => {
        const target = evt.target as HTMLElement;
        const sidenavToggler = target.closest('#sidenavToggler');
        if (sidenavToggler) {
            return;
        }
        state.isSidenavOpen = false;
    });
}

if (typeof window !== 'undefined') {
    theme();
    sidenav();
}

type Theme = 'dark' | 'light';