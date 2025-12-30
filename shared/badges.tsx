import s from './badges.module.css';

export function Badges() {
  return (
    <div className={s.badges}>
      <a href="https://github.com/rogerpadilla/uql">
        <img src="https://github.com/rogerpadilla/uql/actions/workflows/tests.yml/badge.svg" alt="tests" />
      </a>
      <a href="https://coveralls.io/r/rogerpadilla/uql?branch=main">
        <img src="https://coveralls.io/repos/rogerpadilla/uql/badge.svg?branch=main" alt="tests" />
      </a>
      <a href="https://github.com/rogerpadilla/uql/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
      </a>
      <a href="https://www.npmjs.com/package/@uql/core">
        <img src="https://img.shields.io/npm/v/@uql/core.svg" alt="npm" />
      </a>
    </div>
  );
}
