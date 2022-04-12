import { useSnapshot } from 'valtio';
import { state } from '../state';
import s from './hamburguer.module.css';

export function Hamburguer() {
  const snap = useSnapshot(state);

  const toggleStatus = () => {
    state.isSidenavOpen = !snap.isSidenavOpen;
  };

  return (
    <button className={s.hamburguer} onClick={toggleStatus} id="hamburguer">
      <span className={s.bar}></span>
      <span className={s.bar}></span>
      <span className={s.bar}></span>
    </button>
  );
}
