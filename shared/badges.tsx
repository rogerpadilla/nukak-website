import s from './badges.module.css';

export function Badges() {
  return (
    <div className={s.badges}>
      <a href="https://github.com/rogerpadilla/nukak">
        <img src="https://github.com/rogerpadilla/nukak/actions/workflows/tests.yml/badge.svg" alt="tests" />
      </a>
      <a href="https://coveralls.io/r/rogerpadilla/nukak?branch=main">
        <img src="https://coveralls.io/repos/rogerpadilla/nukak/badge.svg?branch=main" alt="tests" />
      </a>
      <a href="https://github.com/rogerpadilla/nukak/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
      </a>
      <a href="https://badge.fury.io/js/nukak">
        <img src="https://badge.fury.io/js/nukak.svg" alt="tests" />
      </a>
    </div>
  );
}
