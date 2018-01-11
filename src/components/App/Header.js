import React from 'react';
import logo from '../../logo.png';

const Header = () => (
    <header className="App-header">
        <img id="logo" src={logo} className="App-logo" alt="Tanks.vn logo"/>
        <div className="App-title">Tanks.vn</div>
        <div className="App-intro">FB page: <a href='http://facebook.com/tanksvn'>http://facebook.com/tanksvn</a> - Hotline: 0125.737.9966</div>
    </header>
)

export default Header