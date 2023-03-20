import { Link, Navbar, Spacer, useTheme } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import React from 'react';
import ThemeSwitcher from '../theme/ThemeSwitcher';

const Header = () => {
    const { isDark } = useTheme();

    return (
            <>
                <Navbar variant={ "sticky" }>
                    <Navbar.Content hideIn="xs">
                        <Navbar.Link href="/">Home</Navbar.Link>
                        <Navbar.Item>
                            <Link href="/createdrop">
                                Crée un évènement
                            </Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Link href="/all-nft">
                                All nft
                            </Link>
                        </Navbar.Item>
                    </Navbar.Content>
                    <Navbar.Content>
                        <ConnectWallet btnTitle="Connectez votre wallet" colorMode={ isDark ? "dark" : "light" }/>
                        <Navbar.Item>
                            <ThemeSwitcher></ThemeSwitcher>
                        </Navbar.Item>
                    </Navbar.Content>
                </Navbar>
                <Spacer y={2}/>
            </>
    );
};

export default Header;
