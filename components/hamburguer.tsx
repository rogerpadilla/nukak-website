import { state } from './state';
import s from './hamburguer.module.css';

export function Hamburguer ()  {
    const toggleStatus = () => {
      state.isSidenavOpen = !state.isSidenavOpen; 
    };
  
    return (
      <button className={s.hamburguer} onClick={toggleStatus}>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
      </button>
    );
  };