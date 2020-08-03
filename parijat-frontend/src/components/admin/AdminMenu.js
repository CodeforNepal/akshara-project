import { h, Component } from 'preact';
import { NavLink } from 'react-router-dom';
import style from './style';

export default class AdminMenu extends Component {
  render() {
    return (
      <nav className={style.Admin__Menu}>
        <NavLink exact to="/admin" className={style.Admin__Menu__Item}>
          Overview
        </NavLink>
        <NavLink to="/admin/index-sync" className={style.Admin__Menu__Item}>
          Index Syncing
        </NavLink>
        <NavLink to="/admin/users" className={style.Admin__Menu__Item}>
          User Management
        </NavLink>
        <NavLink to="/admin/tasks" className={style.Admin__Menu__Item}>
          Long Running Tasks
        </NavLink>
      </nav>
    );
  }
}
