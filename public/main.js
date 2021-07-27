(() => {
  const themeSwitch = document.querySelector('#themeSwitch');

  themeSwitch.addEventListener('click', switchTheme);

  function switchTheme() {
    const theme = getTheme();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }

  function getTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      return theme;
    }
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  const theme = getTheme();

  setTheme(theme);

  themeSwitch.checked = theme === 'dark';
})();
