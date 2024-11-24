import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/content">Контент</NavLink>
      <NavLink to="/components">Компоненты</NavLink>
    </nav>
  );
}

export default Navigation;