import type { NextPage } from 'next'
import '@/../styles/Home.module.scss'
import React from 'react';
import ThemeSwitcher from '../components/theme/ThemeSwitcher';

const Home: NextPage = () => {

    return <>
        <h1>hello</h1>
        <ThemeSwitcher></ThemeSwitcher>
    </>
}

export default Home
