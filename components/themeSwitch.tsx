import s from './themeSwitch.module.css';

export const ThemeSwitch: React.FC = () => {
  return (
    <div className={s.themeSwitchWrapper}>
      <label className={s.themeSwitch} htmlFor="themeSwitch">
        <input type="checkbox" id="themeSwitch" />
        <div className={s.themeSwitchSlider}></div>
      </label>
    </div>
  );
};
