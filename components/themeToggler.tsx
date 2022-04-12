import s from './themeToggler.module.css';

export function ThemeToggler() {
  return (
    <label className={s.themeToggler} htmlFor="themeToggler" title="toggle dark theme">
      <input type="checkbox" id="themeToggler" />
      <span className={s.themeTogglerSwitcher}></span>
    </label>
  );
}
