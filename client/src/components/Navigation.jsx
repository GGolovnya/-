import { useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import { useTheme } from "next-themes";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

function Navigation() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar shouldHideOnScroll>
        <NavbarBrand className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
            <NavLink to="/">
                <Link 
                    color={isActivePath('/') ? 'primary' : 'foreground'}
                    className={`transition-colors ${
                        isActivePath('/') 
                            ? theme === 'dark'
                                ? 'text-primary'
                                : 'text-blue-500'
                            : 'text-foreground'
                    }`}
                >
                    Главная
                </Link>
            </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
            <NavLink to="/content">
                <Link 
                    color={isActivePath('/content') ? 'primary' : 'foreground'}
                    className={`transition-colors ${
                        isActivePath('/content') 
                            ? theme === 'dark'
                                ? 'text-primary'
                                : 'text-blue-500'
                            : 'text-foreground'
                    }`}
                >
                    Контент
                </Link>
            </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
            <NavLink to="/components">
                <Link 
                    color={isActivePath('/components') ? 'primary' : 'foreground'}
                    className={`transition-colors ${
                        isActivePath('/components') 
                            ? theme === 'dark'
                                ? 'text-primary'
                                : 'text-blue-500'
                            : 'text-foreground'
                    }`}
                >
                    Компоненты
                </Link>
            </NavLink>
        </NavbarItem>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <Dropdown>
                <NavbarItem>
                    <DropdownTrigger>
                        <Link 
                            href="#" 
                            className={`transition-colors ${
                                theme === 'dark' ? 'text-foreground' : 'text-foreground'
                            }`}
                        >
                            Выпадающий список
                        </Link>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu>
                    <DropdownItem key="autoscaling" description="Короткое описание Менюшка 1">
                        Менюшка 1
                    </DropdownItem>
                    <DropdownItem key="autoscaling" description="Короткое описание Менюшка 2">
                        Менюшка 2
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
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
                <Link 
                    href="#"
                    className={`transition-colors ${
                        theme === 'dark' ? 'text-foreground' : 'text-foreground'
                    }`}
                >
                    Войти
                </Link>
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