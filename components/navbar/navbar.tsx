import { Link, Navbar } from '@nextui-org/react';
import React from 'react';
import ThemeSwitcher from '../theme/ThemeSwitcher';

const NavBar = () => {
    return (
            <>
                <Navbar variant={ "sticky" }>
                    <Navbar.Content hideIn="xs">
                        <Navbar.Link href="/">Home</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Item>
                            <Link href="/createdrop">
                                Create Drop
                            </Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <ThemeSwitcher></ThemeSwitcher>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>
            </>
    );
};

export default NavBar;
