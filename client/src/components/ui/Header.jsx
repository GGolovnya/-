import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";

function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">ПлатежОк</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/" className="text-foreground">
            Главная
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {userName ? (
          <>
            <NavbarItem>
              <span className="text-foreground">{userName}</span>
            </NavbarItem>
            <NavbarItem>
              <Button color="danger" variant="flat" onClick={handleLogout}>
                Выйти
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink to="/login" className="text-foreground">
                Войти
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button as={NavLink} color="primary" to="/register" variant="flat">
                Регистрация
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;