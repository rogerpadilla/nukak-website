import s from './themeToggler.module.css';
import { state } from '../state';
import { useSnapshot } from 'valtio';

export function ThemeToggler() {
  const snap = useSnapshot(state);

  const toggleTheme = () => {
    state.theme = snap.theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <label className={s.themeToggler} htmlFor="themeToggler" title="toggle dark theme" onClick={toggleTheme}>
      <input type="checkbox" onChange={() => undefined} checked={snap.theme === 'dark'} />
      <span className={s.themeTogglerSwitcher}></span>
    </label>
  );
}
