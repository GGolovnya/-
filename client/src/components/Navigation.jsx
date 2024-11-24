import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Button , Switch, Link} from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import { useTheme } from "next-themes";
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';

function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
                <NavLink to="/">
                    <Link light auto color="foreground">Главная</Link>
                </NavLink>
            </NavbarItem>
            <NavbarItem isActive>
                <NavLink to="/content">
                    <Link light auto>Контент</Link>
                </NavLink>
            </NavbarItem>
            <NavbarItem isActive>
                <NavLink to="/components">
                    <Link>Компоненты</Link>
                </NavLink>
            </NavbarItem>
        </NavbarBrand>
        <NavbarContent justify="end">
            <Switch
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            size="lg"
            startContent={<MoonIcon />}
            endContent={<SunIcon />}
            />
            <NavbarItem className="hidden lg:flex">
                <Link href="#">Войти</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat">
                    Зарегистрироваться
                </Button>
            </NavbarItem>
        </NavbarContent>
    </Navbar>
);
}

export default Navigation;