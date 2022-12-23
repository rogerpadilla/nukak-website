import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import { Theme } from '../types';

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
    const el = document.querySelector<HTMLElement>('#sidenav');
    const style = getComputedStyle(el);
    const top = style.getPropertyValue('--top');

    document.body.addEventListener('click', (evt) => requestAnimationFrame(() => {
        const target = evt.target as HTMLElement;
        const sidenavToggler = target.closest('#sidenavToggler');
        if (!sidenavToggler) {
            state.isSidenavOpen = false;
        }
    }));

    subscribeKey(state, 'isSidenavOpen', () => requestAnimationFrame(() => {
        el.style.top = `${window.scrollY}px`;
    }));

    document.addEventListener('scroll', () => requestAnimationFrame(() => {
        if (state.isSidenavOpen) {
            el.style.top = `${window.scrollY}px`;
        }
    }));

    window.addEventListener('resize', () => requestAnimationFrame(() => {
        if (window.innerWidth > 960) {
            el.style.top = top;
            state.isSidenavOpen = false;
        } else {
            el.style.top = `${window.scrollY}px`;
        }
    }));
}

if (typeof window !== 'undefined') {
    theme();
    sidenav();
}
